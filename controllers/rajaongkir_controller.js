const axios = require('axios');

axios.defaults.baseURL                      = process.env.SERVER_RAJAONGKIR_API;
axios.defaults.headers.common['key']        = process.env.SERVER_RAJAONGKIR_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

exports.printProvince = (req, res) => {
  axios.get('/province/')
    .then(response => {
      const result = response.data.rajaongkir.results
      res.json(result) 
    })
    .catch(err => console.log(err))
};

exports.showCity = (req, res) => {
  axios.get('/city?province=' + req.body.id)
    .then(response => {
      const result = response.data.rajaongkir.results
      res.json(result) 
    })
    .catch(err => console.log(err))
};

exports.setZip = (req, res) => {
  axios.get('/city?id=' + req.body.id)
    .then(response => {
      const result = response.data.rajaongkir.results;
      res.json(result);
    })
    .catch(err => console.log(err))
};

exports.showCost = (req, res) => {
  const destination = req.body.destination;
  let weight      = req.body.weight;
  Math.ceil(weight);
  if (weight < 1) {
    weight = 1;
  };

  console.log(weight);
  axios.post('/cost', {
    origin: '54',
    destination: destination,
    weight: weight,
    courier: 'jne'
  })
  .then(response => {
    const result = response.data.rajaongkir.results[0].costs[0].cost[0];
    console.log(result);
    res.json(result);
  })
  .catch(err => console.log(err))
}