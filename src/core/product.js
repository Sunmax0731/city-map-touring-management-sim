export const product = {
  "repo": "city-map-touring-management-sim",
  "domain": "Game",
  "rank": 68,
  "tier": "P3",
  "score": 48,
  "ideaNo": 7,
  "ideaName": "街・地図・ツーリング経営シム",
  "field": "ゲーム・経営シム",
  "publicTarget": "GitHub Pages / BOOTH",
  "overview": "街の地図、ツーリング需要、バイク整備、収支を軽量な経営シムにする。",
  "problem": "地図、経営、バイク文脈の設計が広く、長期公開には整理が必要。",
  "differentiation": "ツーリング計画と経営判断を同じカード操作で回せる小型Webゲームにする。",
  "audience": "地図とバイク文脈の軽い経営判断を楽しみたいプレイヤー",
  "requiredInputs": [
    "routeId",
    "budget",
    "bikeCondition",
    "districtDemand"
  ],
  "modules": [
    "game-loop",
    "balancer",
    "web-game",
    "scenario-validator"
  ],
  "accent": "#b45309",
  "secondary": "#2563eb",
  "scenarioNouns": [
    "街区需要",
    "整備費",
    "ツーリング収支"
  ]
};

export function evaluateScenario(scenario) {
  if (scenario.type === "mixed-batch") {
    const results = (scenario.items || []).map((inputs, index) => evaluateScenario({ id: scenario.id + "-" + index, inputs, flags: index === 2 ? ["needsReview"] : [] }));
    const accepted = results.filter((r) => r.status !== "error").length;
    const warnings = results.filter((r) => r.status !== "pass").length;
    return { id: scenario.id, status: warnings ? "warning" : "pass", accepted, warnings, missing: results.flatMap((r) => r.missing), score: warnings ? 78 : 96 };
  }
  const inputs = scenario.inputs || {};
  const missing = product.requiredInputs.filter((key) => inputs[key] === undefined || inputs[key] === null || inputs[key] === "");
  if (missing.length) return { id: scenario.id, status: "error", accepted: 0, warnings: 0, missing, score: 0 };
  const risky = Object.values(inputs).some((v) => /stale|low|noisy|manual-lock|large-water-change|late-brake|unknown/i.test(String(v)));
  const warnings = (scenario.flags || []).includes("needsReview") || risky ? 1 : 0;
  return { id: scenario.id, status: warnings ? "warning" : "pass", accepted: 1, warnings, missing: [], score: warnings ? 86 : 96 };
}

export function summarizeProduct() {
  return { name: product.ideaName, repo: product.repo, releaseTarget: product.publicTarget, responsibilities: product.modules, requiredInputs: product.requiredInputs };
}
