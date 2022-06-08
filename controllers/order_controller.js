const order								= require('../models').order;
const ipify								= require('ipify2');

// Show all orders
exports.print = async (req, res) => {
  try{
    const result = await order.findAll();
    res.status(200).json(result);
  } catch(err) {
    res.status(400).send(err);
  }
}

// Add new order
exports.add = async(req, res, next) => {
  try{


    // START creating invoice number

    // Check total order on following month
    const count = await order.query(
      'SELECT COUNT(*) FROM orders WHERE MONTH(createdAt) = MONTH(CURRENT_DATE)'
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

    const invoice = toString(count) + '/INV/CJG/' + romans + '/' + year;
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