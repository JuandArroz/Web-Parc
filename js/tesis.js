var tesisData = [];

const dataTable = async() =>{
    await obten_data();
    console.log
    console.log(tesisData)
    
}

const obten_data = async() =>{
    try {
        const response = await fetch("http://127.0.0.1:3000/getAllTesis");
        const data = await response.json();
        
        tesisData = data;

    } catch (ex) {
        alert(ex)
    }
}

window.addEventListener("load",async()=>{
    await dataTable();
})