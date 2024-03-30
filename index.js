import express from "express";
import QRCode from "qrcode";
import cors from "cors";

const app = express();
app.use(express.json());

// enable static files
app.use(express.static("public"));

// enable cors
app.use(cors());

app.get("/", (req, res) => {
  res.render(__dirname + "/index.html");
});

app.post("/generateQR", (req, res) => {
  // iterate over the request body
  let final_response = "";
  for (const key in req.body) {
    final_response += `${key}: ${req.body[key]}\n`;
  }

  // generate qr
  try {
    QRCode.toDataURL(final_response, (err, url) => {
      if (err) {
        return res.json({
          error: "An error occurred while generating the QR code",
        });
      }

      return res.json({ url });
    });
  } catch (error) {
    return res.json({ error });
  }
});

const port = 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
