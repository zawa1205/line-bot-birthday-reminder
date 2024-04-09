type RegisterBirthdays = {
  id: string;
  birthdays: { birthday: string; name: string }[];
};

export function registerBirthdays({ id, birthdays }: RegisterBirthdays) {
  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const file = SpreadsheetApp.openById(spreadsheetId);
  const sheet = file.getSheetByName(id);

  // シートはA1はじまりなので、indexも1はじまり
  const lastRowIndex = sheet.getLastRow();
  for (let index = 1; index <= birthdays.length; index++) {
    sheet
      .getRange(`A${index + lastRowIndex}`)
      .setValue(birthdays[index - 1].birthday);
    sheet
      .getRange(`B${index + lastRowIndex}`)
      .setValue(birthdays[index - 1].name);
  }
}
