import { router, publicProcedure } from "../trpc";

export const platformsRouter = router({
  getPlatforms: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.platform.findMany();
  }),
});
