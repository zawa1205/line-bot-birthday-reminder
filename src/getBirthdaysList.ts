import { format } from "date-fns";
import { pushMessage } from "./pushMessage";

export function getBirthdaysList(id: string) {
  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const file = SpreadsheetApp.openById(spreadsheetId);
  const sheet = file.getSheetByName(id);
  // シートはA1はじまりなので、indexも1はじまり
  const lastRowIndex = sheet.getLastRow();

  let message = "";

  for (let index = 1; index <= lastRowIndex; index++) {
    const birthday = sheet.getRange(`A${index}`).getValue();
    const name = sheet.getRange(`B${index}`).getValue();
    const formattedBirthday = format(birthday, "MM/dd");

    message += `${index}　${formattedBirthday}　${name}\n`;
  }
  message +=
    "\n消したかったら\n----------\n@サム\n/削除\nID MM/dd 名前\n----------\nで消せるよ\n一度に一人ずつね";

  pushMessage({ id, message });
}
