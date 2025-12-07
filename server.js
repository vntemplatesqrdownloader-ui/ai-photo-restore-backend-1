import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

import { replicateEnhance, replicateRestore, replicateUpscale } from "./utils/replicate.js";
import { removeBackground } from "./utils/rembg.js";
import { removeBg_API } from "./utils/removebg-api.js";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/static", express.static(path.join(__dirname, "static")));

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.json({ status:"running", message:"Node.js Backend Live 🚀" });
});

app.post("/enhance", upload.single("file"), async (req, res) => {
  try { res.json({ url:"/static/"+await replicateEnhance(req.file.path) }); }
  catch(e){ res.status(500).json({error:"Enhance failed"}) }
});

app.post("/restore-old", upload.single("file"), async (req, res) => {
  try { res.json({ url:"/static/"+await replicateRestore(req.file.path) }); }
  catch(e){ res.status(500).json({error:"Restore failed"}) }
});

app.post("/remove-bg", upload.single("file"), async (req, res) => {
  try { res.json({ url:"/static/"+await removeBackground(req.file.path) }); }
  catch(e){ res.status(500).json({error:"BG Remove failed"}) }
});

app.post("/remove-bg-pro", upload.single("file"), async (req, res) => {
  try { res.json({ url:"/static/"+await removeBg_API(req.file.path) }); }
  catch(e){ res.status(500).json({error:"Remove.bg API failed"}) }
});

app.post("/upscale", upload.single("file"), async (req, res) => {
  try { res.json({ url:"/static/"+await replicateUpscale(req.file.path) }); }
  catch(e){ res.status(500).json({error:"Upscale failed"}) }
});

app.listen(process.env.PORT||8000,()=>console.log("🚀 Server running"));
