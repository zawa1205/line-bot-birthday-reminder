export function getAndPushId(e) {
  console.log(e);
  var json = JSON.parse(e.postData.contents);
  var UID = json.events[0].source.userId;
  var GID = json.events[0].source.groupId;

  const spreadsheetId = process.env.SPREAD_SHEET_ID;

  const file = SpreadsheetApp.openById(spreadsheetId);
  const sheet = file.getSheetByName("シート1");

  sheet.getRange("C3").setValue(e.postData.contents);
  sheet.getRange("C1").setValue(UID);
  sheet.getRange("C2").setValue(GID);
}
