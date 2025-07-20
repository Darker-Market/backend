import { Router, Request, Response } from "express";
import axios from "axios";
import { Item } from "../types/items";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.DARKER_API;
    // condense=true&
    const baseUrl = "https://api.darkerdb.com/v1";

    const externalUrl = `${baseUrl}/market?key=${apiKey}&limit=5`;

    const marketResponse = await axios.get(externalUrl);
    const allItems: Item[] = marketResponse.data.body;

    const itemsWithIcons = allItems.map((item) => ({
      ...item,
      iconUrl: `${baseUrl}/items/${item.item_id}/icon`,
    }));

    console.log(itemsWithIcons);

    res.json({
      ...marketResponse.data,
      body: itemsWithIcons,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

export default router as Router;
