const express = require('express');
const morgan = require('morgan');

const app = express();

const apps = require('./apps-data.js')

app.use(morgan('common'));


// param: sort (rating or app, any other value results in an error, if no value do not sort)
// param: genres (one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'])

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query

    if (sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of the following: rating, app')
        }
    }

    if (genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genres must be one of the folling: Action, Puzzle, Strategy, Casual, Arcade, Card')
        }
    }

    let results = apps
        .filter(app =>
            app.Genres.includes(genres))

    if (sort) {
        results
            .sort((a, b) => {
                return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
            })
    }
    
    res
        .json(results)
});

module.exports = app