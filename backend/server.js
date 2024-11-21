const express = require('express'); // importa o módulo express para criar o servidor web
const fs = require('fs'); // importa o módulo fs (file system) para manipular arquivos
const bodyParser = require('body-parser'); // importa o body-parser para processar o corpo das requisições
const cors = require('cors'); // importa o cors, que permite requisições de diferentes origens
const app = express(); // cria uma instância do aplicativo express
const PORT = 5000; // define a porta em que o servidor vai ouvir as requisições

app.use(cors()); // habilita o cors para permitir requisições de outros domínios
app.use(bodyParser.json()); // configura o body-parser para processar json no corpo das requisições

// rota para login do usuário
app.post('/login', (req, res) => {
    const { cpf, password } = req.body; // desestrutura os campos cpf e password do corpo da requisição

    // lê o arquivo 'users.json' para buscar os dados de usuários
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) { // verifica se houve erro ao ler o arquivo
            console.error('erro ao ler o arquivo json:', err); // exibe o erro no console
            return res.status(500).json({ message: 'erro ao acessar os dados de usuários' }); // retorna erro 500 ao cliente
        }

        const users = data ? JSON.parse(data) : []; // se houver dados, converte para array, senão usa array vazio

        // busca um usuário com cpf e senha correspondentes
        const user = users.find(u => u.cpf === cpf && u.password === password);

        if (user) { // se o usuário for encontrado, retorna sucesso
            return res.status(200).json({ message: 'login bem-sucedido' }); // retorna status 200 com mensagem de sucesso
        } else { // se o usuário não for encontrado, retorna erro de autenticação
            return res.status(401).json({ message: 'cpf ou senha inválidos' }); // retorna status 401 com mensagem de erro
        }
    });
});

// rota para registrar um novo usuário
app.post('/register', (req, res) => {
    const newUser = req.body; // pega os dados do novo usuário do corpo da requisição

    // lê o arquivo 'users.json' para buscar e atualizar os dados de usuários
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) { // verifica se houve erro ao ler o arquivo
            console.error('erro ao ler o arquivo json:', err); // exibe o erro no console
            return res.status(500).json({ message: 'erro ao salvar os dados' }); // retorna erro 500 ao cliente
        }

        const users = data ? JSON.parse(data) : []; // se houver dados, converte para array, senão usa array vazio

        users.push(newUser); // adiciona o novo usuário ao array de usuários

        // escreve o array atualizado no arquivo 'users.json'
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) { // verifica se houve erro ao escrever no arquivo
                console.error('erro ao escrever no arquivo json:', err); // exibe o erro no console
                return res.status(500).json({ message: 'erro ao salvar os dados' }); // retorna erro 500 ao cliente
            }

            res.status(201).json({ message: 'usuário registrado com sucesso' }); // retorna status 201 com mensagem de sucesso
        });
    });
});

// inicia o servidor e ouve na porta definida
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`); // exibe no console que o servidor está rodando
});
