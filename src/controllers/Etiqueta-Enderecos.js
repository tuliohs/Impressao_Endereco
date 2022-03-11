const enderecosImpressos = [];
const axios = require('axios');
const CONSTANTS = require("../../constants.js");
var fs = require('fs');
var {
    exec
} = require("child_process");




async function sendToPrinterEnderecos(endereco, descricao) {
    return new Promise((resolve, reject) => {
       
        exec('fo016145@bhz-m-001348 documents % lpr -l label_03.zpl', (err, stdout, stderr) => {
                 setTimeout(() =>  resolve(null), 1000);

        });
    });

  
};


// async function sendToPrinterEnderecos(endereco, descricao) {
//     return nconst enderecosImpressos = [];
const axios = require('axios');
const CONSTANTS = require("../../constants.js");
var fs = require('fs');
var {
    exec
} = require("child_process");




async function sendToPrinterEnderecos(endereco, descricao) {
    return new Promise((resolve, reject) => {
       
        exec('fo016145@bhz-m-001348 documents % lpr -l label_03.zpl', (err, stdout, stderr) => {
                 setTimeout(() =>  resolve(null), 1000);

        });
    });

  
};


// async function sendToPrinterEnderecos(endereco, descricao) {
//     return new Promise((resolve, reject) => {
//         fs.readFile("C:\\Etiquetas\\ModeloEtiquetaEnderecoHardzBrands.txt", 'utf-8', (err, data) => {

//             data = data.replace('@endereco_ean', endereco);
//             data = data.replace('@endereco_string', descricao);
//            // console.log(data);

//              fs.writeFile("C:\\Etiquetas\\ImprimirEtiquetaEnderecoMV.txt", data, (err) => {
//                  exec('COPY /B C:\\Etiquetas\\ImprimirEtiquetaEnderecoMV.txt \\\\DESKTOP-T5LPABC\\"ZDesigner ZD220-203dpi ZPL (Copiar 1)"', (err, stdout, stderr) => {
//                     
//                  });
//              });
//             resolve(null);

//         });

//     });
// };






module.exports = {

    async buscarEnderecos() {
        await axios.get(CONSTANTS.apiUrl + '/etiquetaendereco').then(async res => {
            let enderecos = res.data.filter(element => !enderecosImpressos.includes(element.Id));

            if (enderecos.length > 0) {
              //  console.log(enderecos.length);
              //  console.log(enderecos);
                for (let i = 0; i < enderecos.length; i++) {
                    console.log(i);
                    if (!enderecosImpressos.includes(enderecos[i].Id)) {
                        console.log("Imprimindo endereço de código " + enderecos[i].Codigo + "...");

                        await sendToPrinterEnderecos(enderecos[i].Codigo, enderecos[i].Descricao);

                        enderecosImpressos.push(enderecos[i].Id);
                        await axios.put(CONSTANTS.apiUrl + '/etiquetaendereco/' + enderecos[i].Codigo, {});

                       
                    }
                
                }
                
            } else {
                console.log("Nenhuma Etiqueta de Endereço a imprimir...");
            }
        });
    }
}