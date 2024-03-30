import express from "express";
import QRCode from "qrcode";

const app = express();
app.use(express.json());

// enable static files
app.use(express.static("public"));

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
    QRCode.toFile("./qr-code.jpg", final_response, (err) => {
      if (err) {
        return res.json({ err });
      }
      return res.json({ message: "QR code created successfully!" });
    });
  } catch (error) {
    return res.json({ error });
  }
});

const port = 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
