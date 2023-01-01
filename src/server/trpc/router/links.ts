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
      z.object({
        url: z.string(),
        userId: z.string(),
        type: z.enum(["platform", "website"]),
        platformId: z.string().nullish(),
        title: z.string().nullish(),
      })
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.link.create({
        data: {
          url: input.url,
          userId: input.userId,
          type: input.type,
          platformId: input.platformId,
          title: input.title,
        },
      });
    }),
});
