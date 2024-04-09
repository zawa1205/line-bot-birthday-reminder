const PUSH_URL = "https://api.line.me/v2/bot/message/push";

export function pushMessage({ id, message }: { id: string; message: string }) {
  if (!message || !id) return;
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
  UrlFetchApp.fetch(PUSH_URL, params);
}
