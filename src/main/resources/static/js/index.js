const contenedorUsuarios = document.querySelector(".usuarios");
const formulario = document.getElementById("agregarUsuario");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#closeModal");
const bodyModal = document.querySelector(".bodyModal");
const busqueda = document.querySelector("#producto");

function actualizarLista(usuarios) {
  contenedorUsuarios.innerHTML = "";
  usuarios.map((usuario) => {
    contenedorUsuarios.innerHTML += `<div class="usuario">
    <h3>id : ${usuario.id} <br> </h3>
    nombre : ${usuario.nombre} <br> 
    tipo : ${usuario.tipo} <br> 
    categoria : tipo : ${usuario.categoria} <br>
    descripcion : tipo : ${usuario.descripcion} <br>
    precio : ${usuario.precio} <br>
    <div class="options">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="blue" class="bi bi-pencil-square edit" viewBox="0 0 16 16" title="Editar" onclick="CargarModal(${usuario.id})" >
        <title>Editar</title>
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="red" class="bi bi-trash-fill delete" viewBox="0 0 16 16" title="Eliminar" onclick="eliminar(${usuario.id})">
      <title>Eliminar</title>
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg>
    </div>
    </div>`;
  });
}
(async () => {
  const res = await fetch("http://localhost:8080/producto");
  const usuarios = await res.json();
  console.log(usuarios);
  actualizarLista(usuarios);
})();

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  formdata = new FormData(formulario);

  (async () => {
    const fd = {
      id: formdata.get("id"),
      categoria: formdata.get("categoria"),
      descripcion: formdata.get("descripcion"),
      nombre: formdata.get("nombre"),
      precio: formdata.get("precio"),
      tipo: formdata.get("tipo"),
    };
    console.log(fd);
    const res = await fetch("http://localhost:8080/producto", {
      method: "POST",
      body: JSON.stringify(fd),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const usuarios = await res.json();
    console.log(usuarios);
    actualizarLista(usuarios);
  })();
});

async function eliminar(id) {
  let res = await fetch("http://localhost:8080/producto");
  let usuarios = await res.json();
  const usuario = usuarios.filter((e) => {
    return e.id == id;
  });
  res = await fetch("http://localhost:8080/producto", {
    method: "DELETE",
    body: JSON.stringify(usuario[0]),
    headers: {
      "Content-Type": "application/json",
    },
  });
  usuarios = await res.json();
  actualizarLista(usuarios);
}

async function editar(id) {
  this.event.preventDefault();
  const formdata = new FormData(this.event.path[0]);
  const fd = {
    id: formdata.get("id"),
    categoria: formdata.get("categoria"),
    descripcion: formdata.get("descripcion"),
    nombre: formdata.get("nombre"),
    precio: formdata.get("precio"),
    tipo: formdata.get("tipo"),
  };
  const res = await fetch("http://localhost:8080/producto", {
    method: "PUT",
    body: JSON.stringify(fd),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const usuarios = await res.json();
  console.log(usuarios);

  actualizarLista(usuarios);
  modal.style.display = "none";
}

async function CargarModal(id) {
  let res = await fetch("http://localhost:8080/producto");
  let usuarios = await res.json();
  let usuario = usuarios.filter((e) => {
    return e.id == id;
  });
  usuario = usuario[0];
  bodyModal.innerHTML = `

  <form method="POST" onsubmit="editar(${usuario.id})">
  <p>id :  ${usuario.id}</p>
  <input type="number" hidden value="${usuario.id}" name="id" required />
  <p>nombre</p>  
  <input type="text" value="${usuario.nombre}" name="nombre" required/>
  <p>categoria</p>  
  <input type="text" value="${usuario.categoria}" name="categoria" required/>
  <p>descripcion</p>  
  <input type="text" value="${usuario.descripcion}" name="descripcion" required/>
  <p>Tipo</p>  
  <input type="text" value="${usuario.tipo}" name="tipo" required/>
  <p>precio</p>  
  <input type="number" value="${usuario.precio}" name="precio" required/>
  
  <input type="submit" value="actualizar" class="btn-submit">
</form>

  `;

  modal.style.display = "flex";
}
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

async function buscar() {
  let res = await fetch("http://localhost:8080/producto");
  let usuarios = await res.json();
  return usuarios;
}

async function getData() {
  let res = await fetch("http://localhost:8080/producto");
  let usuarios = await res.json();
  return usuarios;
}

busqueda.addEventListener("keyup", async() => {
  const palabra = busqueda.value;
  let data = await getData();

  const resultados = data.filter((d) => {

    if (d.nombre.includes(palabra) || d.id == palabra) {
      return d;
    }
  });

  actualizarLista(resultados);
});
