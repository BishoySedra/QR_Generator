const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const CVField = document.getElementById("cv");
const generateBtn = document.getElementById("submit");

generateBtn.addEventListener("click", () => {
  const data = {
    name: nameField.value,
    email: emailField.value,
    phone: phoneField.value,
    cv: CVField.value,
  };
});
