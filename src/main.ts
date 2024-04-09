import { doGet } from "./doGet";
import { doPost } from "./doPost";
import { lineBotBirthDayReminder } from "./lineBotBirthDayReminder";

// GASから参照したい変数はglobalオブジェクトに渡してあげる必要がある
(global as any).lineBotBirthDayReminder = lineBotBirthDayReminder;
(global as any).doGet = doGet;
(global as any).doPost = doPost;
