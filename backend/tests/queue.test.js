const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateExpectedConsultationTime, calculateAverageConsultationTime } = require("../utils/calculateQueueTime");

test("calculates expected consultation time from patients ahead", () => {
  const result = calculateExpectedConsultationTime("2026-01-01T14:00:00.000Z", 4, 15);
  assert.equal(result.toISOString(), "2026-01-01T15:00:00.000Z");
});

test("does not allow negative patients ahead", () => {
  const result = calculateExpectedConsultationTime("2026-01-01T14:00:00.000Z", -5, 15);
  assert.equal(result.toISOString(), "2026-01-01T14:00:00.000Z");
});

test("calculates average consultation duration", () => {
  assert.equal(calculateAverageConsultationTime(90, 6), 15);
  assert.equal(calculateAverageConsultationTime(0, 0), 15);
});
