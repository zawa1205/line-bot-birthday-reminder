import { format, addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function lineBotBirthDayReminder() {
  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const sheetName = "シート1";

  const file = SpreadsheetApp.openById(spreadsheetId);
  // シートがない場合は null が帰ってくる

  const sheet = file.getSheetByName(sheetName);

  // console.log(value);
  // range.setValue("ほげ");
  const today = toZonedTime(new Date(), "Asia/Tokyo");
  console.log("今日", today);
  const tomorrow = addDays(today, 1);
  const formattedTomorrow = format(tomorrow, "MM/dd");
  console.log("明日", formattedTomorrow);

  // シートはA1はじまりなので、indexも1はじまり
  const lastRowIndex = sheet.getLastRow();

  for (let index = 1; index <= lastRowIndex; index++) {
    const birthday = sheet.getRange(`A${index}`).getValue();
    const formattedBirthday = format(birthday, "MM/dd");
    const name = sheet.getRange(`B${index}`).getValue();
    if (formattedTomorrow === formattedBirthday) {
      console.log(name, "birthday!");
    }
  }
}
