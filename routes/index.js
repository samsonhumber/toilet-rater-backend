import express, { Router } from "express";
import { getReviewsFromToiletName } from "../models/getIngredients.js";

const recipesRouter = express.Router();

recipesRouter.get("/reviews/:id", async function (req, res) {
  const toiletName = String(req.params.id);
  const result = await getReviewsFromToiletName(toiletName);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});