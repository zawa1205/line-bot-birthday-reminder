const REPLY_URL = "https://api.line.me/v2/bot/message/reply";

export function replyMessage(id: string) {
  const message = "";
  if (!message) return;
  const payload = {
    to: id, //ユーザーID | グループID
    messages: [{ type: "text", text: message }],
  };

  // TODO: as any
  const params = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + process.env.LINE_BOT_CHANNEL_TOKEN,
    },
    payload: JSON.stringify(payload),
  } as any;
  UrlFetchApp.fetch(REPLY_URL, params);
}
