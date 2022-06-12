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
			where:{
				userId: req.body.userId
			}
		});
		if (!getCart){
			return res.status(200).json({data: [], msg: 'Cart empty' });
		};

		// console.log(getCart[0]['id']);
		let data = getCart.length;
		console.log(data);
		const allProducts = await getCart.map(async (item) => {
			console.log('masuk')
			let getProduct = null
			let getMaterial = null
			if (item.productId) {
				getProduct = await product.findOne({
					attributes: [
						'shape',
						'name',
						'variant',
						'mainImg',
					],
					where:{
						id: item.productId
					}
				})
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
						id: item.productCustomId
					}
				})
			}
			getMaterial = await material.findOne({
				attributes: [
					'price',
					'weight',
					'width'
				],
				where:{
					id: item.materialId
				}
			})
			
			const subPrice = parseFloat(item.length) * parseFloat(item.qty) * parseFloat(getMaterial.price) || 0
			const subWeight = parseFloat(item.length) * parseFloat(item.qty) * parseFloat(getMaterial.weight) || 0
			
			let theProduct = Object.assign(
				{},
				item.dataValues,
				getProduct.dataValues,
				getMaterial.dataValues,
				{
					subPrice: subPrice,
					subWeight: subWeight
				}
			)
			return (theProduct);
		})
		const promises = await Promise.all(allProducts)
		console.log('theProduct')
		res.status(200).json(promises)
	} catch(err) {
		console.log(err)
	}
}