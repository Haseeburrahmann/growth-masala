export function estimateWebsiteCost(
  build: number,
  monthlyCare: number,
  domain: string,
  hosting: string,
): { annualRunning: number; firstYear: number; threeYears: number } | null {
  const annualAmounts = [domain, hosting];
  if (
    annualAmounts.some((value) => !/^\d{1,8}(\.\d{1,2})?$/.test(value.trim())) ||
    [build, monthlyCare].some((value) => !Number.isFinite(value) || value < 0)
  ) return null;

  // Calculate in paise so decimal supplier quotes do not accumulate float errors.
  const annualPaise = annualAmounts.reduce(
    (sum, value) => sum + Math.round(Number(value) * 100),
    Math.round(monthlyCare * 100) * 12,
  );
  const buildPaise = Math.round(build * 100);
  return {
    annualRunning: annualPaise / 100,
    firstYear: (buildPaise + annualPaise) / 100,
    threeYears: (buildPaise + annualPaise * 3) / 100,
  };
}
