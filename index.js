const url = require('url');

const { checkUrl } = require('check-url');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const ALEXA_BASE_URLS = {
  category: 'http://www.alexa.com/topsites/category/Top/',
  country: 'http://www.alexa.com/topsites/countries/',
  global: 'http://www.alexa.com/topsites'
};

exports.byCategory = byCategory;
exports.byCountry = byCountry

module.exports = {
  byCategory,
  byCountry,
  global
};


function byCategory(category='News') {
  return _scraper(url.resolve(ALEXA_BASE_URLS.category, category), {category});
}

function byCountry(country='US') {
  return _scraper(url.resolve(ALEXA_BASE_URLS.country, country), {country});
}

function global() {
  return _scraper(ALEXA_BASE_URLS.global);
}

function _scraper(url, data={}) {
  return fetch(url, {method: 'GET'})
    .then((res) => res.text())
    .then((text) => cheerio.load(text))
    .then(($) => {
      const urls = $('li.site-listing p.desc-paragraph a')
        .map((idx, el) => $(el).text())
        .get();

      if (urls.length === 0) {
        // If we're seeing this, the user probably specified an invalid category URL (ie: "sports" instead of "Sports").
        throw new Error(`Unable to locate any top sites for ${categoryUrl}`);
      }

      return urls.map((url) => {
        url = url.toLowerCase();
        if (!(/https?:/).test(url)) {
          // Assume "http://" if no protocol found via alexa.com scraping.
          return `http://${url}`;
        }
        return url;
      });
    })
    .then((urls) => {
      return Object.assign(data, {url, sites: urls});
      // Do a quick link check of all the scraped URLs and try and get server response URLs.
      // return Promise.all(urls.map((url) => checkUrl(url)))
      //   .then((results) => Object.assign(data, {
      //     url,
      //     sites: results.map(({url}) => url)
      //   }));
    });
}
