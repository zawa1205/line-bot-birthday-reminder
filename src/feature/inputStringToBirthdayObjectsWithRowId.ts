import { pushMessage } from "../pushMessage";

type BirthdayObject = { birthday: string; name: string };

type ReturnValue = {
  rowIndex: number;
  birthdayObject: BirthdayObject;
};

export function inputStringToBirthdayObjectsWithRowId(
  text: string | null,
  id: string | null
): ReturnValue {
  const birthdayStrings = text.split(/\r\n|\n|\r/g);
  birthdayStrings.shift();
  birthdayStrings.shift();

  if (birthdayStrings.length !== 1) {
    return { rowIndex: null, birthdayObject: null };
  }

  const birthdayString = birthdayStrings[0];

  const birthdayInfo = birthdayString.split(/\s+/g);
  if (birthdayInfo.length !== 3) {
    return { rowIndex: null, birthdayObject: null };
  }

  const rowIndex = birthdayInfo[0];
  const birthday = birthdayInfo[1];
  const name = birthdayInfo[2];
  const birthdayRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

  // 数字でない場合はNaNになり、NaN <= 0 がtrueになる
  if (Number(rowIndex) <= 0) {
    return { rowIndex: null, birthdayObject: null };
  }
  if (!birthdayRegex.test(birthday)) {
    return { rowIndex: null, birthdayObject: null };
  }

  return {
    rowIndex: Number(rowIndex),
    birthdayObject: {
      birthday,
      name,
    },
  };
}
