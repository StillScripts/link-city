import { router } from "../trpc";
import { authRouter } from "./auth";
import { linksRouter } from "./links";
import { platformsRouter } from "./platforms";

export const appRouter = router({
  links: linksRouter,
  platforms: platformsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
