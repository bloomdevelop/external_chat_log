import { Router } from "express";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || "",
);

// Cache configuration
const CACHE_DURATION = 60 * 1000; // 1 minute
const messageCache = {
  data: null,
  lastFetched: 0,
};

router.get("/", async (_req, res) => {
  const now = Date.now();

  if (messageCache.data && now - messageCache.lastFetched < CACHE_DURATION) {
    return res.status(200).json({ message: messageCache.data });
  }

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Error fetching messages" });
  }

  messageCache.data = messages;
  messageCache.lastFetched = now;

  res.status(200).json({ message: messages });
});

router.post("/", async (req, res) => {
  const { username, content, experience_id } = req.body;

  if (!username || !content || !experience_id) {
    return res.status(400).json({
      error:
        "Missing required fields: username, content, and experience_id are required",
    });
  }

  const { error } = await supabase.from("messages").insert({
    username,
    content,
    experience_id,
  });

  if (error) {
    console.error("Error inserting message:", error);
    return res.status(500).json({ error: "Error inserting message" });
  }

  // Clear cache when new message is added
  messageCache.data = null;
  messageCache.lastFetched = 0;

  res.status(200).json({ message: "Message sent successfully" });
});

export default router;
