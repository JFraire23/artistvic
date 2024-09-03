//Array Principal

const platillos = [
	//OFERTAS
	//LO MAS VENDIDO

	{
		id: "Alegres Del Tamborazo",
		titulo: "Alegres Del Tamborazo", /*este titulo se va a ver en el dom*/
		numerotelefono:"Numero de telefono: 676-104-85-06.",
		facebook:"Facebook: Alegres del Tamborazo",
		plataformasmusicales:"Plataformas Musicales: Spotify, YouTube (Alegres del Tamborazo)",
		genero:"Genero: Banda",
		link:"#",
		series: "3",
		repeticiones: "12-16",
		titulo3: "cerveza",
		titulo4: "seis",
		titulo5: "",
		imagen: "./ejercicios/alegres-portada.jpeg", /*ruta de la imagen*/
		contenido: "Six de Modelo especial lata 330ml",
		categoria: {
			nombre: "BANDA",
			id: "banda"	
		},
		precio: 85
	},

	

	
];	


const contenedorImagenes = document.querySelector("#contenedor-imagenes");//imagenes=platillos
const botonesCategorias = document.querySelectorAll(".boton-clases");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".boton-agregar");
const numerito = document.querySelector("#numerito");
//let barraBusqueda = document.querySelector("#buscador");

function cargarPlatillos(platillosElegidos) {

	contenedorImagenes.innerHTML = "";

	platillosElegidos.forEach(platillo => {
		const div = document.createElement("div");
		div.classList.add("platillo");
		div.innerHTML = `


			<div class="producto">
				<div class="nombre">
						${platillo.titulo}
				</div>
				<div class="producto-detalles">
					<div class="imagen">
						<img src="${platillo.imagen}">
					</div>
					<div class="descripcion">
						<ul>
							<li>
								${platillo.numerotelefono}
							</li>
							<li>
								${platillo.facebook}
							</li>

							<li>
								${platillo.plataformasmusicales}
							</li>


							<li>
								${platillo.genero}
							</li>

						</ul>
					</div>
					
				</div>
				<div class="agregar-carrito">
						<a href="${platillo.link}" target="BLANK"
						<button class="boton-agregar">Visitar Grupo</button>
						</a>
				</div>
				
			
				
		`;
		contenedorImagenes.append(div);



	})

	actualizarBotonesAgregar();

} 

/*function buscarArticulos() {
	buscador.addEventListener("input", e => {
		const inputText = e.target.value.toLowerCase().trim();
		console.log(inputText);
		
		const mostrarFiltrado = platillos.filter(platillo => 
			platillo.titulo.toLowerCase().startsWith(inputText)||
			platillo.cocina.toLowerCase().startsWith(inputText)||
			platillo.contenido.toLowerCase().startsWith(inputText)||
			platillo.titulo1.toLowerCase().startsWith(inputText)||
			platillo.titulo2.toLowerCase().startsWith(inputText)||
			platillo.titulo3.toLowerCase().startsWith(inputText)||
			platillo.titulo4.toLowerCase().startsWith(inputText)||
			platillo.titulo5.toLowerCase().startsWith(inputText)||
			platillo.precio.toString().startsWith(inputText)
			)
			;

		
		cargarPlatillos(mostrarFiltrado)
	})

}*/

cargarPlatillos(platillos);
//buscarArticulos();

botonesCategorias.forEach(boton => {
	boton.addEventListener("click", (e) => {

		botonesCategorias.forEach(boton => {
			boton.classList.remove("active")
		})
		e.currentTarget.classList.add("active");

		if (e.currentTarget.id !=  "todos") {
			const platilloCategoria = platillos.find(platillo => platillo.categoria.id === e.currentTarget.id);

			tituloPrincipal.innerText = platilloCategoria.categoria.nombre;
			const platillosBoton = platillos.filter(platillo => platillo.categoria.id === e.currentTarget.id);


		cargarPlatillos(platillosBoton);
		} else {
			tituloPrincipal.innerText = "Todos Los Grupos Musicales";
			cargarPlatillos(platillos);
		}
	})
});

function actualizarBotonesAgregar(){
	botonesAgregar = document.querySelectorAll(".boton-agregar");

	botonesAgregar.forEach(boton => {
		boton.addEventListener("click", agregarAlCarrito);
	});
}

let productosEnCarritoMoloch;
const productosEnCarritoMolochLS = JSON.parse(localStorage.getItem("platillos-moloch"));
if (productosEnCarritoMolochLS) {
	productosEnCarritoMoloch = productosEnCarritoMolochLS;
	actualizarNumerito();
}
else{
	productosEnCarritoMoloch = [];
}
 

function agregarAlCarrito(e) {
	Toastify({
  		text: "Ejercicio agregado a tu Rutina",
  		duration: 2000,
  		close: true,
  		gravity: "top", // `top` or `bottom`
  		position: "right", // `left`, `center` or `right`
  		stopOnFocus: true, // Prevents dismissing of toast on hover
  		style: {
    		background: "linear-gradient(to right, #00ff00, #ffffff)",
    		color: "#000000",
    		borderRadius: "2rem",
    		fontSize: '1rem',
  		},
  		onClick: function(){} // Callback after click
		}).showToast();

	const idBoton = e.currentTarget.id;
	const platilloAgregado = platillos.find(platillo => platillo.id === idBoton);

	if (productosEnCarritoMoloch.some(platillo => platillo.id === idBoton)) {
		const index = productosEnCarritoMoloch.findIndex(platillo => platillo.id === idBoton);
		productosEnCarritoMoloch[index].cantidad++;

	}
	else{
		platilloAgregado.cantidad = 1;
		productosEnCarritoMoloch.push(platilloAgregado);	
	}

	actualizarNumerito();

		localStorage.setItem("platillos-moloch", JSON.stringify(productosEnCarritoMoloch));

}

function actualizarNumerito(){
	let nuevoNumerito = productosEnCarritoMoloch.reduce((acc, platillo)=> acc + platillo.cantidad, 0);
	numerito.innerText = nuevoNumerito;
}

window.onload = actualizarPagina();

        function actualizarPagina() {
            let actualizar = false;
            momentoActual = new Date();
            hora = momentoActual.getHours();
            minuto = momentoActual.getMinutes();
            segundo = momentoActual.getSeconds();

            str_segundo = new String (segundo);
            if (str_segundo.length == 1) {
                segundo = "0" + segundo;
            }
            str_minuto = new String (minuto);
            if (str_minuto.length == 1){
                minuto = "0" + minuto;
            }
            str_hora = new String (hora);
            if (str_hora.length == 1){
                hora = "0" + hora;
            }
            horaImprimible = hora + ":" + minuto + ":" + segundo;
            if(horaImprimible == "12:49:00") {
                actualizar = true;
            }
            setTimeout("actualizarPagina()",1000);
            if(actualizar == true) {//Comprueba que la hora es igual a la que quieres y actualiza
                location.reload();
            }
        }




