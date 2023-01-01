import type { PlatformOption } from "../src/components/PlatformAutocomplete";
import { prisma } from "../src/server/db/client";

const platforms: { url: string; name: PlatformOption }[] = [
  { name: "Facebook", url: "https://www.facebook.com/" },
  { name: "Twitter", url: "https://twitter.com/" },
  { name: "GitHub", url: "https://github.com/" },
  { name: "Instagram", url: "https://www.instagram.com/" },
];

async function main() {
  platforms.forEach(async ({ name, url }) => {
    await prisma.platform.upsert({
      where: { name },
      create: {
        name,
        url,
      },
      update: {},
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
