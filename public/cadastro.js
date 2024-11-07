async function cadastro_cliente(){
    alert('aaaaaaaaaaaaaaaaa');
    const nome_cliente = document.getElementById('nome_cliente').value;
    const cpf_cliente = document.getElementById('cpf_cliente').value;
    const endereço_cliente = document.getElementById('end_cliente').value;   
    const Dn_cliente = document.getElementById('dtNasc_cliente').value;
    const email_cliente = document.getElementById('email_cliente').value;
    const telefone_cliente = document.getElementById('telef_cliente').value;

  await fetch('/cadastrar-cliente', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome_cliente, cpf_cliente, endereço_cliente, Dn_cliente, email_cliente, telefone_cliente})
   
  });   

}

/////////////////////////////////////////////////////////////////////////////////////////////

async function cadastro_produto(){
  alert('aaaaaaaaaaaaaaaaa');
  const nome_produto = document.getElementById('nomeProduto').value;
  const preco_produto = document.getElementById('precoProduto').value;
  const descricao_produto = document.getElementById('descricao').value;   
  const estoque_produto = document.getElementById('estoquee').value;
  const dimensoes_produto = document.getElementById('dimensao').value;
  const fabricante_produto = document.getElementById('fabricante').value;
  const categoria_produto = document.getElementById('categoria').value;
  const codigo_produto = document.getElementById('IDcodigo').value;

  await fetch('/cadastrar-produto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome_produto, preco_produto, descricao_produto, estoque_produto, dimensoes_produto, fabricante_produto, categoria_produto, codigo_produto})

  });

}
/////////////////////////////////////////////////////////////////////////////////////////////

async function cadastro_fornecedor(){

  alert('aaaaaaaaaaaaaaaaa');
  const nome_empresa = document.getElementById('nome').value;
  const CNPJ = document.getElementById('cnpj').value;
  const teleone_fornecedor = document.getElementById('TEL').value;   
  const email_fornecedor = document.getElementById('email_empresa').value;
  const razao_social = document.getElementById('NOME2').value;

  await fetch('/cadastrar-fornecedor', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ nome_empresa, CNPJ, teleone_fornecedor, email_fornecedor,razao_social})

  });

}

async function cadastro_venda(){
  alert('Sucesso');
  const cpf_cliente = document.getElementById('cpf_c').value;
  const cod_produto = document.getElementById('codigo_produto').value;
  const data_venda = document.getElementById('data_venda').value;
  const data_envio = document.getElementById('data_envio').value;
  const data_entrega = document.getElementById('estim_entrega').value;
  const custo_entrega = document.getElementById('custo_entrega').value;

  await fetch('/cadastrar-venda', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({cpf_cliente,cod_produto, data_venda, data_envio, data_entrega, custo_entrega})

  });

}



