import { format, addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type BirthdaysObject = {
  today: string[];
  tomorrow: string[];
  oneWeekLater: string[];
};

type SheetsObj = {
  [prop: string]: BirthdaysObject;
};
const obj: SheetsObj = {};

export function getBirthdaysObject(): SheetsObj {
  const spreadsheetId = process.env.SPREAD_SHEET_ID;

  const file = SpreadsheetApp.openById(spreadsheetId);

  const sheets = file.getSheets();
  const sheetsList = [];

  sheets.forEach((sheet) => {
    const sheetName = sheet.getName();
    sheetsList.push(sheetName);
  });

  const sheetsObject = {};
  sheetsList.forEach((sheetName) => {
    const sheet = file.getSheetByName(sheetName);

    const today = toZonedTime(new Date(), "Asia/Tokyo");
    const tomorrow = addDays(today, 1);
    const oneWeekLater = addDays(today, 7);

    const formattedToday = format(today, "MM/dd");
    const formattedTomorrow = format(tomorrow, "MM/dd");
    const formattedOneWeekLater = format(oneWeekLater, "MM/dd");

    // シートはA1はじまりなので、indexも1はじまり
    const lastRowIndex = sheet.getLastRow();

    const birthdayObject = {
      today: [],
      tomorrow: [],
      oneWeekLater: [],
    };

    for (let index = 1; index <= lastRowIndex; index++) {
      const birthday = sheet.getRange(`A${index}`).getValue();
      const formattedBirthday = format(birthday, "MM/dd");
      const name = sheet.getRange(`B${index}`).getValue();

      if (formattedToday === formattedBirthday) {
        birthdayObject.today.push(name);
      } else if (formattedTomorrow === formattedBirthday) {
        birthdayObject.tomorrow.push(name);
      } else if (formattedOneWeekLater === formattedBirthday) {
        birthdayObject.oneWeekLater.push(name);
      }
    }
    if (
      birthdayObject.today.length === 0 &&
      birthdayObject.tomorrow.length === 0 &&
      birthdayObject.oneWeekLater.length === 0
    ) {
      // 誰も誕生日でなかったら何もしない
    } else {
      sheetsObject[sheetName] = birthdayObject;
    }
  });
  return sheetsObject;
}
