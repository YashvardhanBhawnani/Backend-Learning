import { nanoid } from "nanoid";
import { Url } from "../models/urlModel.js";

export const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = nanoid(8);
  await Url.create({
    shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
};

export const handleRedirectShortUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timeStamp: Date.now(),
          },
        },
      },
    );
    if (!entry) return res.status(404).json({ error: "Short URL not found" });
    return res.redirect(entry.redirectUrl);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
