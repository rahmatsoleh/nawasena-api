import { PrismaClient } from "@prisma/client";
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

export const createCategory = async (req, res, next) => {
  try {
    const response = await prisma.categoryProduct.create({
      data: req.body
    });

    if (!response) return res.status(400).json({
      error: true,
      message: "Failed created category product",
      data: null
    })

    return res.status(201).json({
      error: false,
      message: "Success created category product",
      data: response
    })
  } catch (error) {

  }
}
