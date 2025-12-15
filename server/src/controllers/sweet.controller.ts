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



export const updateSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    return res.status(200).json(sweet);
  } catch (error) {
    console.error(error); // keep for now
    return res.status(400).json({ message: "Invalid update data" });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    return res
      .status(200)
      .json({ message: "Sweet deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid sweet id" });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter: any = {};

    // If searching by text (name or category), use OR logic to search both fields
    if (name || category) {
      const searchTerm = (name || category) as string;
      filter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } }
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    return res.status(200).json(sweets);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Sweet out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    return res.status(200).json(sweet);
  } catch (error) {
    return res.status(400).json({ message: "Invalid sweet id" });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid restock quantity" });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += quantity;
    await sweet.save();

    return res.status(200).json(sweet);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
