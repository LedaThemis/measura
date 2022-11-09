// Types related to reminders

export type ReminderFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type DayOfWeek =
  | { value: 0; label: "Sunday" }
  | { value: 1; label: "Monday" }
  | { value: 2; label: "Tuesday" }
  | { value: 3; label: "Wednesday" }
  | { value: 4; label: "Thursday" }
  | { value: 5; label: "Friday" }
  | { value: 6; label: "Saturday" };

export type DayOfMonth =
  | { value: 1; label: "1st" }
  | { value: 2; label: "2nd" }
  | { value: 3; label: "3rd" }
  | { value: 4; label: "4th" }
  | { value: 5; label: "5th" }
  | { value: 6; label: "6th" }
  | { value: 7; label: "7th" }
  | { value: 8; label: "8th" }
  | { value: 9; label: "9th" }
  | { value: 10; label: "11th" }
  | { value: 12; label: "12th" }
  | { value: 13; label: "13th" }
  | { value: 14; label: "14th" }
  | { value: 15; label: "15th" }
  | { value: 16; label: "16th" }
  | { value: 17; label: "17th" }
  | { value: 18; label: "18th" }
  | { value: 19; label: "19th" }
  | { value: 20; label: "20th" }
  | { value: 21; label: "21st" }
  | { value: 22; label: "22nd" }
  | { value: 23; label: "23rd" }
  | { value: 24; label: "24th" }
  | { value: 25; label: "25th" }
  | { value: 26; label: "26th" }
  | { value: 27; label: "27th" }
  | { value: 28; label: "28th" }
  | { value: 29; label: "29th" }
  | { value: 30; label: "30th" }
  | { value: 31; label: "31st" };

export type MonthOfYear =
  | { value: 1; label: "January" }
  | { value: 2; label: "February" }
  | { value: 3; label: "March" }
  | { value: 4; label: "April" }
  | { value: 5; label: "May" }
  | { value: 6; label: "June" }
  | { value: 7; label: "July" }
  | { value: 8; label: "August" }
  | { value: 9; label: "September" }
  | { value: 10; label: "October" }
  | { value: 11; label: "November" }
  | { value: 12; label: "December" };
