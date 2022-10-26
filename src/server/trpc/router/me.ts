import { z } from "zod";
import { measurementTypesLowerCase } from "../../../utils/measurementTypes";
import { router, protectedProcedure } from "../trpc";

const measurementValidator = (fieldName: string) =>
  z
    .number({
      invalid_type_error: `${fieldName} must be a number greater than 0`,
    })
    .gte(0.001)
    .or(z.null());

const goalSchema = {
  weight: measurementValidator("Weight"),
  height: measurementValidator("Height"),
  neck: measurementValidator("Neck"),
  shoulders: measurementValidator("Shoulder"),
  arms: measurementValidator("Arms"),
  chest: measurementValidator("Chest"),
  forearms: measurementValidator("Forearms"),
  wrist: measurementValidator("Wrist"),
  waist: measurementValidator("Waist"),
  hips: measurementValidator("Hips"),
  thighs: measurementValidator("Thighs"),
  calves: measurementValidator("Calves"),
};

export const meRouter = router({
  getGoal: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        goal: true,
      },
    });

    return res?.goal;
  }),
  setGoal: protectedProcedure
    .input(z.object(goalSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          goal: {
            upsert: {
              create: input,
              update: input,
            },
          },
        },
      });
    }),
  getEntries: protectedProcedure
    .input(
      z
        .object({
          sort: z.enum(["asc", "desc"]),
        })
        .default({
          sort: "desc",
        })
    )
    .query(async ({ ctx, input }) => {
      const measurements = await ctx.prisma.measurement.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: {
          date: input.sort,
        },
      });

      return measurements;
    }),
  getLastMonthEntries: protectedProcedure.query(async ({ ctx }) => {
    const getLastMonthEntry = async (
      type: typeof measurementTypesLowerCase[number]
    ) => {
      const currentDate = new Date();
      const currentMonthFirstDayDate = new Date(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth()
      );

      const measurement = (
        (await ctx.prisma.measurement.findFirst({
          where: {
            date: {
              lt: currentMonthFirstDayDate,
            },
            type: type.toUpperCase(),
            userId: ctx.session.user.id,
          },
          orderBy: {
            date: "desc",
          },
          select: {
            value: true,
          },
        })) ?? { value: null }
      ).value;

      return measurement;
    };

    return {
      weight: await getLastMonthEntry("weight"),
      height: await getLastMonthEntry("height"),
      neck: await getLastMonthEntry("neck"),
      shoulders: await getLastMonthEntry("shoulders"),
      arms: await getLastMonthEntry("arms"),
      chest: await getLastMonthEntry("chest"),
      forearms: await getLastMonthEntry("forearms"),
      wrist: await getLastMonthEntry("wrist"),
      waist: await getLastMonthEntry("waist"),
      hips: await getLastMonthEntry("hips"),
      thighs: await getLastMonthEntry("thighs"),
      calves: await getLastMonthEntry("calves"),
    };
  }),
  getLatestEntries: protectedProcedure.query(async ({ ctx }) => {
    const getLatestEntry = async (
      type: typeof measurementTypesLowerCase[number]
    ) =>
      (
        (await ctx.prisma.measurement.findFirst({
          where: {
            type: type.toUpperCase(),
            userId: ctx.session.user.id,
          },
          orderBy: {
            date: "desc",
          },
          select: {
            value: true,
          },
        })) ?? { value: null }
      ).value;

    return {
      weight: await getLatestEntry("weight"),
      height: await getLatestEntry("height"),
      neck: await getLatestEntry("neck"),
      shoulders: await getLatestEntry("shoulders"),
      arms: await getLatestEntry("arms"),
      chest: await getLatestEntry("chest"),
      forearms: await getLatestEntry("forearms"),
      wrist: await getLatestEntry("wrist"),
      waist: await getLatestEntry("waist"),
      hips: await getLatestEntry("hips"),
      thighs: await getLatestEntry("thighs"),
      calves: await getLatestEntry("calves"),
    };
  }),
});
