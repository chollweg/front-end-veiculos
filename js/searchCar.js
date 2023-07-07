let searchBtn = document.querySelector("#search-btn");
searchBtn.setAttribute("data-bs-toggle", "modal");
searchBtn.setAttribute("data-bs-target", "#searchModal");

let searchModalContent = document.querySelector("#search-modal-content");

let license = document.querySelector("#seeked-car-license-plate");
let year = document.querySelector("#seeked-car-year");
let model = document.querySelector("#seeked-car-model");
let distribuitor = document.querySelector("#seeked-car-distribuitor");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let searchInput = document.querySelector("#procurar-input");
  try {
    let req = await fetch(
      `https://api-veiculos.onrender.com/veiculos/${searchInput.value}`
    );
    let resp = await req.json();
    license.innerText = resp.placa;
    year.innerText = resp.ano;
    model.innerText = resp.modelo;
    distribuitor.innerText = resp.fabricante;
  } catch (error) {
    license.innerText = "O veículo buscado não foi encontrado";
    year.innerText = "";
    model.innerText = "";
    distribuitor.innerText = "";
  }
});
