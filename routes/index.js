import express, { Router } from "express";
import { getReviewsFromToiletName, getReviewsFromUserName } from "../models/getReviews.js";
import { postToiletReview } from "../models/postReviews.js";
import { updateToiletReview } from "../models/updateReviews.js";
import { deleteUniqueReview } from "../models/deleteReviews.js";

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

reviewsRouter.post("/review", async function (req, res) {
  const newReview = req.body;
  const result = await postToiletReview(newReview);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

reviewsRouter.put("/review", async function (req, res) {
  // Note that if the ratings is used here, then all ratings categories are required to be sent, so that information is not lost
  // For efficiency, a future improvement is to incorporate the new ratings into the old ones rather than replacing
  const newReviewData = req.body;
  const result = await updateToiletReview(newReviewData);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

reviewsRouter.delete("/review", async function (req, res) {
  // Consider changing the path argument if delete routes to delete more than 1 review are made
  const uniqueReviewKey = req.body;
  const result = await deleteUniqueReview(uniqueReviewKey);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});


export { reviewsRouter };