const { byCategory } = require('./index'); // alexa-top-sites

byCategory('Sports')
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err.message));
