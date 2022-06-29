const orderDetail					= require('../models').orderDetail;
const order					      = require('../models').order;
const cart                = require('../models').cart;
const material            = require('../models').material;
const product             = require('../models').product;
const productCustom       = require('../models').productCustom;
const jsConvert           = require('js-convert-case');
const ipify								= require('ipify2');

exports.add = async(req, res) => {
  try{
    let counter = 0;
    const { count, rows } = await cart.findAndCountAll({
      where: {
        userId: req.body.userId
      }
    });
    const getOrder = await order.findOne({
      order: [
        ['id', 'DESC']
      ]
    });

    while (counter < count) {
      let getProduct = null
      let productName = null
      if (rows[counter].productId) {
        getProduct = await product.findOne({
          where:{
            id: rows[counter].productId
          }
        });
        const name    = jsConvert.toHeaderCase(getProduct.name);
        const variant = jsConvert.toHeaderCase(getProduct.variant);
        const shape   = jsConvert.toUpperCase(getProduct.shape);

        productName = name + ' - ' + variant + ' [' + shape + ']';

      } else if (rows[counter].productCustomId) {
        getProduct = await productCustom.findOne({
          where:{
            id: rows[counter].productCustomId
          }
        });
        const name    = jsConvert.toHeaderCase(getProduct.productName);
        const variant = jsConvert.toHeaderCase(getProduct.variantName);
        const shape   = jsConvert.toUpperCase(getProduct.shape);
        const brand   = jsConvert.toHeaderCase(getProduct.brandName);
        const user    = getProduct.userId;

        const firstName   = '(#' + user + ' - ' + brand + ') ';
        const lastName    = name + ' - ' + variant + ' [' + shape + ']';
        productName = firstName + lastName; 

      } else {
        return res.status(400).send({ msg: "Product / product custom ID cannot be NULL" });
      };

      if (!getProduct) {
        return res.status(400).send({ msg: "Product / product custom ID didn't exist" });
      };

      const getMaterial = await material.findOne({
        where:{
          id: rows[counter].materialId
        }
      });

      if (!getMaterial) {
        return res.status(400).send({ msg: "Material didn't exist" });
      };

      const width   = rows[counter].width;
      const length  = rows[counter].length;
      const qty     = rows[counter].qty;
      const weight  = length * qty * getMaterial.weight;
      const subtotal= length * qty * getMaterial.price;
      
      const ip = await ipify.ipv4();
      await orderDetail.create({
        orderId     : getOrder.id,
        productId   : getProduct.id,
        productName : productName,
        materialId  : getMaterial.id,
        materialName: getMaterial.name,
        length      : length,
        width       : width,
        weight      : weight,
        qty         : qty,
        subtotal    : subtotal,
        createdBy   : ip,
        modifiedBy  : ip 
      });

      
      counter ++
    }
    await cart.destroy({
      where: {
        userId: req.body.userId
      }
    })
    res.status(200).send({msg: "order created", orderId: getOrder.id})
  } catch(err) {
    console.log(err)
  }
}