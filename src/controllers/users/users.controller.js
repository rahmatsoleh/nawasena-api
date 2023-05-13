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

export const patchProviderDetail = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.email,
      },
    });

    if (!user)
      return res.status(404).json({
        error: true,
        message: "User not found",
        data: [],
      });

    const response = await prisma.providerDetail.update({
      where: {
        userId: user.id,
      },
      data: {
        ...req.body,
      },
      include: {
        user: true,
      },
    });

    if (!response)
      return res.status(400).json({
        error: true,
        message: "Failed update data",
        data: [],
      });

    return res.status(200).json({
      error: false,
      message: "Success update data",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
