import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createHistoryService = async (req, res, next) => {
  try {
    const historyService = await prisma.historyService.create({
      data: req.body,
    });

    if (!historyService)
      return res.status(400).json({
        error: true,
        message: "Failed created historyService",
        data: null,
      });

    return res.status(201).json({
      error: false,
      message: "Success created historyService",
      data: historyService,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
