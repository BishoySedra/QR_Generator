const generateBtn = document.getElementById("submit");
const qrCodeImage = document.getElementsByTagName("img")[0];
const qrCodeContainer = document.getElementById("qr-code-container");
const dataForm = document.getElementsByTagName("form");

generateBtn.addEventListener("click", async (e) => {
  // prevent the default form submission
  e.preventDefault();

  // iterate over the form input fields and store the values in an object
  let data = {};
  for (let i = 0; i < dataForm[0].length; i++) {
    if (dataForm[0][i].id === "submit") {
      continue;
    }

    console.log(dataForm[0][i].id, dataForm[0][i].value);

    if (
      dataForm[0][i].value === "" ||
      dataForm[0][i].value === null ||
      dataForm[0][i].value === undefined
    ) {
      data[dataForm[0][i].id] = "N/A";
      continue;
    }

    data[dataForm[0][i].id] = dataForm[0][i].value;
  }

  console.log(data);

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
