function palabras() {
    var palabras = ["Algoritmo", "Antivirus", "Malware", "Adware", "Archivo", "Aplicacion", "Tecnologia", "Chatear", "Coookies", "Datos"];
    var Random = Math.floor((Math.random() * 10));
    console.log(palabras[Random]);
    document.getElementById("palabrasMostradas").innerHTML = (palabras[Random]);
}

palabras();

function presionarBoton(){
    
}