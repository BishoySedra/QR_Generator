const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const CVField = document.getElementById("cv");
const generateBtn = document.getElementById("submit");
const qrCodeImage = document.getElementsByTagName("img")[0];
const qrCodeContainer = document.getElementById("qr-code-container");

generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = {
    name: nameField.value,
    email: emailField.value,
    phone: phoneField.value,
    cv: CVField.value,
  };

  const response = await fetch("/generateQR", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.error) {
    return alert("An error occurred while generating the QR code");
  }

  console.log(result.url);
  console.log(qrCodeImage);
  qrCodeImage.src = result.url;
  qrCodeContainer.style.display = "block";
});
