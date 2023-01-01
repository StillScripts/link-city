import { router } from "../trpc";
import { authRouter } from "./auth";
import { linksRouter } from "./links";

export const appRouter = router({
  links: linksRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
