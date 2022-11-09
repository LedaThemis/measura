import { DayOfMonth, DayOfWeek, MonthOfYear } from "../types/reminders";

type TimeType = {
  hours: number;
  minutes: number;
};

interface BaseInputType {
  time: TimeType;
}

interface DailyInputType extends BaseInputType {
  frequency: "daily";
}

interface WeeklyInputType extends BaseInputType {
  frequency: "weekly";
  daysOfWeek: DayOfWeek[];
}

interface MonthlyInputType extends BaseInputType {
  frequency: "monthly";
  daysOfMonth: DayOfMonth[];
}

interface YearlyInputType extends BaseInputType {
  frequency: "yearly";
  monthsOfYear: MonthOfYear[];
  daysOfMonth: DayOfMonth[];
}

type InputType =
  | DailyInputType
  | WeeklyInputType
  | MonthlyInputType
  | YearlyInputType;

function generateCronExpression(input: InputType) {
  const {
    frequency,
    time: { hours, minutes },
  } = input;

  function joinList<T>(list: { value: T; label: string }[]) {
    return list.map(({ value }) => value).join(",");
  }

  switch (frequency) {
    case "daily":
      return `${minutes} ${hours} * * *`;
    case "weekly":
      return `${minutes} ${hours} * * ${joinList(input.daysOfWeek)}`;
    case "monthly":
      return `${minutes} ${hours} ${joinList(input.daysOfMonth)} * *`;
    case "yearly":
      return `${minutes} ${hours} ${joinList(input.daysOfMonth)} ${joinList(
        input.monthsOfYear
      )} *`;
  }
}

export default generateCronExpression;
