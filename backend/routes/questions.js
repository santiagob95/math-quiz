const router = require('express').Router();
let Question = require ('../models/questions.model');

router.route('/').get((req,res)=>{
    Question.find()
        .then(questions => res.json(questions))
        .catch (e => res.status(400).json('Error: ',e));
});

router.route('/add').post((req,res) =>{
    const question = req.body.question;
    const answers  = req.body.answers;

    const newQuestion = new Question ({
        question,
        answers,
    });

    newQuestion.save()
        .then(() => res.json('Question Added!'))
        .catch(e => res.status(400).json('Error: '+e));
});

module.exports = router;