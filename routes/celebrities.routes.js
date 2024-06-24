const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

// /celebrities/create GET route
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

// /celebrities/create POST route
router.post('/create', async (req, res) => {
    const { name, occupation, catchPhrase } = req.body;

    try {
        await Celebrity.create({ name, occupation, catchPhrase });
        res.redirect('/celebrities'); // このルートは次のイテレーションで作成します
    } catch (error) {
        res.render('celebrities/new-celebrity', { errorMessage: 'Error while creating the celebrity. Please try again.' });
    }
});

// /celebrities GET route
router.get('/', async (req, res) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', { celebrities });
    } catch (error) {
        console.log('Error while retrieving celebrities:', error);
        res.render('error', { errorMessage: 'Error while retrieving celebrities.' });
    }
});

module.exports = router;
