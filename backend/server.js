const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');   

const path = require('path');
require ('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//aplico cors
app.use(cors());
app.use(express.json());

//prueba comunicacioón con front con cors // matias
 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //verificar el numero de localhost, creo que el mio es 5000
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
     next();
 });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB database connection established succesfully")
})


const usersRouter = require('./routes/users');

const quizQuestionsRouter = require('./routes/quizRoutes/questions');
const quizHighscoreRouter = require('./routes/quizRoutes/highscores');
const quizQuestionsCompRouter = require('./routes/quizCompRoutes/questionsComp');


app.use('/users',usersRouter);

app.use('/qquestionsComp',quizQuestionsCompRouter)
app.use('/qquestions',quizQuestionsRouter);
app.use('/qhighscores',quizHighscoreRouter);

if (process.env.NODE_ENV ==='production'){
    app.use (express.static('build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname,'client','build','index.html')); 

    } );
}

app.listen(port, () => {
    console.log (`Server is running on port : ${port}`);
})