# alexa-top-sites

Scrape Alexa "Top" pages for some popular sites for URL testing.

## Why?

Because you want to test some top sites, and don't want to go through an API because you only need a few URLs.

**NOTE:** At most, this API will probably only return 25 results, which seems to be the default page size of Alexa pages.

I wouldn't recommend using this garbage API for anything serious (like production sites) since it could easily break if Alexa ever changes their HTML/CSS. You're much better off using their APIs directly. I quickly built this :poop: for testing.

## Installation:

```sh
$ npm i pdehaan/alexa-top-sites -S
```

## Usage:

### By Categories:

Note that the category name is very case specific. You should probably browse the Alexa site and find the specific URL you want and use that: http://www.alexa.com/topsites/category/Top/Sports.

```js
const { byCategory } = require('alexa-top-sites');

byCategory('Sports')
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err.message));
```

<details>
<summary>OUTPUT:</summary>
```json
{
  "category": "Sports",
  "url": "http://www.alexa.com/topsites/category/Top/Sports",
  "sites": [
    "http://sports.yahoo.com",
    "http://www.nbcolympics.com/",
    "http://www.espncricinfo.com/",
    "http://www.goal.com/",
    "http://www.nfl.com/",
    "http://www.cbssports.com/",
    "http://bleacherreport.com",
    "https://www.premierleague.com/",
    "http://www.espn.com/",
    "http://football.fantasysports.yahoo.com",
    "http://www.livescore.com/",
    "http://www.skysports.com/",
    "http://www.cricbuzz.com/",
    "http://deadspin.com",
    "https://www.strava.com/",
    "http://mlb.mlb.com/home",
    "http://www.nbcsports.com/",
    "http://www.bbc.com/sport/olympics",
    "http://www.sbnation.com/",
    "http://www.foxsports.com/",
    "https://www.rei.com/",
    "http://www.skysports.com/football",
    "http://baseball.fantasysports.yahoo.com",
    "http://www.flashscore.com/",
    "http://www.si.com/"
  ]
}
```
</details>

### By Countries:

```js
const { byCountry } = require('alexa-top-sites');

byCountry('CA') // Canada
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err));
```

<details>
<summary>Output:</summary>
```json
{
  "country": "CA",
  "url": "http://www.alexa.com/topsites/countries/CA",
  "sites": [
    "http://google.ca",
    "http://youtube.com",
    "http://facebook.com",
    "http://google.com",
    "http://yahoo.com",
    "http://live.com",
    "http://msn.com",
    "http://wikipedia.org",
    "http://amazon.ca",
    "http://kijiji.ca",
    "http://bing.com",
    "http://twitter.com",
    "http://reddit.com",
    "http://netflix.com",
    "http://cbc.ca",
    "http://amazon.com",
    "http://linkedin.com",
    "http://royalbank.com",
    "http://instagram.com",
    "http://diply.com",
    "http://td.com",
    "http://pinterest.com",
    "http://imgur.com",
    "http://ebay.ca",
    "http://tumblr.com"
  ]
}
```
</details>

### Global:

```js
const alexa = require('alexa-top-sites');

alexa.global()
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err));
```

<details>
<summary>Output:</summary>
```json
{
  "url": "http://www.alexa.com/topsites",
  "sites": [
    "http://google.com",
    "http://youtube.com",
    "http://facebook.com",
    "http://baidu.com",
    "http://yahoo.com",
    "http://amazon.com",
    "http://wikipedia.org",
    "http://qq.com",
    "http://google.co.in",
    "http://twitter.com",
    "http://live.com",
    "http://taobao.com",
    "http://google.co.jp",
    "http://bing.com",
    "http://weibo.com",
    "http://instagram.com",
    "http://sina.com.cn",
    "http://vk.com",
    "http://yahoo.co.jp",
    "http://msn.com",
    "http://linkedin.com",
    "http://yandex.ru",
    "http://google.de",
    "http://hao123.com",
    "http://google.co.uk"
  ]
}
```
</details>
