import api from './api';

export async function createPatient(payload: any) {
  const { data } = await api.post('/patients', payload);
  return data.patient;
}
export async function listPatients(q?: string) {
  const { data } = await api.get('/patients', { params: { q } });
  return data.patients as any[];
}
export async function getPatient(id: string) {
  const { data } = await api.get(`/patients/${id}`);
  return data.patient;
}
export async function updatePatient(id: string, payload: any) {
  const { data } = await api.put(`/patients/${id}`, payload);
  return data.patient;
}
export async function deletePatient(id: string) {
  const { data } = await api.delete(`/patients/${id}`);
  return data;
}
export async function generateDiet(id: string) {
  const { data } = await api.post(`/patients/${id}/generate-diet`);
  return data.diet_plan;
}
export async function getDietPlans(id: string) {
  const { data } = await api.get(`/patients/${id}/diet-plans`);
  return data.diet_plans;
}