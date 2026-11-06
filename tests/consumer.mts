import { poissonPmf } from '@lp-labs/poisson-distribution';
if (Math.abs(poissonPmf(0, 2) - Math.exp(-2)) > 1e-12) throw new Error('Probability');
// @ts-expect-error invalid argument must be rejected by declarations
poissonPmf('0', 2);
