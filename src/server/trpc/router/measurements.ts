import { z } from "zod";
import { measurementTypesUpperCase } from "../../../utils/measurementTypes";
import { router, protectedProcedure } from "../trpc";

export const measurementsRouter = router({
  createMeasurement: protectedProcedure
    .input(
      z.object({
        type: z.enum(measurementTypesUpperCase),
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
  updateMeasurement: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "Id is required." }),
        type: z.enum(measurementTypesUpperCase),
        value: z
          .number({
            required_error: "Value is required.",
            invalid_type_error: "Value must be a number greater than 0",
          })
          .gte(0.0001),
        date: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const date = input.date ?? new Date();

      await ctx.prisma.measurement.updateMany({
        where: {
          id: input.id,
          userId,
        },
        data: {
          type: input.type,
          value: input.value,
          date,
        },
      });
    }),
});
