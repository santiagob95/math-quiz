const router = require('express').Router();
let User = require ('../models/user.model');

router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch (e => res.status(400).json('Error: ',e));
});

router.route('/add').post((req,res) =>{
    const username = req.body.username;
    const highscore =0;
    const lastScore =0;

    const newUser = new User ({username,highscore,lastScore});

    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(e => res.status(400).json('Error: '+e));
});


router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(user=> res.json(user))
        .catch(err => res.status(400).json('Error: ',err));

});

//------------------------------------------------------------------------------------------------------------
router.route('/getnames').get((req,res) =>{
    User.find()
        .then(user => res.json(user.username))
        .catch (e => res.status(400).json('Error: ',e));
});


router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
    .then(user =>{
        //user.username = req.body.username;
        user.highscore = req.body.highscore;
        user.lastScore = req.body.lastScore;

        user.save()
            .then(()=> res.json('Highscore updated!'))
            .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});
module.exports = router;
