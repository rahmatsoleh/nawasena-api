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

export const patchHistoryService = async (req, res, next) => {
  try {
    const historyService = await prisma.historyService.update({
      where: {
        id: req.query?.id,
      },
      data: req.body,
    });

    if (!historyService)
      return res.status(400).json({
        error: true,
        message: "Failed updated historyService",
        data: null,
      });

    return res.status(200).json({
      error: false,
      message: "Success updated historyService",
      data: historyService,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllHistoryService = async (req, res, next) => {
  try {
    const historyServices = await prisma.historyService.findMany({
      include: {
        providerService: true,
      },
    });

    if (!historyServices)
      return res.status(400).json({
        error: true,
        message: "Failed get all historyService",
        data: null,
      });

    return res.status(200).json({
      error: false,
      message: "Success get all historyService",
      data: historyServices,
    });
  } catch (error) {
    console.log(object);
    next(error);
  }
};
