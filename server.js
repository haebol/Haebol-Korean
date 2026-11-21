import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT) || 3e3;
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});
const distPath = path.resolve(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Production server running on http://0.0.0.0:${PORT}`);
});
