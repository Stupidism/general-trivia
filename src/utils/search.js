const Crawler = require("crawler");

const crawler = new Crawler({
  maxConnections : 10,
});

function paramsToUrl(params) {
  return Object.keys(params)
    .filter(key => typeof params[key] !== 'undefined')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
.join('&');
}

const searchKeywords = (keywords) => new Promise((resolve, reject) => {
  crawler.queue({
    uri: `http://www.baidu.com/s?${paramsToUrl({ wd: keywords.join(' ') })}`,
    callback: function (error, page, done) {
      if(error){
        resolve();
      } else {
        var $ = page.$;
        const resultNumText = $('div.nums').text();
        const resultNum = resultNumText.replace(',', '').match(/\d+/g)[0];

        resolve({
          page,
          resultNum,
        });
      }
      done();
    }
  })
});

const search = async ({ statement, choices }) => {
  return {
    statement: await searchKeywords([statement]),
    statementAndChoice: await Promise.all(
      choices.map(choice => searchKeywords([statement, choice])),
    ),
  };
};

export default search;
