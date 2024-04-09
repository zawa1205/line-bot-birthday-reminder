import { format } from "date-fns";
import { getBirthdaysList } from "./getBirthdaysList";
import { pushMessage } from "./pushMessage";

type RemoveBirthday = {
  sheetId: string;
  rowIndex: number;
  birthdayObject: {
    birthday: string;
    name: string;
  };
};
export function removeBirthday({
  sheetId,
  rowIndex,
  birthdayObject,
}: RemoveBirthday) {
  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const file = SpreadsheetApp.openById(spreadsheetId);
  const sheet = file.getSheetByName(sheetId);

  const birthday = sheet.getRange(`A${rowIndex}`).getValue();
  const formattedBirthday = format(birthday, "MM/dd");
  const name = sheet.getRange(`B${rowIndex}`).getValue();

  if (
    formattedBirthday === birthdayObject.birthday &&
    name === birthdayObject.name
  ) {
    sheet.deleteRow(rowIndex);
    pushMessage({ id: sheetId, message: "消したよ" });
  } else {
    pushMessage({ id: sheetId, message: "間違ってないかい？" });
  }
  getBirthdaysList(sheetId);
}
