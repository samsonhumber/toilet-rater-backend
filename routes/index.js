import express, { Router } from "express";
import { getReviewsFromToiletName, getReviewsFromUserName } from "../models/getReviews.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/toiletreviews", async function (req, res) {
  const toiletName = String(req.query.toilet);
  const gridRef = String(req.query.gridref);
  const result = await getReviewsFromToiletName(toiletName, gridRef);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

reviewsRouter.get("/userreviews", async function (req, res) {
  const userName = String(req.query.username);
  const result = await getReviewsFromUserName(userName);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

export { reviewsRouter };