//libs importing

const express = require("express"); //lib for creating the web server

const axios = require("axios"); //lib for http communication

const path = require("path");



// Creation of the app
const app = express();

const PORT = 3000;

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//Endpoint to look for the adress from the CEP

app.get('/cep/:cep', async (req, res) => {              //Structuring API for stateless requisitions

    const { cep } = req.params;


    try {

        //Here we´re going to create the API ViaCEP requisition

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const endereco = response.data;


        // If the CEP is not found

        if (endereco.erro){

            return res.status(404).json({ mensagem: 'CEP não encontrado'});

        };

        //Return the formatted adress json

        res.json({

            cep: endereco.cep,

            logradouro: endereco.logradouro,

            bairro: endereco.bairro,

            cidade: endereco.localidade,

            estado: endereco.uf

        });


    } catch(error) {
        res.status(500).json({ mensagem: 'Erro ao consultar o CEP'});
    }

});


//Init our server

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});
