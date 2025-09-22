const supabase = require('../services/supabaseClient');
const { v4: uuidv4 } = require('uuid');

async function createPatient(req, res) {
  try {
    const payload = req.body;
    // you can validate fields here

    const id = uuidv4();
    const row = { id, ...payload };

    const { data, error } = await supabase.from('patients').insert([row]).select().single();
    if (error) throw error;

    res.status(201).json({ patient: data });
  } catch (err) {
    console.error(err);
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
    const { data, error } = await supabase.from('patients').update(payload).eq('id', id).select().single();
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
