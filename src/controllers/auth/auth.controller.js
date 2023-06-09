import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const prisma = new PrismaClient();

export const register = async (req, res, next) => {
  try {
    const { email, phoneNumber, password, role } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const findEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findEmail)
      return res.status(500).json({
        error: false,
        message: "Email already exist",
        data: [],
      });

    const findPhoneNumber = await prisma.user.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (findPhoneNumber)
      return res.status(500).json({
        error: false,
        message: "Phone number already exist",
        data: [],
      });

    if (role === "admin") {
      const data = {
        ...req.body,
        role: "admin",
        password: hashPassword,
      };

      const response = await prisma.user.create({
        data: data,
      });

      if (!response)
        return res.status(400).json({
          error: true,
          message: "Register failed",
          data: [],
        });

      return res.status(201).json({
        error: false,
        message: "Register success",
        data: response,
      });
    } else if (role === "provider") {
      const data = {
        ...req.body,
        role: "provider",
        password: hashPassword,
      };

      const transaction = await prisma.$transaction(async (tx) => {
        const registerProvider = await tx.user.create({
          data: data,
        });

        if (!registerProvider) throw new Error("Registration provider failed");

        const { id } = registerProvider;

        const joinDetailProvider = await tx.providerDetail.create({
          data: {
            userId: id,
          },
        });

        if (!joinDetailProvider) throw new Error("Join detail provider failed");

        return {
          registerProvider,
          joinDetailProvider,
        };
      });

      if (!transaction)
        return res.status(400).json({
          error: true,
          message: "Transaction join failed",
          data: null,
        });

      return res.status(201).json({
        error: false,
        message: "Register success",
        data: transaction,
      });
    }

    const data = {
      ...req.body,
      password: hashPassword,
    };

    const response = await prisma.user.create({
      data: data,
    });

    if (!response)
      return res.status(400).json({
        error: true,
        message: "Register failed",
        data: [],
      });

    return res.status(201).json({
      error: false,
      message: "Register success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findCredentials = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (findCredentials) {
      const match = await bcrypt.compare(password, findCredentials.password);

      if (!match)
        return res.status(400).json({
          error: true,
          message: "Password salah",
          data: [],
        });

      const { id, email } = findCredentials;

      const accessToken = jwt.sign({ id, email }, process.env.SECRET_TOKEN, {
        expiresIn: "1d",
      });

      const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      return res.status(200).json({
        error: false,
        message: "Login success",
        data: {
          accessToken,
          expiredAt,
        },
      });
    }

    return res.status(404).json({
      error: true,
      message: "Login failed",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    const { email } = req;
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!response)
      return res.status(404).json({
        error: true,
        message: "User not found",
        data: null,
      });

    return res.status(200).json({
      error: false,
      message: "User retrieved",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
