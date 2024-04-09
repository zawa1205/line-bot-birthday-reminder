import { pushMessage } from "./pushMessage";

export function checkAndMakeSheet(sheetName: string) {
  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const file = SpreadsheetApp.openById(spreadsheetId);

  if (file.getSheetByName(sheetName) === null) {
    const newSheet = file.insertSheet();
    newSheet.setName(sheetName);
    pushMessage({ id: sheetName, message: "リマインドを開始するよ" });
  } else {
    pushMessage({ id: sheetName, message: "すでに使えるよ！" });
  }
}
