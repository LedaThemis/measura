import { z } from "zod";
import { env } from "../../../env/server.mjs";
import {
  RemindersCreateResponse,
  RemindersDeleteResponse,
  RemindersGetResponse,
} from "../../../utils/interfaces/Reminders.js";
import { router, protectedProcedure } from "../trpc";

const authorizationHeaders = {
  authorization: `Bearer ${env.REMINDERS_AUTH_KEY}`,
};

const reminderCreateSchema = z.object({
  text: z.string({ required_error: "text is required" }),
  cron: z.string({ required_error: "cron is required" }),
});

const reminderDeleteSchema = z.object({
  reminderId: z.string({ required_error: "reminderId is required" }),
});

export const remindersRouter = router({
  getReminders: protectedProcedure.query(async ({ ctx }) => {
    const response = await fetch(
      `${env.REMINDERS_ADDRESS}/reminders?userId=${ctx.session.user.id}`,
      {
        headers: authorizationHeaders,
      }
    );

    const data: RemindersGetResponse = await response.json();

    return data;
  }),
  createReminder: protectedProcedure
    .input(reminderCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const response = await fetch(`${env.REMINDERS_ADDRESS}/reminders`, {
        method: "POST",
        headers: {
          ...authorizationHeaders,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          text: input.text,
          cron: input.cron,
          userId: ctx.session.user.id,
        }),
      });

      const data: RemindersCreateResponse = await response.json();

      return data;
    }),
  deleteReminder: protectedProcedure
    .input(reminderDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      const response = await fetch(
        `${env.REMINDERS_ADDRESS}/reminders/${input.reminderId}`,
        {
          method: "DELETE",
          headers: {
            ...authorizationHeaders,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userId: ctx.session.user.id,
          }),
        }
      );

      const data: RemindersDeleteResponse = await response.json();

      return data;
    }),
});
