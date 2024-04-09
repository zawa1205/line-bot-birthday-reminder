type BirthdayObjects = { birthday: string; name: string }[];

export function inputStringToBirthdayObjects(
  text: string
): BirthdayObjects | undefined {
  const birthdayStrings = text.split(/\r\n|\n|\r/g);
  birthdayStrings.shift();
  birthdayStrings.shift();

  if (birthdayStrings.length === 0) return undefined;

  const birthdayObjects: BirthdayObjects = [];

  for (const birthdayString of birthdayStrings) {
    const birthdayInfo = birthdayString.split(/\s+/g);
    if (birthdayInfo.length !== 2) {
      return undefined;
    }

    const birthday = birthdayInfo[0];
    const name = birthdayInfo[1];
    const birthdayRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

    if (!birthdayRegex.test(birthday)) {
      return undefined;
    }
    birthdayObjects.push({ birthday, name });
  }
  return birthdayObjects;
}
