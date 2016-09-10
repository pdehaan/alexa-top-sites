const { byCountry } = require('../index'); // alexa-top-sites

byCountry('CA') // Canada
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err));
