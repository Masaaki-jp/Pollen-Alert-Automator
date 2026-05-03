// ==========================================
// 初期設定：以下の変数を自身の環境に合わせて変更してください
// ==========================================
const API_KEY = 'ここにGoogle CloudのAPIキーを入力';
const LAT = 35.5824;  
const LNG = 139.6627; 
const CALENDAR_ID = 'ここにカレンダーIDを入力@gmail.com'; 

// ★ ここが最重要ポイント！あなたの身体の感度に合わせて数値を設定してください
// 0: なし, 1: 非常に少ない, 2: 少ない, 3: 中程度, 4: 多い, 5: 非常に多い
// 例：「少しでも飛んでたら（レベル1以上で）通知してほしい」なら 1 に設定
const PERSONAL_THRESHOLD = 1;

// ==========================================
// メイン処理
// ==========================================
function checkPollenAndAlert() {
  // 1. Pollen APIのエンドポイント（1日分のデータを要求）
  const url = `https://pollen.googleapis.com/v1/forecast:lookup?key=${API_KEY}&location.latitude=${LAT}&location.longitude=${LNG}&days=1`;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  
  if (response.getResponseCode() !== 200) {
    Logger.log("APIエラー: " + response.getContentText());
    return;
  }

  const data = JSON.parse(response.getContentText());
  
  // データが存在しない場合のフェイルセーフ
  if (!data.dailyInfo || data.dailyInfo.length === 0) {
    Logger.log("花粉データが取得できませんでした。");
    return;
  }

  // 2. 本日の花粉データの解析
  const todayInfo = data.dailyInfo[0];
  const pollenTypes = todayInfo.pollenTypeInfo;
  
  let isDanger = false;
  let alertMessage = "【本日の花粉飛散状況】\n\n";

  // 各花粉の種類（TREE, WEED, GRASS）をループ処理
  pollenTypes.forEach(pollen => {
    const typeName = translatePollenType(pollen.code);
    const indexCategory = pollen.indexInfo.category; 
    const indexValue = pollen.indexInfo.value;       

    alertMessage += `・${typeName} : ${indexCategory} (レベル ${indexValue})\n`;

    // ★ ハードコーディングせず、自分専用の閾値（PERSONAL_THRESHOLD）で判定する
    if (indexValue >= PERSONAL_THRESHOLD) {
      isDanger = true;
    }
  });

  // 3. 基準値を超えていたらカレンダーに登録
  if (isDanger) {
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    const today = new Date();
    const title = "😷 【警戒】本日は花粉の飛散量が多いです";

    calendar.createAllDayEvent(title, today, {
       description: alertMessage
    });
    Logger.log("カレンダーにアラートを登録しました！");
  } else {
    Logger.log("本日は平和です。アラートはスキップしました。");
  }
}

// 英語のコード名を日本語に変換するヘルパー関数
function translatePollenType(code) {
  switch (code) {
    case 'TREE': return '樹木（スギ・ヒノキ等）';
    case 'WEED': return '雑草（ブタクサ・ヨモギ等）';
    case 'GRASS': return 'イネ科';
    default: return code;
  }
}
