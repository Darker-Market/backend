import { Router, Request, Response } from "express";
import axios from "axios";
import { Item } from "../types/items";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.DARKER_API;
    // condense=true&
    const baseUrl = "https://api.darkerdb.com/v1";

    const marketUrl = `${baseUrl}/market?key=${apiKey}&limit=5`;

    const marketResponse = await axios.get(marketUrl);
    const allItems: Item[] = marketResponse.data.body;

    const detailedMarketItem = await Promise.all(
      allItems.map(async (item) => {
        try {
          const itemDetailRes = await axios.get(
            `${baseUrl}/items/${item.item_id}?key=${apiKey}`
          );
          const details = itemDetailRes.data;

          // console.log(details);

          return {
            ...item,
            iconUrl: `${baseUrl}/items/${item.item_id}/icon`,
            description: details.body.description,
            // type, armor_type, hand_type, misc_type, slot_type, utility_type, required_class, effect?
          };
        } catch (err) {
          console.error(`Failed to fetch item ${item.item_id}`, err);
          return {
            ...item,
            iconUrl: `${baseUrl}/items/${item.item_id}/icon`,
            description: null,
            stats: null,
            type: null,
          };
        }
      })
    );

    console.log(detailedMarketItem);

    res.json({
      ...marketResponse.data,
      body: detailedMarketItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

export default router as Router;
