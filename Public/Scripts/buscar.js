


let button = document.getElementById("buscar-button")
    
function buscar(){
    let nombre = document.getElementById("buscador-form").value;
    postData("buscarObjeto",nombre, (objeto)=>{
        console.log(objeto)
    })
}


button.addEventListener("click",buscar)
