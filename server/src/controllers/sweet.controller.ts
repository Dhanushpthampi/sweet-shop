import { Request, Response } from "express";
import Sweet from "../models/Sweet";

/**
 * ADMIN: Create a new sweet
 * POST /api/sweets
 */
export const createSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity, imageUrl} = req.body;

    // basic validation
    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      imageUrl,
    });

    return res.status(201).json(sweet);
  } catch (error: any) {
    if (error.code === 11000) {
    return res.status(400).json({
      message: "Sweet with this name already exists",
    });
  }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * AUTHENTICATED: Get all sweets
 * GET /api/sweets
 */
export const getSweets = async (_req: Request, res: Response) => {
  try {
    const sweets = await Sweet.find();
    return res.status(200).json(sweets);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
