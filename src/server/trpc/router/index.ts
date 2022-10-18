// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { meRouter } from "./me";
import { measurementsRouter } from "./measurements";

export const appRouter = router({
  auth: authRouter,
  measurements: measurementsRouter,
  me: meRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
