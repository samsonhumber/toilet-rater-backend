import express, { Router } from "express";
import { getReviewsFromToiletName, getReviewsFromUserName } from "../models/";

const recipesRouter = express.Router();

recipesRouter.get("/toiletreviews/", async function (req, res) {
  const toiletName = String(req.query.toilet);
  const gridRef = String(req.query.gridref);
  const result = await getReviewsFromToiletName(toiletName, gridRef);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

recipesRouter.get("/userreviews/", async function (req, res) {
  const userName = String(req.query.username);
  const result = await getReviewsFromUserName(userName);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});