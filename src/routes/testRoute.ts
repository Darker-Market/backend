import { Router, Request, Response } from "express";
import axios from "axios";
import { Item } from "../types/items";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.DARKER_API;
    const externalUrl = `https://api.darkerdb.com/v1/market?key=${apiKey}&condense=true&limit=5`;

    const response = await axios.get(externalUrl);

    const allItems: Item[] = response.data.body;
    const itemsWithIcons = allItems.map((item) => ({
      ...item,
      iconUrl: `https://api.darkerdb.com/v1/items/${item.item_id}/icon`,
    }));

    console.log(itemsWithIcons);

    res.json({
      ...response.data,
      body: itemsWithIcons,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

export default router as Router;
