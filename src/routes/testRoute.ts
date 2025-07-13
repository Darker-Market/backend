import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.DARKER_API;
    const externalUrl = `https://api.darkerdb.com/v1/market?key=${apiKey}&condense=true&limit=5`;

    const response = await axios.get(externalUrl);

    console.log(response.data);

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

export default router as Router;
