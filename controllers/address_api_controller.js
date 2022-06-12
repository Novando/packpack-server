const axios = require('axios');

axios.defaults.baseURL                      = process.env.SERVER_ADDRESS_API;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

exports.getProvinces = (req, res) => {
  axios.get('/provinsi')
    .then(response => {
      const result = response.data.rajaongkir.results
      res.json(result) 
    })
    .catch(err => console.log(err))
};

exports.getCitiesByProvince = (req, res) => {
  axios.get('/kota?id_provinsi=' + req.body.id)
    .then(response => {
      const result = response.data.rajaongkir.results
      res.json(result) 
    })
    .catch(err => console.log(err))
};

exports.getDistrictsbyCity = (req, res) => {
  axios.get('/kecamatan?id_kota=' + req.body.id)
    .then(response => {
      const result = response.data.rajaongkir.results;
      res.json(result);
    })
    .catch(err => console.log(err))
};

exports.getWardsByDistrict = (req, res) => {
  axios.get('/kelurahan?id_kecamatan=' + req.body.id)
    .then(response => {
      const result = response.data.rajaongkir.results;
      res.json(result);
    })
    .catch(err => console.log(err))
};