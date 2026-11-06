import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('analytic fixture', () => {
  assert.ok(Math.abs(api.poissonPmf(0, 2) - Math.exp(-2)) < 1e-12);
});
test('zero rate', () => {
  assert.equal(api.poissonPmf(0, 0), 1);
  assert.equal(api.poissonPmf(1, 0), 0);
});
test('normalization bounded tail', () => {
  let sum = 0;
  for (let k = 0; k < 100; k++) sum += api.poissonPmf(k, 5);
  assert.ok(Math.abs(sum - 1) < 1e-12);
});
test('mass recurrence', () => {
  for (let k = 1; k < 30; k++)
    assert.ok(Math.abs(api.poissonPmf(k, 3) - (api.poissonPmf(k - 1, 3) * 3) / k) < 1e-13);
});
test('moments and invalid', () => {
  assert.deepEqual(api.poissonMoments(3), { mean: 3, variance: 3 });
  assert.throws(() => api.poissonPmf(-1, 2));
  assert.throws(() => api.poissonPmf(0, -1));
});
test('types and nonfinite', () => {
  assert.throws(() => api.poissonPmf('0', 2));
});
