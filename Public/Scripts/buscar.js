let button = document.getElementById("buscar-button")
button.addEventListener("click",async()=>{
    let data = await postData("obtenerObjetos")
    alert(data)
})
document.getElementById("buscador-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let nombre = document.getElementById("nombre").value;
    await postData("buscarObjeto",nombre, (objeto)=>{
        console.log(objeto)
    })
    
})