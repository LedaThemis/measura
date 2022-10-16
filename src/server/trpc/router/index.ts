// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { measurementsRouter } from "./measurements";

export const appRouter = router({
  auth: authRouter,
  measurements: measurementsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
