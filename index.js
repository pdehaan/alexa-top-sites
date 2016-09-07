const urlResolve = require('url').resolve;

// const { checkUrl } = require('check-url');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const BASE_URL = 'http://www.alexa.com/topsites';
const ALEXA_BASE_URLS = {
  category: `${BASE_URL}/category/Top/`,
  country: `${BASE_URL}/countries/`,
  global: BASE_URL
};

module.exports = {
  byCategory: (category='News') => _scraper(urlResolve(ALEXA_BASE_URLS.category, category), {category}),
  byCountry: (country='US') => _scraper(urlResolve(ALEXA_BASE_URLS.country, country), {country}),
  global: () => _scraper(ALEXA_BASE_URLS.global)
};

function _scraper(url, data={}) {
  return fetch(url, {method: 'GET'})
    .then((res) => res.text())
    .then((text) => cheerio.load(text))
    .then(($) => {
      const urls = $('li.site-listing p.desc-paragraph a')
        .map((idx, el) => $(el).text())
        .get();
      return urls;
    })
    .then((urls) => {
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
