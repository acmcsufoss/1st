// Run: node src/components/fa26/flightTiming.test.ts
import assert from "node:assert/strict";
import { arrivalSeconds, flightStatus } from "./flightTiming.ts";

// Eight rockets: 3600px per axis in 48 seconds (75px/second).
const eta = (travelled: number, offset = 0) =>
  arrivalSeconds(travelled / 3600, 48, 3600, 1000, 760, offset);

assert.ok(Math.abs(eta(0) - 520 / 75) < 0.0001); // Not yet in the field.
assert.equal(eta(600), 0); // Currently visible.
assert.ok(Math.abs(eta(1400) - 2720 / 75) < 0.0001); // Already passed; wait for wrap.
assert.ok(eta(0, 100) > eta(0)); // Offsets affect entry time.
assert.ok(Math.abs(eta(75) - (eta(0) - 1)) < 0.0001); // Counts down at flight speed.

const arrivals = [
  { contributor: 0, seconds: 30 },
  { contributor: 1, seconds: 4 },
  { contributor: 2, seconds: 0 },
  { contributor: 0, seconds: 10 }, // Use the nearest repeated copy.
];
assert.deepEqual(flightStatus(arrivals, 0), { seconds: 10, rocketsAhead: 1 });
assert.deepEqual(flightStatus(arrivals, 2), { seconds: 0, rocketsAhead: 0 });
assert.deepEqual(flightStatus(arrivals, -1), {
  seconds: null,
  rocketsAhead: null,
});
assert.deepEqual(flightStatus([], 0), { seconds: null, rocketsAhead: null });
console.log("Flight timing checks passed");
