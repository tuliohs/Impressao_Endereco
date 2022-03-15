var express = require("express");
//const axios = require('axios');
var app = express();
var { exec } = require("child_process");
var HTTP_PORT = 8500;
const cron = require("node-cron");
const EtiquetaEnderecoController = require('./src/controllers/Etiqueta-Enderecos');

let imprimindo = false

cron.schedule("*/10 * * * * *", async () => {
    if (imprimindo == false) {
        imprimindo = true
        await EtiquetaEnderecoController.buscarEnderecos();
        imprimindo = false
    }
});

app.listen(HTTP_PORT)
//var express = require("express");
//const axios = require('axios');
var app = express();
var { exec } = require("child_process");
var HTTP_PORT = 8500;
//const cron = require("node-cron");
//const EtiquetaEnderecoController = require('./src/controllers/Etiqueta-Enderecos');

//let imprimindo = false

cron.schedule("*/10 * * * * *", async () => {
    if (imprimindo == false) {
        imprimindo = true
        await EtiquetaEnderecoController.buscarEnderecos();
        imprimindo = false
    }
});

app.listen(HTTP_PORT, () => {
    console.log("Serviço iniciado...")
});
