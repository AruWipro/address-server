const express = require('express');
const testRouter = express.Router();
const createError = require('http-errors');

const products = [{ id: '1', name: 'Playstation 5', inStock: false }];

testRouter.get('/', (req, res) => {
  res.json(products);
});

testRouter.get('/:id', (req, res, next) => {
  const product = products.find(
    (product) => product.id === String(req.params.id)
  );
  if (!product) {
    return next(createError(404, 'Not Found'));
  }
  res.json(product);
});

testRouter.post('/', (req, res, next) => {
  const { body } = req;

  if (typeof body.name !== 'string') {
    return next(createError(400, 'Validation Error'));
  }

  const newProduct = {
    id: '1',

    name: body.name,

    inStock: false,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

module.exports = testRouter;