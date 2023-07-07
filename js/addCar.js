let newCarBtn = document.querySelector("#new-car-btn");
newCarBtn.setAttribute("data-bs-toggle", "modal");
newCarBtn.setAttribute("data-bs-target", "#new-car-modal");

async function addCar() {
  let cadastrarBtn = document.querySelector("#cadastrar-btn");
  cadastrarBtn.addEventListener("click", async () => {
    let placaInput = document.querySelector("#placa-input").value;
    let anoInput = document.querySelector("#ano-input").value;
    let modeloInput = document.querySelector("#modelo-input").value;
    let fabricanteInput = document.querySelector("#fabricante-input").value;
    let data = {
      placa: placaInput,
      ano: anoInput,
      modelo: modeloInput,
      fabricante: fabricanteInput,
    };
    let req = await fetch("https://api-veiculos.onrender.com/veiculos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    let resp = await req.json();
    location.reload();
  });
}
