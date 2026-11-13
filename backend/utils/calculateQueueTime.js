function calculateExpectedConsultationTime(currentTime, patientsAhead, averageConsultationMinutes) {
  const base = new Date(currentTime);
  if (Number.isNaN(base.getTime())) throw new Error("Invalid current time");
  const ahead = Math.max(0, Number(patientsAhead) || 0);
  const minutes = Math.max(1, Number(averageConsultationMinutes) || 15);
  return new Date(base.getTime() + ahead * minutes * 60 * 1000);
}

function calculateAverageConsultationTime(totalMinutes, acceptedPatients) {
  const count = Number(acceptedPatients);
  if (count <= 0) return 15;
  return Math.max(1, Number(totalMinutes) / count);
}

module.exports = { calculateExpectedConsultationTime, calculateAverageConsultationTime };
