const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require('request');

const options = {
    uri: `https://www.packtpub.com/packt/offers/free-learning`,
    transform: function (body) {
        return cheerio.load(body);
    }
};

exports.todays_book = (req, res) => {
    rp(options)
        .then(($) => {
            const todaysBook = $('.dotd-title').text().trim();
            const bookImg = 'https:' + $('.dotd-main-book-image>a>.bookimage').attr('data-original');
            const message = {
                "attachments": [
                {
                    "fallback": todaysBook,
                    "color": "#36a64f",
                    "author_name": "Pakt Book of the Day",
                    "title": todaysBook,
                    "title_link": "https://www.packtpub.com/packt/offers/free-learning",
                    "image_url": bookImg,
                }]
            }
            request.post({
                headers: {'content-type' : 'application/json'},
                url: process.env.LEARNING_MATERIAL_WEBHOOK,
                body: JSON.stringify(message)
            })

        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};