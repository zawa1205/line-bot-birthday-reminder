import { getBirthdaysObject } from "./getBirthdaysObject";
import { pushMessage } from "./pushMessage";

const REPLY_URL = "https://api.line.me/v2/bot/message/reply";

export function lineBotBirthDayReminder() {
  const birthdaysObject = getBirthdaysObject();

  if (Object.keys(birthdaysObject).length === 0)
    return ContentService.createTextOutput("SUCCESS");

  Object.keys(birthdaysObject).forEach(function (id) {
    const birthdayObject = birthdaysObject[id];
    let message = "";
    if (birthdayObject.today.length !== 0) {
      message += "今日は ";
      message += birthdayObject.today.join(", ");
      message += " の誕生日、おめでとう！";
    }
    if (birthdayObject.tomorrow.length !== 0) {
      if (birthdayObject.today.length !== 0) message += "\n";
      message += "明日は ";
      message += birthdayObject.tomorrow.join(", ");
      message += " の誕生日じゃん！";
    }
    if (birthdayObject.oneWeekLater.length !== 0) {
      if (birthdayObject.tomorrow.length !== 0) message += "\n";
      message += "1週間後は ";
      message += birthdayObject.oneWeekLater.join(", ");
      message += " の誕生日でしょ？覚えてるって";
    }

    pushMessage({ id, message });
  });
}
