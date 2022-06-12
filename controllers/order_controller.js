const order								        = require('../models').order;
const orderDetail					        = require('../models').orderDetail;
const ipify								        = require('ipify2');
const { QueryTypes }   = require('sequelize');
const sequelize = require('sequelize');

// Show all orders
exports.print = async (req, res) => {
  try{
    const result = await order.findAll();
    const allResult = await result.map(async (item) => {
      const subTotal = await orderDetail.findAll({
        attributes: [
          [sequelize.fn('sum', sequelize.col('subtotal')), 'totalPrice']
        ],
        raw: true,
        where: {
          orderId: item.id
        }
      })
      const theDetails = Object.assign(
        item.dataValues,
        {
          totalPrice: subTotal[0].totalPrice || 0
        }
      )
      return (theDetails)
    })
    const promise = await Promise.all(allResult)
    res.status(200).json(promise)
  } catch(err) {
    res.status(400).send(err);
  }
}

// Add new order
exports.add = async(req, res, next) => {
  try{


    // START creating invoice number

    // Check total order on following month
    const count = await order.sequelize.query(
      'SELECT COUNT(*) FROM orders WHERE MONTH(createdAt) = MONTH(CURRENT_DATE)', { type: QueryTypes.SELECT}
    );
    const month = (new Date()).getMonth(); // range from 0 to 11
    const year = (new Date()).getFullYear();

    // Convert month into romans format
    let romans;
    switch (month) {
      case 0:
        romans = 'I'
        break;
      case 1:
        romans = 'II'
        break;
      case 2:
        romans = 'III'
        break;
      case 3:
        romans = 'IV'
        break;
      case 4:
        romans = 'V'
        break;
      case 5:
        romans = 'VI'
        break;
      case 6:
        romans = 'VII'
        break;
      case 7:
        romans = 'VIII'
        break;
      case 8:
        romans = 'IX'
        break;
      case 9:
        romans = 'X'
        break;
      case 10:
        romans = 'XI'
        break;
      case 11:
        romans = 'XII'
        break;
      default:
        return res.sendStatus(500);
    }

    const invoice = JSON.stringify(count[0]['COUNT(*)']) + '/INV/CJG/' + romans + '/' + year;
    // END creating invoice number
    
    const ip = await ipify.ipv4();

    // START Insert into database
    await order.create({
      invoice       : invoice,
      email         : req.body.email,
      username      : req.body.username,
      recipient     : req.body.recipient,
      country       : 'id',
      province      : req.body.province,
      city          : req.body.city,
      district      : req.body.district,
      ward          : req.body.ward,
      address1      : req.body.address1,
      address2      : req.body.address2,
      zip           : req.body.zip,
      paymentMethod : req.body.paymentMethod,
      shipment      : req.body.shipment,
      shipmentCost  : req.body.shipmentCost,
      phone         : req.body.phone,
      status        : 'created',
      createdBy     : ip,
      modifiedBy    : ip
    });
    // END Insert into database
    
    res.status(200).send({ msg: 'Order created' });
    next();
  } catch(err) {
    console.log(err);
  }
}