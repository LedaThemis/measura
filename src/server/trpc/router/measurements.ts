import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

const measurementTypes = [
  "WEIGHT",
  "HEIGHT",
  "NECK",
  "SHOULDERS",
  "ARMS",
  "CHEST",
  "FOREARMS",
  "WRIST",
  "WAIST",
  "HIPS",
  "THIGHS",
  "CALVES",
] as const;

export const measurementsRouter = router({
  getMeasurementTypes: protectedProcedure.query(() => measurementTypes),
  createMeasurement: protectedProcedure
    .input(
      z.object({
        type: z.enum(measurementTypes),
        value: z
          .number({
            required_error: "Value is required.",
            invalid_type_error: "Value must be a number greater than 0",
          })
          .gte(0.0001),
        date: z.date().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const date = input.date ?? new Date();

      await ctx.prisma.measurement.create({
        data: {
          type: input.type,
          value: input.value,
          userId,
          date,
        },
      });
    }),
});
