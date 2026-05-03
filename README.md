# 😷 Pollen Alert Automator (GAS × Google Pollen API)

Google Apps Script (GAS) と Google Pollen API を活用し、毎日の花粉飛散量を自動チェックするスクリプトです。
飛散量が**「あなた自身の身体の感度（設定した閾値）」**を超えた日だけ、Googleカレンダーに自動で警告アラートを登録します。

## ✨ 特徴 (Features)

- **完全自動化**: 毎朝GASのトリガーで自動実行され、カレンダーを見るだけで花粉対策が必要か判断できます。
- **パーソナライズされた閾値設定**: 世間一般の「多い/少ない」ではなく、あなた自身の体質に合わせた通知レベル（`PERSONAL_THRESHOLD`）を設定可能です。
- **サーバーレス**: サーバーの構築不要。Googleアカウントとブラウザがあれば誰でも無料で動かせます。

## 🚀 セットアップ (Setup)

### 1. 事前準備
本スクリプトを動かすには、以下の3つが必要です。
1. **Google Cloud APIキー**: [Google Cloud Console](https://console.cloud.google.com/) にてプロジェクトを作成し、`Pollen API` を有効化してAPIキーを取得してください。
2. **GoogleカレンダーID**: アラートを登録したいカレンダーのID（通常はGmailアドレス）を控えてください。
3. **緯度・経度**: 監視したい地域（自宅や職場など）の緯度（Latitude）と経度（Longitude）をGoogleマップ等で取得してください。

### 2. GASの導入
1. Googleドライブから [Google Apps Script] を新規作成します。
2. `Code.gs` に本リポジトリのコードをコピー＆ペーストします。
3. コード上部の初期設定（変数）を、ご自身の環境に合わせて書き換えます。

```javascript
const API_KEY = 'YOUR_API_KEY';
const LAT = 35.5824;  // 監視したい地域の緯度
const LNG = 139.6627; // 監視したい地域の経度
const CALENDAR_ID = 'your_email@gmail.com'; 
const PERSONAL_THRESHOLD = 1; // あなたの感度に合わせて設定 (0~5)
```
3. 閾値（PERSONAL_THRESHOLD）のチューニング
あなたの花粉症の重症度に合わせて、以下の数値を設定してください。

0: None（なし）

1: Very Low（非常に少ない）※少しでも飛んでいたら通知したい敏感な方向け

2: Low（少ない）

3: Moderate（中程度）

4: High（多い）

5: Very High（非常に多い）※本当にヤバい日だけ通知してほしい方向け

4. トリガーの設定
GASのエディタ画面左側の「時計マーク（トリガー）」から、以下のように設定して保存します。

実行する関数: checkPollenAndAlert

イベントのソース: 時間主導型

トリガーのタイプ: 日付ベースのタイマー

時刻の選択: 午前5時～6時 （お好みの朝の時間帯）

※初回実行時のみ、Googleによる「承認」のポップアップが表示されます。「詳細を表示」→「安全ではないページに移動」から許可を与えてください。

📝 関連記事 (Articles)
本スクリプトの詳しい構築手順や、API・GASの実践的な活用方法については、以下の記事で解説しています。

【GAS活用】花粉アラート自動登録！Pollen API x Googleカレンダーで完全自動化

👤 著者 (Author)
伊藤正章 (Masaaki Ito)

IT技術の教育とビジネス実践を軸に活動するクリエイター。「IT技術で日常の課題を解決する」をテーマに、GCPやGASの実用的なプログラムを発信しています。
