const urlResolve = require('url').resolve;

// const { checkUrl } = require('check-url');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const ALEXA_BASE_URL = 'http://www.alexa.com/topsites';

module.exports = {
  byCategory: (category='News', page=0) => _scraper(urlResolve(`${ALEXA_BASE_URL}/category;${page}/Top/`, category), {category}),
  byCountry: (country='US', page=0) => _scraper(urlResolve(`${ALEXA_BASE_URL}/countries;${page}/`, country), {country}),
  getPages,
  global: () => _scraper(ALEXA_BASE_URL)
};

function getPages(fn, value, numPages=1) {
  const promises = Array.from(Array(numPages), (_, page) => fn(value, page));
  return Promise.all(promises)
    .then((pages) => pages.reduce((prev, curr) => prev.concat(curr.sites), []));
}

function _scraper(url, data={}) {
  return fetch(url, {method: 'GET'})
    .then((res) => res.text())
    .then((text) => cheerio.load(text))
    .then(($) => {
      const urls = $('.DescriptionCell p a')
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
