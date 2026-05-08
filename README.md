# 街・地図・ツーリング経営シム

city-map-touring-management-sim は、NON PICKUP 優先リスト Rank 68 / Game No.7 から昇格した closed alpha プロダクトです。街の地図、ツーリング需要、バイク整備、収支を軽量な経営シムにする。

## Quick Start

```powershell
cd D:\AI\Game\city-map-touring-management-sim
npm test
npm run cli
```

## Closed Alpha Scope

- 公開想定: GitHub Pages / BOOTH
- 対象ユーザー: 地図とバイク文脈の軽い経営判断を楽しみたいプレイヤー
- 手動テスト: Codex側では未実施。手順は `docs/manual-test.md` と `docs/strict-manual-test-addendum.md` に記載

## Architecture

- `src/core`: プロダクト定義と代表シナリオ評価
- `src/validators`: representative suite と期待結果の検証
- `src/report`: validation result、web smoke、QCDS metrics、deterministic docs ZIP の生成
- `src/review-model`: QCDS 評価モデル
- `src/cli`: CLI 検証入口
- `src/web`: 静的Web表示と主要操作
- `src/game`: game loop と balancing の境界

## Release Artifacts

- `dist/city-map-touring-management-sim-docs.zip`
- `dist/validation-result.json`
- `dist/web-smoke-result.json`
- `docs/release-evidence.json`
