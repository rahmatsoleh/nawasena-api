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

export const getAllService = async (req, res, next) => {
  try {
    let where = {};

    if (req.query?.categoryProductId) {
      where["categoryProductId"] = req.query?.categoryProductId;
    }

    if (req.query?.search) {
      where["namaUsaha"] = {
        contains: req.query?.search,
      };
    }

    const services = await prisma.providerService.findMany({
      where,
    });

    if (!services)
      return res.status(400).json({
        error: true,
        message: "Failed get all service",
        data: null,
      });

    return res.status(200).json({
      error: false,
      message: "Success get all service",
      data: services,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const findServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await prisma.providerService.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          include: {
            ProviderDetail: true,
          },
        },
        categoryProduct: true,
        operasionals: true,
        ratingService: true,
        historyService: true,
      },
    });

    if (!response)
      return res.status(404).json({
        error: true,
        message: "Service not found",
        data: null,
      });

    return res.status(200).json({
      error: false,
      message: "Service retrieved",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
