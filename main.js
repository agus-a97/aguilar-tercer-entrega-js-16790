//--Entidad
class Producto{
    constructor(nombre,precio,id){
        this.nombre=nombre;
        this.precio=precio;
        this.id=id;
    }
}
//--Constantes
//--Array

let productos=[];

//--Selectores
//Creamos los selectores con JQuery

$("#boton").click(guardarProductos)

$("#dark-mode").click(cambiarTema)

$("#vaciarLista").click(vaciarLista)
//--Funciones
    
$(()=>{
    $("p").on("mouseover",function () {
        $(this).css("background-color","yellow");
    })

    $("p").on("mouseleave", function () {
        $(this).css("background-color", "white");
    })

    $("h4").on("mouseover",function () {
        $(this).css("background-color","yellow");
    })

    $("h4").on("mouseleave", function () {
        $(this).css("background-color", "white");
    })

    $("#btninfo").click(function () {
        $("#info").slideToggle("slow");
    })
})
function vaciarLista(){
    $(".card").slideUp(1000);

    setTimeout(() => {
        localStorage.clear();
        mostrarProductos()
        location.reload();
    }, 1100);
}

function guardarProductos() {

    
    let nombre= $("#nombre").val();

    
    let precio= $("#precio").val();

  
    let id= $("#id").val();

    let prodNuevo= new Producto(nombre,precio,id);

    if(esValido(prodNuevo)&&prodExiste(prodNuevo)){
        guardar(prodNuevo);
        
        $("#formP").reset();
    }else{
        mostrarError("ERROR: producto existe o hay campos vacios");
    }

}
function prodExiste(prodNuevo){
    let salida=true;
    let prodLista=JSON.parse(localStorage.getItem("productos"));

    if(prodLista!=null&&prodLista.find(item=>item.id==prodNuevo.id)){
        salida=false;
    }
    return salida;
}

function guardar(prodNuevo){

    let prodLista=JSON.parse(localStorage.getItem("productos"))
    if(localStorage.getItem("productos")!=null){
        
        prodLista.push(prodNuevo);
        localStorage.setItem("productos",JSON.stringify(prodLista))

    }else{

        localStorage.clear();
        productos.push(prodNuevo);
        localStorage.setItem("productos",JSON.stringify(productos))
    }
}
function esValido(prodNuevo){
    let salida = true;
    const campos = Object.values(prodNuevo);
    campos.forEach(campo => {
        if (campo === "") {
            salida = false;
        }
    });
    return salida;
}


function mostrarError(mensaje) {
    const div = document.createElement("div");
    div.classList.add("alert", "alert-danger", "m-3");
    div.textContent = mensaje;

    const section = document.getElementById("sect1");
    section.appendChild(div);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

//creamos la funcion mostrar productos con Jquery
function mostrarProductos(){   

    $("body").append(`
        <section class="sect2 contariner m-2" id="prods">
            <h3 class="titulo-3">Tarjetas de los Productos Agregados</h3>
            <div class="row justify-content-evenly m-2" id="items"></div>
        </section>
    `)
    let prodLista=JSON.parse(localStorage.getItem("productos"))
    if (prodLista!=null) {
        //  console.log(prodLista.length)

        prodLista.map(elemento=>{

            $("#items").append(`
                <div class="card col-2 m-3">
                    <h4 class="titulo-4"> Nombre: ${elemento.nombre}</h4>
                    <p class="precioProd">Precio: ${elemento.precio}</p>
                    <button class="btn btn-primary" id="btn-${elemento.id}">Vender</button>
                    <button class="btn btn-danger" id="${elemento.id}">Eliminar</button>
                </div>
            `);
            
            //asociamos un evento al boton
            $(`#btn-${elemento.id}`).on('click',function(){
                // console.log(`Compraste: ${elemento.nombre}`);

                $("#items").append(`<div class="alert alert-success m-3" id="box">Vendiste ${elemento.nombre}</div>`)
                $(".alert").slideUp(3000)
                setTimeout(() => {
                    $(".alert").remove();
                }, 5000);
                
            })
            //evento para eliminar una tarjeta
            $(`#${elemento.id}`).click(function (e){
                // console.log(e.target.id);
                       
                let borrar=JSON.parse(localStorage.getItem("productos"))
                let actualizo= borrar.filter(elementos=> elementos.id != e.target.id)
                localStorage.setItem("productos",JSON.stringify(actualizo))
                location.reload()
                   
                
            })
        })
        //preguntamos si el array contiene algo por el evento de eliminar tarjeta si no hay ninguna tarjeta hace un clear para que no quede basura
        if(prodLista.length == 0){

            localStorage.clear();
            location.reload();
        }
    }
    else{
        $("#items").append(`<p class="vacio">No hay productos Agregados</p>`)
    }

}

function cambiarTema(){
    document.body.classList.toggle("darkMode",);
}


//--Logica

mostrarProductos();