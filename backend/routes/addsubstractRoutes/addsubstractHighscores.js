const router = require('express').Router();
let Highscore = require ('../../addsubstractModel/highscore.model');

//Devuelve todo
router.route('/').get((req,res)=>{
    Highscore.find()
        .then(highscores => res.json(highscores))
        .catch (e => res.status(400).json('Error: '+e));
});

//Crea un highscore para el usuario que le pases, necesita su nombre, id y puntos que hizo
router.route('/add').post((req,res) =>{
    const username = req.body.username;
    const ownerID = req.body.ownerID;
    const score =req.body.score;

    const newHighscore = new Highscore ({ownerID,score,username});

    newHighscore.save()
        .then(() => res.json('Highscore Added!'))
        .catch(e => res.status(400).json('Error: '+e));
});

//Devuelve el puntaje del usuario que le pasas por id
router.route('/:id').get((req,res) => {
    Highscore.findOne({ownerID: req.params.id})
        .then(highscore=> res.json(highscore.score))
        .catch(err => res.status(400).json('Error: ' + err));

});

//busca un highscore hecho por el id de un usuario que le pasas en la url. Le pone el valor del score del body
router.route('/update/:id').post((req, res) =>{
    Highscore.findOne({ownerID: req.params.id})
        .then(highscore =>{
            console.log(req.params.id);
            console.log(highscore.id);
            highscore.score = req.body.score;

            highscore.save()
                .then(()=> res.json('Highscore updated!'))
                .catch(err => res.status(400).json('Error: '+err));

        })
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;