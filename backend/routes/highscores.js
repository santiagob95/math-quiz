const router = require('express').Router();
let Highscore = require ('../models/highscore.model');

router.route('/').get((req,res)=>{
    Highscore.find()
        .then(highscores => res.json(highscores))
        .catch (e => res.status(400).json('Error: ',e));
});

router.route('/add').post((req,res) =>{
    const owner = req.body.username;
    const score =req.body.highscore;

    const newHighscore = new Highscore ({owner,score});

    newHighscore.save()
        .then(() => res.json('Highscore Added!'))
        .catch(e => res.status(400).json('Error: '+e));
});

router.route('/:id').get((req,res) => {
    Highscore.findById(req.params.id)
        .then(highscore=> res.json(highscore))
        .catch(err => res.status(400).json('Error: ',err));

});

router.route('/update/:id').post((req, res) =>{
    Highscore.findById(req.params.id)
    .then(highscore =>{
        highscore.owner = req.body.username;
        highscore.score = req.body.highscore;

        highscore.save()
            .then(()=> res.json('Highscore updated!'))
            .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});
module.exports = router;