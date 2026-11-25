document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("custom-contact-form");
  if (!form) return;

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");

  const rating1Input = document.getElementById("rating1");
  const rating2Input = document.getElementById("rating2");
  const rating3Input = document.getElementById("rating3");

  const rating1Badge = document.getElementById("rating1-value");
  const rating2Badge = document.getElementById("rating2-value");
  const rating3Badge = document.getElementById("rating3-value");

  const submitBtn = document.getElementById("submit-btn");
  const resultBox = document.getElementById("form-result");

  const requiredInputs = [
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneInput,
    addressInput
  ];

  // Atnaujina slankiklių reikšmių indikacijas
  [
    [rating1Input, rating1Badge],
    [rating2Input, rating2Badge],
    [rating3Input, rating3Badge]
  ].forEach(([slider, badge]) => {
    badge.textContent = slider.value;
    slider.addEventListener("input", () => {
      badge.textContent = slider.value;
    });
  });

  // Tikrina, ar užpildyti visi privalomi laukai
  function updateSubmitButtonState() {
    const allFilled = requiredInputs.every((input) => input.value.trim() !== "");
    submitBtn.disabled = !allFilled;
  }

  requiredInputs.forEach((input) => {
    input.addEventListener("input", updateSubmitButtonState);
  });

  updateSubmitButtonState();

  // Saugus teksto išvedimas į HTML
  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  function escapeAttr(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (submitBtn.disabled) {
      return;
    }

    const r1 = Number(rating1Input.value);
    const r2 = Number(rating2Input.value);
    const r3 = Number(rating3Input.value);
    const average = Number(((r1 + r2 + r3) / 3).toFixed(1));

    const formDataObject = {
      vardas: firstNameInput.value.trim(),
      pavarde: lastNameInput.value.trim(),
      elPastas: emailInput.value.trim(),
      telefonoNumeris: phoneInput.value.trim(),
      adresas: addressInput.value.trim(),
      ivertinimas1: r1,
      ivertinimas2: r2,
      ivertinimas3: r3,
      vidurkis: average
    };

    console.log("Formos duomenų objektas:", formDataObject);

    const safeVardas = escapeHtml(formDataObject.vardas);
    const safePavarde = escapeHtml(formDataObject.pavarde);
    const safeEmailText = escapeHtml(formDataObject.elPastas);
    const safeEmailHref = escapeAttr(formDataObject.elPastas);
    const safePhone = escapeHtml(formDataObject.telefonoNumeris);
    const safeAddress = escapeHtml(formDataObject.adresas);

    resultBox.innerHTML = `
      <div class="form-result-list">
        <div>Vardas: ${safeVardas}</div>
        <div>Pavardė: ${safePavarde}</div>
        <div>El. paštas: <a href="mailto:${safeEmailHref}">${safeEmailText}</a></div>
        <div>Tel. Numeris: ${safePhone}</div>
        <div>Adresas: ${safeAddress}</div>
        <div>1 klausimo įvertinimas: ${formDataObject.ivertinimas1}/10</div>
        <div>2 klausimo įvertinimas: ${formDataObject.ivertinimas2}/10</div>
        <div>3 klausimo įvertinimas: ${formDataObject.ivertinimas3}/10</div>
      </div>
      <div class="form-average-line">
        ${safeVardas} ${safePavarde}: ${formDataObject.vidurkis}
      </div>
    `;

    resultBox.classList.add("is-visible");
  });
});