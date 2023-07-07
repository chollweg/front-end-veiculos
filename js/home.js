const api = "https://api-veiculos.onrender.com";
let tableBody = document.querySelector("#table-body");

async function fetchApi() {
  let req = await fetch(api + "/veiculos");
  let resp = await req.json();
  return resp;
}

async function tableConstruction() {
  let veiculos = await fetchApi();
  veiculos.forEach((element) => {
    let veiculo = document.createElement("tr");
    veiculo.innerHTML = `<th scope="row">${element.placa}</th>
    <td>${element.ano}</td>
    <td>${element.modelo}</td>
    <td>${element.fabricante}</td> 
    `;

    let editBtn = document.createElement("button");
    editBtn.innerText = "Editar";
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-info");
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#editModal");

    //MODAL DO EDIT
    editBtn.addEventListener("click", () => {
      let editModalContent = document.querySelector("#edit-modal-content");
      editModalContent.innerHTML = `
      <label for="placa-input">Placa</label>
          <input type="text" id="placa-input" value=${element.placa}>
          <label for="ano-input">Ano</label>
          <input type="text" id="ano-input" value=${element.ano}>
          <label for="modelo-input">Modelo</label>
          <input type="text" id="modelo-input" value=${element.modelo}>
          <label for="fabricante-input">Fabricante</label>
          <input type="text" id="fabricante-input" value=${element.fabricante}>
      `;
      let saveBtn = document.querySelector("#save-btn");
      let placaInput = document.querySelector("#placa-input");
      let anoInput = document.querySelector("#ano-input");
      let modeloInput = document.querySelector("#modelo-input");
      let fabricanteInput = document.querySelector("#fabricante-input");
      saveBtn.addEventListener("click", async () => {
        let data = {
          placa: placaInput.value,
          ano: anoInput.value,
          modelo: modeloInput.value,
          fabricante: fabricanteInput.value,
        };
        await fetch(api + `/veiculos/${element.placa}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        location.reload();
      });
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Deletar";
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.setAttribute("data-bs-toggle", "modal");
    deleteBtn.setAttribute("data-bs-target", "#exampleModal");

    //MODAL DO DELETE
    deleteBtn.addEventListener("click", () => {
      let modalContent = document.querySelector("#modal-content");
      modalContent.innerHTML = `Modelo: ${element.modelo} / Placa: ${element.placa}`;
      let deleteBtn = document.querySelector("#delete-btn");
      deleteBtn.addEventListener("click", async () => {
        await deleteVehicle(element._id);
        location.reload();
      });
    });
    let buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.gap = "5px";
    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(deleteBtn);
    veiculo.appendChild(buttonsContainer);
    tableBody.appendChild(veiculo);
    // tableBody.appendChild(deleteBtn);
  });
}

tableConstruction();

async function deleteVehicle(id) {
  let req = await fetch(api + `/veiculos/${id}`, {
    method: "DELETE",
  });
  let res = req.json();
  console.log(res);
}

async function editVehicle(object) {
  let req = await fetch(api + "/veiculos", {
    method: "PUT",
    body: JSON.stringify(),
  });
}
