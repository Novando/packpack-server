const user 			= require('../models').user;
const address		= require('../models').address;
const fs 				= require('fs');
const ipify			= require('ipify2');
const jwt				= require('jsonwebtoken');


exports.print = async (req, res) => {
  try{
    let result = await address.findAll({
			attributes: [
				'id',
				'district',
				'ward'
			],
			where: {
				userId : req.params.id
			}
		});
    res.json(result);
  } catch(err) {
    res.json(err);
  };
};

exports.add = async (req, res) => {
	const getUser = await user.findOne({
		where: {
			id: req.body.userId
		}
	});

	if (!getUser) {
		return res.status(404).send({ msg: 'User not found'});
	}

	const checkAddress = await address.findOne({
		where: {
			userId 		: req.body.userId,
			recipient	: req.body.recipient,
			address1	: req.body.address1,
			isMain 		: req.body.isMain
		}
	})

	if(checkAddress){
		return res.status(200).send({ msg: 'Continue without saving address'})
	}

	let ip = await ipify.ipv4();
	try{
		await address.create({
			userId: getUser.id,
			recipient: req.body.recipient,
			phone: req.body.phone,
			country: req.body.country,
			province: req.body.province,
			city: req.body.city,
			district: req.body.district,
			ward: req.body.ward,
			address1: req.body.address1,
			address2: req.body.address2,
			zip: req.body.zip,
			createdBy: ip,
			modifiedBy: ip,
		});
		res.sendStatus(201);
  } catch(err) {
    res.status(400).send({ msg: err.message });
  };
};

exports.setMain = async (req, res) => {
	try{
		const getUser = await user.findOne({
			where: {
				id: req.body.userId
			}
		});

		if (!getUser) {
			return res.status(404).send({ msg: 'User not found'});
		};
		
		
		let ip = await ipify.ipv4();
		await address.update({
			isMain : false,
			modifiedBy : ip
			}, {
			where: {
				userId 		: req.body.userId,
			}
		});
		res.sendStatus(201);
  } catch(err) {
    res.status(400).send({ msg: err.message });
  };
};

exports.show = async (req, res) => {
  try{
    let result = await address.findOne({
			where: {
				id: req.params.id
			}
		});
    res.json(result);
  } catch(err) {
    res.json(err);
  };
};

exports.showUser = async (req, res) => {
  try{
    let result = await address.findOne({
			where: {
				userId: req.params.id,
				isMain: true
			}
		});
    res.json(result);
  } catch(err) {
    res.json(err);
  };
};