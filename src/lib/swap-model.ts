// Ported from the Theosis Metabolic Simulator (public/simulator/index.html, fixed-intake "habits" path):
// Mifflin-St Jeor BMR recomputed daily from current weight, x1.2 daily living, plus light activity;
// thermic effect of food (TEF_BETA 0.1 x intake change); surplus-side adaptive term AT_BETA_UP = 0.20
// of the excess (excess capped at AT_UP_MAXEXCESS, 14-day response, capped at 25% of burn);
// gain partitioned into fat (RHO_F) and lean (1,800 kcal/kg) with the Forbes/Hall lean share 10.4 / (10.4 + fat kg).
const LB = 2.2046226218;
const RHO_F = 4250 * LB;
const RHO_L = 1800;
const TEF_BETA = 0.1, AT_BETA_UP = 0.2, AT_UP_MAXEXCESS = 1000, AT_TAU = 14, AT_CAP = 0.25;

/** Example person used on the home page swap cards. */
export const EXAMPLE = { sex: "m" as const, age: 40, heightCm: 175.3, weightLb: 180, bodyFatPct: 25, lightActivityKcal: 250 };

const bmr = (kg: number) => 10 * kg + 6.25 * EXAMPLE.heightCm - 5 * EXAMPLE.age + (EXAMPLE.sex === "m" ? 5 : -161);
const tdee = (kg: number) => bmr(kg) * 1.2 + EXAMPLE.lightActivityKcal;

/** Extra pounds vs staying at maintenance, for each day 0..365, when eating `surplus` kcal/day more. */
export function extraLbByDay(surplus: number, days = 365): number[] {
  const w0 = EXAMPLE.weightLb / LB;
  let F = (w0 * EXAMPLE.bodyFatPct) / 100, L = w0 - F, adapt = 0;
  const ei0 = tdee(w0), intake = ei0 + surplus;
  const out = [0];
  for (let d = 0; d < days; d++) {
    const t = tdee(F + L);
    const target = -Math.min(AT_CAP * t, AT_BETA_UP * Math.min(intake - ei0, AT_UP_MAXEXCESS));
    adapt += (target - adapt) / AT_TAU;
    const burn = t - adapt - TEF_BETA * (ei0 - intake);
    const E = intake - burn;
    const pm = 10.4 / (10.4 + F);
    const dF = E / (RHO_F + (RHO_L * pm) / (1 - pm));
    F += dF; L += (dF * pm) / (1 - pm);
    out.push((F + L - w0) * LB);
  }
  return out;
}

// Deficit side (same simulator constants): adaptive thermogenesis lowers burn by AT_BETA = 0.14 of the
// current deficit vs today's maintenance (14-day response, capped at 25% of burn), so the loss slows over time.
const AT_BETA = 0.14;

/** Pounds lost vs staying at maintenance, for each day 0..365, when eating `cut` kcal/day less. Includes metabolic adaptation. */
export function lostLbByDay(cut: number, days = 365): number[] {
  const w0 = EXAMPLE.weightLb / LB;
  let F = (w0 * EXAMPLE.bodyFatPct) / 100, L = w0 - F, adapt = 0;
  const ei0 = tdee(w0), intake = ei0 - cut;
  const out = [0];
  for (let d = 0; d < days; d++) {
    const t = tdee(F + L);
    const target = Math.min(AT_CAP * t, AT_BETA * Math.max(0, t - intake));
    adapt += (target - adapt) / AT_TAU;
    const burn = t - adapt - TEF_BETA * (ei0 - intake);
    const E = intake - burn;
    const pm = 10.4 / (10.4 + F);
    const dF = E / (RHO_F + (RHO_L * pm) / (1 - pm));
    F += dF; L += (dF * pm) / (1 - pm);
    out.push((w0 - F - L) * LB);
  }
  return out;
}
