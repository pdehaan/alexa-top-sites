const alexa = require('../index'); // alexa-top-sites

alexa.global()
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err));
