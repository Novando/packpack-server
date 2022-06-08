const productCustom				= require('../models').productCustom;
const fs 									= require('fs');
const path 								= require('path');
const ipify								= require('ipify2');
const sharp 							= require('sharp');

exports.print = async (req, res) => {
  try{
    let result = await productCustom.findAll({
    	attributes: {
				exclude: [
					'bestLength',
					'bestWidth',
				]
			}
    });
    res.json(result);
  } catch(err) {
    res.json(err);
  };
};

exports.add = async (req, res) => {
	try{
		let { userId, brandName, productName, variantName, shape } = req.body;
		const designFiles = req.files['designFiles'][0].filename;
		console.log('sampe sini');
		const checkItem = await productCustom.findOne({
			where:{
				shape				: shape,
				brandName		: brandName,
				productName	: productName,
				variantName	: variantName,
				userId			: userId
			}
		});
		console.log('hore');
		if (checkItem) {
			return res.status(400).send({
				msg: 'Identical Custom already exist'
			})
		};

  	let ip = await ipify.ipv4();
    await productCustom.create({
      userId			: userId,
    	shape				: shape.toLowerCase(),
    	brandName		: brandName.toLowerCase(),
			productName	:	productName.toLowerCase(),
			variantName	:	variantName.toLowerCase(),
			designFiles	: designFiles,
			bestLength	: parseInt(req.body.bestLength),
			bestWidth		: parseInt(req.body.bestWidth),
			createdBy		: ip,
			modifiedBy	: ip
    });

		await sharp('./public/uploads/' + designFiles)
			.toFile('./public/storage/custom_products/' + designFiles);

		/*
		* Problem with FS
		* Working on it
		* Do not uncomment just yet!!!
		*/
    // fs.unlink('./public/uploads/' + designFiles, () => {
      // 	res.json({ file: './public/storage/Customs/' + designFiles })
      // });
				
		res.sendStatus(201);
	} catch(err) {
    res.status(400).send({ msg: err.message });
  };
};

exports.remove = async(req, res) => {
	await productCustom.destroy({
		where:{
			id: req.params.id,
		}
	});;
	return res.sendStatus(200);
};

exports.edit = async(req, res) => {
	try{
		let { userId, brandName, productName, variantName, shape } = req.body;
		const checkItem = await productCustom.findOne({
			where:{
				shape				: shape,
				brandName		: brandName,
				productName	: productName,
				variantName	: variantName,
				userId			: userId
			}
		});
	
		if (checkItem) {
			return res.status(400).send({
				msg: 'Identical Custom already exist'
			})
		};

		let ip = await ipify.ipv4()
		await productCustom.update(
			{				
				shape				: shape.toLowerCase(),
				brandName		: brandName.toLowerCase(),
				productName	:	productName.toLowerCase(),
				variantName	:	variantName.toLowerCase(),
				bestLength	: req.body.bestLength,
				bestWidth		: req.body.bestWidth,
				modifiedBy	: ip,
				updateAt		: Date.now()
			}, {
				where:{
					id: req.id
				}
			}
		);
		
		return res.status(200).send({ msg: 'Product updated' });
	} catch(err) {
		console.log(err);
		return res.status(400).send({ msg: err });
	}
};

exports.show = async (req, res) => {
	console.log('seeking productID ' + req.params.id);
  try{
    let result = await productCustom.findOne({
			attributes: {
				exclude: [
					'createdBy',
					'createdAt',
          'modifiedBy'
				]
			},
    	where:{
    		id: req.params.id
    	}
    });
		
    res.json(result);
  } catch(err) {
    res.json(err);
  };
};



exports.checkId = async (req, res) => {
  try{
    let result = await productCustom.findOne({
			attributes: [
				'id',
			],
    	where:{
    		userId			: req.body.userId,
				shape				: req.body.shape,
				brandName 	: req.body.brandName,
				productName	: req.body.productName,
				variantName	: req.body.variantName,
    	}
    });
    res.json(result);
  } catch(err) {
    res.json(err);
  };
};

// exports.test = async (req, res) => {
// 	try{
// 		res.json({ file : req.file });
// 	} catch(err) {
// 		res.send(err);
// 	}
// };