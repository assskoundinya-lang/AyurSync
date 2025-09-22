const supabase = require('../services/supabaseClient');
const { v4: uuidv4 } = require('uuid');

async function createPatient(req, res) {
  try {
    const input = req.body || {};

    // Coerce JSON fields if sent as strings from the frontend
    const coerceJson = (val) => {
      if (val == null || val === '') return null;
      if (typeof val === 'object') return val;
      try { return JSON.parse(val); } catch { return null; }
    };

    const coerceNumber = (val) => {
      if (val == null || val === '') return null;
      const n = Number(val);
      return Number.isFinite(n) ? n : null;
    };

    const id = uuidv4();
    const row = {
      id,
      full_name: input.full_name,
      date_of_birth: input.date_of_birth || null,
      gender: input.gender || null,
      occupation: input.occupation || null,
      weight: coerceNumber(input.weight),
      height: coerceNumber(input.height),
      email: input.email || null,
      phone_number: input.phone_number || null,
      dosha_assessment: coerceJson(input.dosha_assessment) || {},
      health_diet: coerceJson(input.health_diet) || {}
    };

    if (!row.full_name) {
      return res.status(400).json({ message: 'full_name is required' });
    }

    const { data, error } = await supabase
      .from('patients')
      .insert([row])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ patient: data });
  } catch (err) {
    console.error('createPatient error:', err);
    res.status(500).json({ message: 'Create patient failed', error: err.message });
  }
}

async function listPatients(req, res) {
  try {
    // Support simple search by name or email via query param `q`
    const q = req.query.q || '';
    let query = supabase.from('patients').select('*').order('created_at', { ascending: false });

    if (q) {
      query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ patients: data || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'List patients failed', error: err.message });
  }
}

async function getPatient(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('patients').select('*').eq('id', id).limit(1);
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ message: 'Patient not found' });
    res.json({ patient: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Get patient failed', error: err.message });
  }
}

async function updatePatient(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    // Only allow updating known fields; coerce types similar to create
    const coerceJson = (val) => {
      if (val == null || val === '') return null;
      if (typeof val === 'object') return val;
      try { return JSON.parse(val); } catch { return null; }
    };
    const coerceNumber = (val) => {
      if (val == null || val === '') return null;
      const n = Number(val);
      return Number.isFinite(n) ? n : null;
    };
    const allowed = {
      full_name: payload.full_name,
      date_of_birth: payload.date_of_birth ?? undefined,
      gender: payload.gender ?? undefined,
      occupation: payload.occupation ?? undefined,
      weight: payload.weight !== undefined ? coerceNumber(payload.weight) : undefined,
      height: payload.height !== undefined ? coerceNumber(payload.height) : undefined,
      email: payload.email ?? undefined,
      phone_number: payload.phone_number ?? undefined,
      dosha_assessment: payload.dosha_assessment !== undefined ? (coerceJson(payload.dosha_assessment) || {}) : undefined,
      health_diet: payload.health_diet !== undefined ? (coerceJson(payload.health_diet) || {}) : undefined
    };
    // Remove undefined keys so we only update provided fields
    Object.keys(allowed).forEach((k) => allowed[k] === undefined && delete allowed[k]);

    const { data, error } = await supabase
      .from('patients')
      .update(allowed)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    res.json({ patient: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update patient failed', error: err.message });
  }
}

async function deletePatient(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('patients').delete().eq('id', id).select().single();
    if (error) throw error;
    res.json({ message: 'Patient deleted', patient: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete patient failed', error: err.message });
  }
}

module.exports = { createPatient, listPatients, getPatient, updatePatient, deletePatient };
