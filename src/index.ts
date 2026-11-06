function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export function poissonPmf(k: number, lambda: number): number {
  integer(k, 0, 100000);
  finite(lambda, 0, 10000);
  if (lambda === 0) return k === 0 ? 1 : 0;
  let logFactorial = 0;
  for (let i = 2; i <= k; i++) logFactorial += Math.log(i);
  return Math.exp(k * Math.log(lambda) - lambda - logFactorial);
}
export function poissonMoments(lambda: number): { mean: number; variance: number } {
  finite(lambda, 0, 10000);
  return { mean: lambda, variance: lambda };
}
