import { Router } from "express";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get("/", (_req, res) => {
  res.sendFile("index.html", {
    root: join(__dirname, "../pages/"),
  });
});

router.get("/privacy-policy", (_req, res) => {
  res.sendFile("privacy-policy.html", {
    root: join(__dirname, "../pages/"),
  });
});

export default router;
