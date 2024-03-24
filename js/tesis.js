const obten_data = async() =>{
    try {
        const response = await fetch("http://127.0.0.1:3000/getAllTesis");
        const data = await response.json();
        console.log(data);
    } catch (ex) {
        alert(ex)
    }
}