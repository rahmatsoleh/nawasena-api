import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const uploadDocs = async (req, res, next) => {
  try {
    const file = req.file.path;
    const { id } = req.params.id;

    if (!file) {
      return res.status(400).json({
        error: true,
        message: "File doesn't exist",
        data: null,
      });
    }

    const provider = await prisma.providerDetail.update({
      where: {
        id: id,
      },
      data: {
        joinRequestFileUrl: req.file.filename,
      },
    });

    console.log(provider);

    if (!provider)
      return res.status(400).json({
        error: true,
        message: "Update documents failed",
        data: null,
      });

    console.log(file);

    return res.status(400).json({
      error: true,
      message: "Update documents failed",
      data: file,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const findProviderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await prisma.providerDetail.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });

    if (!response)
      return res.status(404).json({
        error: true,
        message: "Provider not found",
        data: null,
      });

    return res.status(200).json({
      error: false,
      message: "Provider retrieved",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
