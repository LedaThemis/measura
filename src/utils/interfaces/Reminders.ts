interface ErrorResponse {
  state: "failed";
  error: string;
}

export type ResponseType<T extends { state: "success" }> = T | ErrorResponse;

export interface ReminderType {
  id: string;
  text: string;
  cron: string;
  dueDate: string;
  userId: string;
}

export interface RemindersGetSuccessResponse {
  state: "success";
  reminders: ReminderType[];
}

export type RemindersGetResponse = ResponseType<RemindersGetSuccessResponse>;

export type RemindersCreateResponse = ResponseType<{ state: "success" }>;

export type RemindersDeleteResponse = ResponseType<{ state: "success" }>;
