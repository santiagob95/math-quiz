const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');

require ('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB database connection established succesfully")
})


const usersRouter = require('./routes/users');

const quizQuestionsRouter = require('./routes/quizRoutes/questions');
const quizHighscoreRouter = require('./routes/quizRoutes/highscores');

const j2QuestionsRouter = require ('./routes/juego2Routes/j2Questions');
const j2Highscores = require ('./routes/juego2Routes/j2Highscores');

const j3QuestionsRouter = require('./routes/juego3Routes/j3Questions');
const j3Highscores = require('./routes/juego3Routes/j3Highscores');

app.use('/users',usersRouter);

app.use('/qquestions',quizQuestionsRouter);
app.use('/qhighscores',quizHighscoreRouter);

app.use('/j2questions',j2QuestionsRouter);
app.use('/j2highscores',j2Highscores);

app.use('/j3questions',j3QuestionsRouter);
app.use('/j3highscores',j3Highscores);

app.listen(port, () => {
    console.log (`Server is running on port : ${port}`);
})