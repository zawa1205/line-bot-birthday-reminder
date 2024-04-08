import { lineBotBirthDayReminder } from "./lineBotBirthDayReminder";

// GASから参照したい変数はglobalオブジェクトに渡してあげる必要がある
(global as any).lineBotBirthDayReminder = lineBotBirthDayReminder;
