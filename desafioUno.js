const { error, log } = require("console");

const fs = require("fs");

/*const fecha = new Date();
const fechaActual = `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;

fs.writeFile("fechaActual.txt", fechaActual, (error) => {
    fs.readFile("fechaActual.txt", "utf-8", (error, contenido) => {
        error && console.log("Error! No se encontró el archivo");
        console.log(contenido);
    })
})*/

//Ejemplo de archivos con promesas
/*let nombreArchivo = "archivoConPromesas.txt";
const funcionesAsincronas = async () => {
    //Creo mi archivo
    await fs.promises.writeFile(nombreArchivo, "Hola Coders!\n");
    //Leo mi archivo
    //let contenido = await fs.promises.readFile(nombreArchivo, "utf-8");
    //console.log(contenido);
    //Actualizo mi archivo
    await fs.promises.appendFile(nombreArchivo, "Actualizando nuevo Texto!!!!\n");
    //Leo mi archivo
    let contenido = await fs.promises.readFile(nombreArchivo, "utf-8");
    console.log(contenido);
    //Elimino mi archivo
    await fs.promises.unlink(nombreArchivo);
};

funcionesAsincronas();*/