export const product = {
  "repo": "city-map-touring-management-sim",
  "domain": "Game",
  "rank": 68,
  "tier": "P3",
  "score": 48,
  "ideaNo": 7,
  "ideaName": "街・地図・ツーリング経営シム",
  "field": "経営シミュレーション",
  "publicTarget": "GitHub Pages / BOOTH",
  "platformScope": "static Web management sim prototype / GitHub Pages",
  "overview": "街区、ルート、予算を選び、ツーリング拠点の収益と満足度を確認するブラウザ経営シム検証。",
  "problem": "地図、経営、バイク文脈を一度に作ると範囲が広く、短期公開では遊びの核がぼやける。",
  "differentiation": "地図を固定グリッドに絞り、ルート選択と予算判断の手触りを閉鎖アルファで検証する。",
  "audience": "経営シム好き、ツーリング企画者、地図ゲームの試作者",
  "requiredInputs": [
    "district",
    "routePlan",
    "fleetState",
    "budgetPolicy"
  ],
  "modules": [
    "game-loop",
    "economy-balancer",
    "web-game",
    "scenario-validator"
  ],
  "accent": "#ea580c",
  "secondary": "#334155",
  "scenarioNouns": [
    "街区",
    "ルート",
    "予算判断"
  ]
};

export function evaluateScenario(scenario) {
  if (scenario.type === 'mixed-batch') {
    const results = (scenario.items || []).map((inputs, index) => evaluateScenario({ id: scenario.id + '-' + index, inputs, flags: index === 2 ? ['needsReview'] : [] }));
    const accepted = results.filter((result) => result.status !== 'error').length;
    const warnings = results.filter((result) => result.status !== 'pass').length;
    return { id: scenario.id, status: warnings ? 'warning' : 'pass', accepted, warnings, missing: results.flatMap((result) => result.missing), score: warnings ? 78 : 96 };
  }
  const inputs = scenario.inputs || {};
  const missing = product.requiredInputs.filter((key) => inputs[key] === undefined || inputs[key] === null || inputs[key] === '');
  if (missing.length) return { id: scenario.id, status: 'error', accepted: 0, warnings: 0, missing, score: 0 };
  const risky = Object.values(inputs).some((value) => /stale|low|noisy|manual-lock|large-water-change|late-brake|unknown|overflow|rush|storm|fatigue|unstable|crowded|high/i.test(String(value)));
  const warnings = (scenario.flags || []).includes('needsReview') || risky ? 1 : 0;
  return { id: scenario.id, status: warnings ? 'warning' : 'pass', accepted: 1, warnings, missing: [], score: warnings ? 86 : 96 };
}

export function summarizeProduct() {
  return { name: product.ideaName, repo: product.repo, domain: product.domain, releaseTarget: product.publicTarget, platformScope: product.platformScope, responsibilities: product.modules, requiredInputs: product.requiredInputs };
}
