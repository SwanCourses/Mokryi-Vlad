import Product from '../models/product';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';
/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getProducts(req, res) {
  Product.find().sort('name').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({products});
    }
  });
}

export function addProduct(req, res) {
  if (!req.body.product.name || !req.body.product.code || !req.body.product.price || !req.body.product.description) {
    res.status(403).end();
  } else {
    const newProduct = new Product(req.body.product);

    // Let's sanitize inputs
    newProduct.code = sanitizeHtml(newProduct.code);
    newProduct.name = sanitizeHtml(newProduct.name);
    newProduct.description = sanitizeHtml(newProduct.description);

    newProduct.cuid = cuid();
    for (let i = 0, file; file = req.files[i]; i++) {
      //parse fieldname
      var key = file.fieldname.split('[')[2].slice(0,-1);
      if (!newProduct.colors[key].photos) {
        newProduct.colors[key].photos = [];
      }
      newProduct.colors[key].photos.push({ fileName: file.filename })
    }

    newProduct.save().then((saved)=> {
      res.json({ product: saved })
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
}

export function updateProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid })
    .then(document => {
      if (!document || !req.body.product.name || !req.body.product.price || !req.body.product.description) {
        res.status(403).end();
      } else {
        // Let's sanitize inputs
        document.name = sanitizeHtml(req.body.product.name);
        document.description = sanitizeHtml(req.body.product.description);
        document.price = req.body.product.price;

        document.sizes = req.body.product.sizes;
        document.category = req.body.product.category;
        document.group = req.body.product.group;
        document.inactive = req.body.product.inactive;
        //equal colors
        Object.keys(req.body.product.colors).forEach(function (color) {
          if (!document.colors[color]) {
            //no exist
            document.colors[color] = req.body.product.colors[color];
          } else {
            document.colors[color].value = req.body.product.colors[color].value;
          }
        });

        for (let i = 0, file; file = req.files[i]; i++) {
          //parse fieldname
          var key = file.fieldname.split('[')[2].slice(0,-1);
          if (!document.colors[key].photos) {
            document.colors[key].photos = [];
          }
          document.colors[key].photos.push({ fileName: file.filename })
        }

        return document.save();
      }
    })
    .then(saved => {
      res.json({ product: saved });
    })
    .catch(err=> {
      res.status(500).send(err);
    });
}
