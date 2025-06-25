import express from "express";
import QRCode from "qrcode";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Enable CORS for specific origin
app.use(cors({
  origin: "https://qr-generator-zh77.onrender.com",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));


app.use(express.static("public"));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/generateQR", (req, res) => {
  const data = req.body;

  let content = `🧑 Personal Info:\n`;
  content += `Name: ${data.Name}\n`;
  content += `Email: ${data.Email}\n`;
  content += `Phone: ${data.Phone}\n`;
  content += `DOB: ${data.DOB}\n`;
  content += `Blood Type: ${data.Blood}\n`;

  content += `\n👤 Professional Info:\n`;
  content += `Job Title: ${data.JobTitle}\n`;
  content += `Company: ${data.Company}\n`;
  content += `CV: ${data.CV}\n`;
  content += `Website: ${data.Website}\n`;

  content += `\n🌐 Social Media:\n`;
  content += `LinkedIn: ${data.LinkedIn}\n`;
  content += `Instagram: ${data.Instagram}\n`;
  content += `Twitter: ${data.Twitter}\n`;

  content += `\n🆘 Emergency Info:\n`;
  content += `Emergency Contact: ${data.EmergencyContact}\n`;
  content += `Allergies: ${data.Allergies}\n`;
  content += `Chronic Conditions: ${data.Conditions}\n`;

  content += `\n📍 Location & Notes:\n`;
  content += `Location: ${data.Location}\n`;
  content += `Note: ${data.Note}\n`;

  content += `\n📶 Wi-Fi Info:\n`;
  content += `SSID: ${data.SSID}\n`;
  content += `Password: ${data.Password}\n`;
  content += `Encryption: ${data.Encryption}\n`;

  // Generate QR code
  QRCode.toDataURL(content, (err, url) => {
    if (err) {
      console.error("QR generation failed:", err);
      return res.json({ error: "QR generation failed" });
    }

    res.json({ url });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 QR Server running at http://localhost:${PORT}`);
});
