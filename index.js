const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos (HTML, CSS, JS) da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());


///////////                ///////////
/////////// BANCO DE DADOS ///////////
///////////                ///////////

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database('kolekcja.db');

// Criar as tabelas se não existirem
db.serialize(() => {
    // Criar a tabela alunos
    db.run(`
        CREATE TABLE IF NOT EXISTS cliente (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT NOT NULL,
            endereco TEXT NOT NULL,
            data_nasc DATE NOT NULL,
            email TEXT NOT NULL,
            num_telef INTEGER NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela cliente:', err);
        } else {
            console.log('Tabela clientes criada com sucesso (ou já existe).');
        }
    });
    
    // Criar a tabela FORNECEDOR
     db.run(`
        CREATE TABLE IF NOT EXISTS fornecedor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
           nome_empresa vARCHAR(100) NOT NULL, 
           CNPJ  TEXT UNIQUE NOT NULL,
           teleone_fornecedor TEXT NOT NULL,
           email_fornecedor TEXT NOT NULL,
            razao_social TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela fornecedor:', err);
        } else {
            console.log('Tabela de fornecedores criada com sucesso (ou já existe).');
        }
    });

  ////FIM DA TABELA FORNECEDOR////
   
    /////// CRIAR TABELA PRODUTO ////////
    db.run(`
         CREATE TABLE IF NOT EXISTS produto (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             nome TEXT ,
             preco TEXT ,
             descricao TEXT ,
             estoque INTEGER ,
             dimencoes TEXT ,
             fabricante TEXT ,
             categoria TEXT,
             codigo TEXT UNIQUE NOT NULL

         )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela produto:', err);
        } else {
            console.log('Tabela produto criada com sucesso (ou já existe).');
        }
    });
  ////////////FIM TABELA PRODUTO//////////
  //////////// CRIAR TABELA VENDA ////////////
    db.run(`
         CREATE TABLE IF NOT EXISTS venda(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             cpf_cliente TEXT NOT NULL,
             cod_produto TEXT NOT NULL,
             data_venda TEXT NOT NULL,
             data_envio TEXT NOT NULL,
             data_entrega TEXT NOT NULL,
             custo_entrega TEXT NOT NULL,
            
             FOREIGN KEY(cpf_cliente) references cliente(cpf),
             FOREIGN KEY(cod_produto) references produto(codigo)
        
             
         )`,
           (err) => {
               if (err) {
                   console.error('Erro ao criar tabela venda:', err);
               } else {
                   console.log('Tabela venda criada com sucesso (ou já existe).');
               }
           });
           
});   
   
    //////////////                    ////////////
    ///////////// ROTAS PARA CADASTRA //////////////
    /////////////                     ////////////


        /********* CADASTRO DE CLIENTE *********/   
    
    app.post('/cadastrar-cliente', (req, res) => {
        const { nome_cliente, cpf_cliente, endereço_cliente, Dn_cliente, email_cliente, telefone_cliente} = req.body; 
        db.run("INSERT INTO cliente (nome, cpf, endereco, data_nasc, email, num_telef) VALUES (?, ?, ?, ?, ?, ?)", [nome_cliente, cpf_cliente, endereço_cliente, Dn_cliente, email_cliente, telefone_cliente], 
            function(err) {
            if (err) {
                console.error('Erro ao cadastrar cliente:', err);
                res.status(500).send('Erro ao cadastrar cliente');
            } else {
                res.send('cliente cadastrado com sucesso!');
            }
        });
});

///////////////ROTA PARA CADASTRAR FORNECEDOR////////////////////

    app.post('/cadastrar-fornecedor', (req, res) => {
            const { nome_empresa, CNPJ, teleone_fornecedor, email_fornecedor,razao_social,} = req.body; 
            db.run("INSERT INTO fornecedor (nome_empresa, CNPJ, teleone_fornecedor, email_fornecedor, razao_social) VALUES (?, ?, ?, ?,?)", [nome_empresa, CNPJ, teleone_fornecedor, email_fornecedor,razao_social], 
                function(err) {
                if (err) {
                    console.error('Erro ao cadastrar fornecedor:', err);
                    res.status(500).send('Erro ao cadastrar fornecedor');
                } else {
                    res.send('fornecedor cadastrado com sucesso!');
                }
            });
    });

//////////////////ROTA PARA CADASTRAR PRODUTO////////////////////

    app.post('/cadastrar-produto', (req, res) => {
            const { nome_produto, preco_produto, descricao_produto, estoque_produto, dimensoes_produto, fabricante_produto, categoria_produto, codigo_produto} = req.body; 
            db.run("INSERT INTO produto ( nome, preco, descricao, estoque, dimencoes, fabricante, categoria, codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [ nome_produto, preco_produto, descricao_produto, estoque_produto, dimensoes_produto, fabricante_produto, categoria_produto, codigo_produto], 
                function(err) {
                if (err) {
                    console.error('Erro ao cadastrar produto:', err);
                    res.status(500).send('Erro ao cadastrar produto');
                } else {
                    res.send('produto cadastrado com sucesso!');
                }
            });
    });
    
//////////////////ROTA PARA CADASTRAR VENDA////////////////////
    app.post('/cadastrar-venda', (req, res) =>{
        const {cpf_cliente, cod_produto, data_venda, data_envio, data_entrega, custo_entrega} = req.body;
        db.run("INSERT INTO venda (cpf_cliente, cod_produto, data_venda, data_envio, data_entrega, custo_entrega) VALUES (?, ?, ?, ?, ?, ?)", [cpf_cliente, cod_produto, data_venda, data_envio, data_entrega, custo_entrega],
            function(err) {
                if (err) {
                    console.error('Erro ao cadastrar venda:', err);
                    res.status(500).send('Erro ao cadastrar venda');
                } else {
                    res.send('venda cadastrada com sucesso!');
                }
            });
    })

// Teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor está rodando e tabelas criadas!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});