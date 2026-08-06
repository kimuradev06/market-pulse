# Market Pulse

金融機関勤務者向けのマーケットインテリジェンスダッシュボードです。

毎朝5分で株式・債券・為替・REIT・経済イベントを把握し、業務開始前の情報収集を効率化することを目的としています。

---

## Features

### Market Overview

- 日経平均
- S&P500
- USD/JPY
- 日本国債10年利回り
- 米国10年国債利回り
- 東証REIT指数

---

### Morning Brief

マーケットデータを基に、

- 当日の相場概況
- 注目ポイント
- リスク要因

を自動生成します。

将来的にはAmazon Bedrockを利用したAI要約へ拡張予定です。

---

### Economic Calendar

当日の重要イベントを表示します。

例

- FOMC
- 日銀金融政策決定会合
- 米雇用統計
- CPI
- GDP

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend（Planned）

- AWS Lambda
- API Gateway
- DynamoDB

### Infrastructure（Planned）

- Terraform

### AI（Planned）

- Amazon Bedrock

---

## Project Structure

```
frontend/
backend/
infrastructure/
docs/
```

---

## Roadmap

- [x] Dashboard UI
- [x] USD/JPY API Integration
- [ ] Nikkei 225
- [ ] S&P500
- [ ] US Treasury
- [ ] REIT
- [ ] Economic Calendar
- [ ] Morning Brief
- [ ] AI Summary
- [ ] AWS Migration

---

## Goal

このプロジェクトは単なるポートフォリオではなく、

**金融機関勤務者が毎朝利用できるマーケットダッシュボード**

を目指しています。

また、

- React
- TypeScript
- API設計
- AWS
- Terraform
- GitHub Flow

を実践的に学ぶことも目的としています。
