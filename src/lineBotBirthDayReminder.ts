export function lineBotBirthDayReminder() {
  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const file = SpreadsheetApp.openById(spreadsheetId);
  const sheet = file.getSheetByName("シート1");
  const range = sheet.getRange("A1");
  const value = range.getValue();

  console.log(value);
  range.setValue("ほげ");
}
