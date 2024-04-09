import { checkAndMakeSheet } from "./checkAndMakeSheet";
import { inputStringToBirthdayObjects } from "./feature/inputStringToBirthdayObjects";
import { inputStringToBirthdayObjectsWithRowId } from "./feature/inputStringToBirthdayObjectsWithRowId";
import { getBirthdaysList } from "./getBirthdaysList";
import { pushMessage } from "./pushMessage";
import { registerBirthdays } from "./registerBirthdays";
import { removeBirthday } from "./removeBirthday";

/**
 * doPOST
 * POSTリクエストのハンドリング
 */
export function doPost(e) {
  const json = JSON.parse(e.postData.contents);

  const event = json.events[0];
  const eventType = event.type; // イベントのタイプ
  const id = event.source.groupId ? event.source.groupId : event.source.userId; // 送信元ユーザーのID
  const replyToken = event.replyToken; // 応答メッセージを送る際に使用する応答トークン

  if (eventType === "follow") {
    // フォローイベントの場合
  } else if (eventType === "message") {
    // メッセージイベントの場合
    if (event.message.type === "text") {
      // テキストメッセージの場合
      const text = event.message.text;

      if (/(＠|@)サム/.test(text)) {
        if (/(\/|／)開始/.test(text)) {
          checkAndMakeSheet(id);
        } else if (/(\/|／)一覧/.test(text)) {
          getBirthdaysList(id);
        } else if (/(\/|／)削除/.test(text)) {
          const { rowIndex, birthdayObject } =
            inputStringToBirthdayObjectsWithRowId(text, id);
          if (rowIndex !== null && birthdayObject !== null) {
            removeBirthday({ sheetId: id, rowIndex, birthdayObject });
          } else {
            const validationErrorMessage = "間違ってないかい？";
            pushMessage({ id, message: validationErrorMessage });
            getBirthdaysList(id);
          }
        } else if (/(\/|／)登録/.test(text)) {
          // @サム
          // /登録
          // 01/31 名前１
          // 02/02 名前２
          const birthdayObjects = inputStringToBirthdayObjects(text);

          const validationErrorMessage =
            "ちゃんと↓のフォーマットで入力してね\n----------\n@サム\n/登録\nMM/dd 名前\n----------";

          if (birthdayObjects) {
            registerBirthdays({ id, birthdays: birthdayObjects });
            pushMessage({ id, message: "覚えたよ" });
          } else {
            pushMessage({ id, message: validationErrorMessage });
          }
        } else {
          // @サム がついていていずれの条件にも当てはまらないとき
          const validationErrorMessage =
            "以下のコマンドが使えるよ\n----------\n＠サム\n/開始\n----------\n@サム\n/一覧\n@サム\n/登録\nMM/dd 名前\n@サム\n/削除\nId MM/dd 名前";
          pushMessage({ id, message: validationErrorMessage });
        }
      }
    }
  } else if (eventType === "postback") {
    // ポストバックイベントの場合
    const PB_DATA = event.postback.data; // ポストバックデータ
  }
  return ContentService.createTextOutput("SUCCESS");
}
