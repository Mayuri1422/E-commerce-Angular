const express = require("express");
const products = express.Router();
const pool = require("../shared/pool");

products.get("/", (req, res) => {
  const mainCategoryId = req.query.mainCategoryId;
  const subCategoryId = req.query.subCategoryId;
  const keyword = req.query.keyword;

  let query = "select * from products";

  if (subCategoryId) {
    query += " where category_id = " + subCategoryId;
  }

  if (mainCategoryId) {
    query = `select products.* from products, categories
     where products.category_id = categories.id and categories.parent_category_id = ${mainCategoryId}`;
  }

  if (keyword) {
    query += ` and keywords like '%${keyword}%'`;
  }

  pool.query(query, (err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(products);
    }
  });
});

products.get("/(:id)", (req, res) => {
  const id = req.params.id;
  const query = "select * from products where id =" + id;
  pool.query(query, (err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(products);
    }
  });
});

module.exports = products;
