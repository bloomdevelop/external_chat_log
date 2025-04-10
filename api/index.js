import express from "express";
import minify from "express-minify";
import compression from "compression";
import { limiter, helmet, csp } from "./middleware/security.js";
import { errorHandler } from "./middleware/error.js";
import messageRoutes from "./routes/messages.js";
import pageRoutes from "./routes/pages.js";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(compression());
app.use(minify());
app.use(limiter);
app.use(helmet());
app.use(csp);
app.use("/public", express.static(join(__dirname, "public")));

// Routes
app.use("/", pageRoutes);
app.use("/messages", messageRoutes); // Now /getMessages becomes /messages, /sendMessage becomes /messages with POST

// Error handling
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Visit http://localhost:3000 to see the app");
});

export default app;
