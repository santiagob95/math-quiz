const router = require('express').Router();
let User = require ('../quizModels/user.model');

//trae todos los usuarios
router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch (e => res.status(400).json('Error: ',e));
});

//Agrega un usuario con sus highscores
router.route('/add').post((req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    
    const newUser = new User ({username,password});
    newUser.save()
        .then(() => {
            res.json('User Added!');
        })
        .catch(e => res.status(400).json('Error: '+e));
});

//Trae un usuario que le pido
router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(user=> res.json(user))
        .catch(err => res.status(400).json('Error: ',err));

});

//------------------------------------------------------------------------------------------------------------
//Hay que poner en el body del post el juego en el que estas!!!! (0:quiz, 1:j2, 2:j3)
//Trae nombres de usuarios
router.route('/getnames').get((req,res) =>{
    User.find()
        .then(user => res.json(user.username))
        .catch (e => res.status(400).json('Error: ',e));
});


//updatea el highscore de un usuario
router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
    .then(user =>{
        user.highscores[req.body.highscores] = req.body.highscores;

        user.save()
            .then(()=> res.json('Highscore updated!'))
            .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});
module.exports = router;


// user.j2Highscore = req.body.j2Highscore;
//         user.j2LastScore = req.body.j2LastScore;