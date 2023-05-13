import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createService = async (req, res, next) => {
  try {
    const service = await prisma.providerService.create({
      data: req.body,
    });

    if (!service)
      return res.status(400).json({
        error: true,
        message: "Failed created service",
        data: null,
      });

    return res.status(201).json({
      error: false,
      message: "Success created service",
      data: service,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
