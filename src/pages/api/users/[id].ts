import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, auth },
    method,
  } = req;

  if (
    typeof auth === "string" &&
    auth === env.REMINDERS_AUTH_KEY &&
    typeof id === "string"
  ) {
    const user =
      (await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })) ?? null;

    switch (method) {
      case "GET":
        res.status(200).json({ user });
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(404).end("Not Found");
  }
}
