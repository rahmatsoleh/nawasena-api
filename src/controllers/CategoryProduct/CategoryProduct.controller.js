const prisma = new PrismaClient();

export const getAll = async (req, res, next) => {
  try {
    const response = await prisma.categoryProduct.findMany();

    if (!response)
      return res.status(400).json({
        error: true,
        message: "Get data failed",
        data: [],
      });

    return res.status(200).json({
      error: false,
      message: "Get data success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
