/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: prisma.ts: initialization functions for Prisma ORM, run at the start of the program.

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }

    prisma = global.prisma;
  }
}

export { prisma };

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma =
//   global.prisma ||
//   new PrismaClient({
//     // log: ["query"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }

// export { prisma };
