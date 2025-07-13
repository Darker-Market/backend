import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.json("test !!!!!!!!!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch " });
  }
});

export default router as Router;
