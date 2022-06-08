const product 						= require('../models').product;
const fs 									= require('fs');
const path 								= require('path');
const ipify								= require('ipify2');
const sharp 							= require('sharp');

exports.print = async (req, res) => {
  try{
    let result = await product.findAll({
    	attributes: {
				exclude: [
					'bestLength',
					'bestWidth',
					'mockupImgs',
					'designFiles',
					'tags',
					'description'
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
		let { name, shape, variant } = req.body;
		const mainImg = req.files['mainImg'][0].filename;
		const mockupImgs = req.files['mockupImgs'][0].filename;
		const designFiles = req.files['designFiles'][0].filename;

		const checkItem = await product.findOne({
			where:{
				shape: shape,
				name: name,
				variant: variant
			}
		});
	
		if (checkItem) {
			return res.status(400).send({
				msg: 'Identical product already exist'
			})
		};

  	let ip = await ipify.ipv4();
    await product.create({
    	shape: shape.toLowerCase(),
    	name: name.toLowerCase(),
			variant: variant.toLowerCase(),
			description: req.body.description,
			mainImg: mainImg,
			mockupImgs: mockupImgs,
			designFiles: designFiles,
			bestLength: parseInt(req.body.bestLength),
			bestWidth: parseInt(req.body.bestWidth),
			category: (req.body.category).toLowerCase(),
			tags: (req.body.tags).toLowerCase(),
			createdBy: ip,
			modifiedBy: ip
    });
		
		await sharp('./public/uploads/' + mainImg)
			.resize(300, 300)
			.toFile('./public/storage/products/previews/' + mainImg);
		await sharp('./public/uploads/' + mockupImgs)
			.resize(300, 300)
				.toFile('./public/storage/products/mockups/' + mockupImgs);
		await sharp('./public/uploads/' + designFiles)
			.toFile('./public/storage/products/design/' + designFiles);

		/*
		* Problem with FS
		* Working on it
		* Do not uncomment just yet!!!
		*/
		// fs.unlink('./public/uploads/' + mainImg, () => {
			// 	res.json({ file: './public/storage/products/' + mainImg })
		// });
		// fs.unlink('./public/uploads/' + mockupImgs, () => {
			// 	res.json({ file: './public/storage/products/' + mockupImgs })
			// });
			// fs.unlink('./public/uploads/' + designFiles, () => {
				// 	res.json({ file: './public/storage/products/' + designFiles })
				// });
				
		res.sendStatus(201);
	} catch(err) {
    res.status(400).send({ msg: err.message });
  };
};

exports.remove = async(req, res) => {
	await product.destroy({
		where:{
			id: req.params.id,
		}
	});;
	return res.sendStatus(200);
};

exports.edit = async(req, res) => {
	try{
		const { shape, name, variant } = req.body;
		const checkItem = await product.findOne({
			where:{
				shape: (req.body.shape).toLowerCase(),
				name: (req.body.name).toLowerCase(),
				variant: (req.body.variant).toLowerCase()
			}
		});
		console.log(req.body);
		if (checkItem && checkItem.id != req.body.id) {
			return res.status(400).send({
				msg: 'Identical product already exist'
			})
		};
		console.log('sampe sini');
		let ip = await ipify.ipv4()
		await product.update(
			{
				shape: shape.toLowerCase(),
				name: name.toLowerCase(),
				variant: variant.toLowerCase(),
				description: req.body.description,
				// mainImg: mainImg,
				// mockupImgs: mockupImgs,
				// designFiles: designFiles,
				bestLength: req.body.bestLength,
				bestWidth: req.body.bestWidth,
				category: (req.body.category).toLowerCase(),
				tags: (req.body.tags).toLowerCase(),
				modifiedBy: ip,
				updateAt: Date.now()
			}, {
				where:{
					id: req.params.id
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
    let result = await product.findOne({
			attributes: {
				exclude: [
					'createdBy',
					'createdAt'
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

// exports.test = async (req, res) => {
// 	try{
// 		res.json({ file : req.file });
// 	} catch(err) {
// 		res.send(err);
// 	}
// };