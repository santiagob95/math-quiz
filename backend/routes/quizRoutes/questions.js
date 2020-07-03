const router = require('express').Router();
let Question = require ('../../quizModels/questions.model');


//obtengo preguntas de dificultad pasada por parametro
router.route('/:dificultad').get((req,res)=>{
    Question.find({dif: Number(req.params.dificultad)})
        .then(questions => res.json(questions))
        .catch (e => res.status(400).json('Error: ',e));
});


// quizas hay que sacar esta ruta, nadie deberia poder agregar preguntas desde la pagina, no?

router.route('/add').post((req,res) =>{
    const question = req.body.question;
    const answers  = req.body.answers;
    const dif = req.body.dif;
    const newQuestion = new Question ({
        question,
        dif,
        answers,
    });

    newQuestion.save()
        .then(() => res.json('Question Added!'))
        .catch(e => res.status(400).json('Error: '+e));
});

module.exports = router;