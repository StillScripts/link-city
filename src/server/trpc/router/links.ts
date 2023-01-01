import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const linksRouter = router({
  getUserLinks: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
        include: {
          links: true,
        },
      });
    }),

  updateLinkPage: publicProcedure
    .input(
      z.object({ id: z.string(), username: z.string(), about: z.string() })
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          username: input.username,
          about: input.about,
        },
      });
    }),

  addLink: publicProcedure
    .input(
      z.object({ id: z.string(), username: z.string(), about: z.string() })
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          username: input.username,
          about: input.about,
        },
      });
    }),
});
