const generateBtn = document.getElementById("submit");
const qrCodeImage = document.querySelector("#qr-code img");
const qrCodeContainer = document.getElementById("qr-code-container");
const form = document.querySelector("form");

generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value.trim() !== "" ? value.trim() : "N/A";
  }

  console.log("Sending data:", data);

  qrCodeImage.alt = "Generating QR Code...";
  qrCodeImage.src = "";
  qrCodeContainer.style.display = "block";

  try {
    const response = await fetch("http://localhost:3000/generateQR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.error) {
      alert("Failed to generate QR.");
      qrCodeContainer.style.display = "none";
      return;
    }

    qrCodeImage.src = result.url;
    qrCodeImage.alt = "Your QR Code";
  } catch (error) {
    console.error(error);
    alert("Server error.");
    qrCodeContainer.style.display = "none";
  }
});

const downloadBtn = document.getElementById("downloadQR");

downloadBtn.addEventListener("click", () => {
  const src = qrCodeImage.src;
  if (!src) return alert("QR Code not available.");

  const link = document.createElement("a");
  link.href = src;
  link.download = "qr_code.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
