const supabase = require('../services/supabaseClient');
const { generateDietPlan } = require('../services/aiService');
const { v4: uuidv4 } = require('uuid');

async function generateDiet(req, res) {
  try {
    const { id } = req.params;
    // Fetch patient
    const { data: patients, error: pErr } = await supabase.from('patients').select('*').eq('id', id).limit(1);
    if (pErr) throw pErr;
    if (!patients || patients.length === 0) return res.status(404).json({ message: 'Patient not found' });

    const patient = patients[0];
    // Call AI
    const planJSON = await generateDietPlan(patient);

    const planId = uuidv4();
    const row = {
      id: planId,
      patient_id: id,
      plan: planJSON
    };

    const { data, error } = await supabase.from('diet_plans').insert([row]).select().single();
    if (error) throw error;

    res.json({ diet_plan: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Generate diet failed', error: err.message });
  }
}

async function getDietPlans(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('diet_plans').select('*').eq('patient_id', id).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ diet_plans: data || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Get diet plans failed', error: err.message });
  }
}

module.exports = { generateDiet, getDietPlans };
