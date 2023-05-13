import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import "dotenv/config";

const prisma = new PrismaClient();

export const register = async (req, res, next) => {
  try {
    const { email, phoneNumber, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    const data = {
      ...req.body,
      password: hashPassword,
    }

    const findEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (findEmail) return res.status(500).json({
      error: false,
      message: "Email already exist",
      data: []
    })

    const findPhoneNumber = await prisma.user.findUnique({
      where: {
        phoneNumber: phoneNumber
      }
    });

    if (findPhoneNumber) return res.status(500).json({
      error: false,
      message: "Phone number already exist",
      data: []
    })

    const response = await prisma.user.create({
      data: data
    })

    if (!response) return res.status(400).json({
      error: true,
      message: "Register failed",
      data: []
    })

    return res.status(201).json({
      error: false,
      message: "Register success",
      data: response
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, phoneNumber, password } = req.body;

    const findCredentials = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email
          },
          {
            phoneNumber: phoneNumber
          }
        ]
      }
    });

    if (findCredentials) {
      const match = bcrypt.compare(password, findCredentials?.password)

      if (!match) return res.send(400).json({
        error: true,
        message: "Password salah",
        data: []
      })

      const { id, email } = findCredentials;

      const accessToken = jwt.sign({ id, email }, process.env.SECRET_TOKEN, {
        expiresIn: '1d'
      })

      return res.status(200).json({
        error: false,
        message: "Login success",
        data: {
          accessToken
        }
      })
    }

    return res.status(404).json({
      error: true,
      message: "Login failed",
      data: []
    })
  } catch (error) {
    next(error)
  }
}