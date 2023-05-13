import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res, next) => {
  try {
    const { role } = req.query;

    if (role === "admin") {
      const response = await prisma.user.findMany({
        where: {
          role: "admin",
        },
      });

      if (!response)
        return res.status(404).json({
          error: true,
          message: "Failed retrieved providers",
          data: [],
        });

      return res.status(200).json({
        error: false,
        message: "Success retrieved providers",
        data: response,
      });
    } else if (role === "provider") {
      const response = await prisma.user.findMany({
        where: {
          role: "provider",
        },
        include: {
          ProviderDetail: true,
        },
      });

      if (!response)
        return res.status(404).json({
          error: true,
          message: "Failed retrieved providers",
          data: [],
        });

      return res.status(200).json({
        error: false,
        message: "Success retrieved providers",
        data: response,
      });
    } else if (role === "user") {
      const response = await prisma.user.findMany({
        where: {
          role: "user",
        },
      });

      if (!response)
        return res.status(404).json({
          error: true,
          message: "Failed retrieved providers",
          data: [],
        });

      return res.status(200).json({
        error: false,
        message: "Success retrieved providers",
        data: response,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
