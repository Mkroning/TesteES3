/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

let products = [];

app.get('/products', (request, response) => {
  // TODO: listagem de todos os produtos
  return response.json(products);
});

app.post('/products', (request, response) => {
  // TODO: Salvar produto no array products
  const { code, description, buyPrice, sellPrice, tags } = request.body;

  const product = { id: uuid(), code, description, buyPrice, sellPrice, tags };

  if (products.find(product => product.code == code) == undefined) {
    product.lovers = 0;
  } 

  return response.status(201).json(product);

});

app.put('/products/:id', (request, response) => {
  // TODO: Atualiza produto por ID
  const { id } = request.params;
  const { code, description, buyPrice, sellPrice, tags } = request.body;

  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex < 0) {
    return response.status(400).json({ error: 'Product not found' })
  }

  const product = {
    id,
    code,
    description,
    buyPrice,
    sellPrice,
    tags,
  };

  products[productIndex] = product;

  return response.json(product);

});

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
  const { code } = request.params;

  const productIndex = products.findIndex(product => product.code === code);

  if (productIndex < 0) {
    return response.status(400).json({ error: 'Product not found' })
  }

  products.splice(productIndex, 1);

  return response.status(204).send();
});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro
  const { code } = request.params;
  products = products.filter(product => product.code == code).map(product => ({
    ...product, lovers: product.lovers ++
  }));
  return response.json(products)

});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
  const { code } = request.params;
  const product = products.find(product => product.code == code);

  if(product == undefined) {
    response.status(204).json();
  }else {
    product = products.filter(product => product.code == code);
    return response.json(product);
  }
});

export default app;
