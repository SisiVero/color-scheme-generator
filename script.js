const container = document.getElementById("container");

function generateColors() {
  let color = document.getElementById("colors").value.substr(-6);
  let colorType = document.getElementById("color-type").value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorType}&count=5`)
    .then(response => response.json())
    .then(data => {
      container.innerHTML = '';

      for (const color of data.colors) {
        const colorContainer = document.createElement("div");
        colorContainer.classList.add("color-cont");
        const colorImage = document.createElement("img");
        colorImage.classList.add("color-img");
        colorImage.src = color.image.bare;
        const colorCode = document.createElement("p");
        colorCode.classList.add("color-hex");
        colorCode.textContent = color.hex.value;

        // Add click event listener to the color code
        colorCode.addEventListener("click", () => copyToClipboard(color.hex.value));

        colorContainer.appendChild(colorImage);
        colorContainer.appendChild(colorCode);
        container.appendChild(colorContainer);
      }
    });
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  alert("Color code copied!");
}

document.getElementById("color-btn").addEventListener("click", generateColors);