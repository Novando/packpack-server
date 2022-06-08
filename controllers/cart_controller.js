const product 						= require('../models').product;
const productCustom 			= require('../models').productCustom;
const cart								= require('../models').cart;
const material						= require('../models').material;
const user								= require('../models').user;
const fs 									= require('fs');
const path 								= require('path');
const ipify								= require('ipify2');
const { Op } 							= require('sequelize');

exports.add = async (req, res) => {
	try{
		let userId = req.body.userId;
		if (!userId) {
			return res.status(400).send({ msg: 'Login required' });
		};
		let ip = await ipify.ipv4();
		await cart.create({
			userId 					: userId,
			productId 			: req.body.productId,
			productCustomId	: req.body.productCustomId,
			materialId 			: req.body.materialId,
			width 					: parseInt(req.body.width),
			length 					: parseInt(req.body.length),
			qty 						: parseInt(req.body.qty),
			createdBy 			: ip,
			modifiedBy 			: ip
		});
		res.status(200).send({ msg: 'Cart Updated'});
	} catch(err) {
		console.log(err)
	}
}

exports.show = async (req, res) => {
	console.log('mulai');
	try{
		const getCart = await cart.findAll({
			attributes: {
				exclude: [
					'createdBy',
					'modifiedBy',
					'createdAt',
					'updatedAt'
				]
			},
			where:{
				userId: req.body.userId
			}
		});
		console.log('sampe sini');
		if (!getCart){
			return res.status(200).send({ msg: 'Cart empty' });
		};

		// console.log(getCart[0]['id']);
		let datum = 0;
		let data = getCart.length;
		let allProducts = [];
		let getProduct
		console.log(data);
		while (datum < data) {
			if (getCart[datum]['productId']) {
				getProduct = await product.findOne({
					attributes: [
						'shape',
						'name',
						'variant',
						'mainImg',
					],
					where:{
						id: getCart[datum]['productId']
					}
				});
				console.log('productId');
			} else {
				getProduct = await productCustom.findOne({
					attributes: [
						'shape',
						'brandName',
						'productName',
						'variantName',
						'designFiles',
					],
					where:{
						id: getCart[datum]['productCustomId']
					}
				});
			}

			getMaterial = await material.findOne({
				attributes: [
					'price',
					'weight',
					'width'
				],
				where:{
					id: getCart[datum]['materialId']
				}
			})

			console.log(getProduct.dataValues);
			let theProduct = Object.assign(
				{},
				getCart[datum].dataValues,
				getProduct.dataValues,
				getMaterial.dataValues
			);
			allProducts.push(theProduct);
			datum ++;
			
		}

		res.json(allProducts)
	} catch(err) {
		console.log(err)
	}
}