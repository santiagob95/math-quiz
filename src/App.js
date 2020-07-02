import React, { Component } from 'react';
import "simple.string.format";
import Quiz from './components/Quiz';
import Result from './components/Result';
import carpincho from './svg/carpinchoNerd.png'
import Button from './components/Button';
import './App.css';
import axios from 'axios'
import Header from './Header'
import MoneyGame from './components/MoneyGame';

//import {loginGrupos} from './controller/gameController.js';

const quizzes = [
  { id: 1, title: 'Facil' },
  { id: 2, title: 'Intermedio' },
  { id: 3, title: 'Avanzado' },
];

const games =[
  {id: 1, title: 'Quiz'},
  {id: 2, title: 'Juego 2'},
  {id: 3, title: 'Juego 3'},
]
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionNumber: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersQuantity: {},
      result: '',
      categorySelected:'',
      gameSelected:'',
      userId:'',
      username:'',
      pass:'',
      points: '',
      quizQuestions: '',
    };
    
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleGameSelected = this.handleGameSelected.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.backToInit= this.backToInit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePass = this.onChangePass.bind(this);

    this.currentPage = 'home';
    this.pages = this.generatePages();
    }
  
  generatePages(){
     return {
      'home': (
        <div className="App">
         <Header />
          <h1 className="titleWithEffect"> ¡Empecemos a Jugar!</h1>
          <form onSubmit={this.handleSubmit}  noValidate>
            <label>
            <input  type="text" 
                    required 
                    placeholder="Nombre"
                    name='name' 
                    value={this.state.username} 
                    onChange={this.onChangeUsername}
                     />
            </label>
            <label>
            <input  type="password" 
                    required 
                    placeholder="Contraseña"
                    name='pass' 
                    value={this.state.pass} 
                    onChange={this.onChangePass}
                     />
            </label>
            <Button onClick={this.handleSubmit} > Ingresar</Button>
          </form>
         
          <img src={carpincho} alt="" className="carpi" />
          
        </div>
      ),
      'gameSelection':(
        <div className='App'>
        <Header />
            <h1 className="titleWithEffect"> Elige Tu Juego</h1>
              {games.map((item, index) => {
                  return (
                    <Button 
                      key={item.id}
                      onClick={this.handleGameSelected}
                      id={item.id}
                      >
                      {item.title}
                    </Button>  
                  )
                })
              }
          <img src={carpincho} alt="" className="carpi" />
          </div>
      ),

      'levelSelection': (
        <div className="App">
          <Header />
          <div>
            <h1 className="titleWithEffect"> Elige Tu Nivel</h1>
              {quizzes.map((item, index) => {
                  return (
                    <Button 
                      key={item.id}
                      onClick={this.handleCategorySelected}
                      id={item.id}
                      >
                      {item.title}
                    </Button>  
                  )
                })
              }
          </div>
          <img src={carpincho} alt="" className="carpi" />
        </div>
      ),
      'juego2':(
        <div className="App">
        <Header />
        <MoneyGame
          dif= {this.state.categorySelected}
        />
        </div>
      ),
      'juego3':(
        <div className="App" >
          <Header />
          <p>Llegaste a Juego 3</p>
        </div>
      ),
      'quest':(
      <div className="App">
      <Header />
        {this.renderQuiz()}
        <img src={carpincho} alt="" className="carpi" />
    </div> ),
      'obtainResults': (
        <div className="App">
          <Header />         
          <center>{this.renderResult()}</center>
          <center>{this.calculatePoints}</center>
          <Button onClick={this.backToInit}>Volver A Jugar!</Button> 
          <img src={carpincho} alt="" className="carpi" />
          </div>          
          
      ),
    }
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value,
    });
  }

  onChangePass(e){
    this.setState({
      pass: e.target.value,
    });
  }


  componentDidMount() {
    axios.get('http://localhost:5000/qquestions/')
      .then(response => {
        const mixedAnswers = response.data.map(question =>
          this.mixQuestions(question.answers))
        this.setState({
          quizQuestions:response.data,
          question:response.data[0].question,
          answerOptions:mixedAnswers[0]
        });
      })

    //   const mixedAnswers = quizQuestions.map(question =>
    //     this.mixQuestions(question.answers)
    //   );
    //   this.setState({
    //     question: quizQuestions[0].question,
    //     answerOptions: mixedAnswers[0]
    //   });
    }
   

  mixQuestions(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionNumber < this.state.quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 500);
    } else {
      setTimeout(() => this.setResults(this.obtainResults()), 500);
      setTimeout(() => this.setPoints(this.calculatePoints()),500);
    }
    
  }

//     handleCategorySelected(event) {
//     this.setState({ categorySelected: quizzes[event.currentTarget.id-1].title }, () => 
//     console.log(this.state.categorySelected));
// }

handleGameSelected(event) {
  this.setState({gameSelected: games[event.currentTarget.id-1].title});
  this.currentPage='levelSelection';
}
  handleCategorySelected(event) {
    this.setState({categorySelected: quizzes[event.currentTarget.id-1].title});
    if(this.state.gameSelected === games[0].title){ //quiz
      this.currentPage='quest';
    }else if (this.state.gameSelected === games[1].title) { //Juego 2
      this.currentPage='juego2';
    }else if (this.state.gameSelected === games[2].title) { //Juego 3
      this.currentPage='juego3';
    }
    else {
      this.currentPage ='';
    }
  }


  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersQuantity: {
        ...state.answersQuantity,
        [answer]: (state.answersQuantity[answer] || 0) + 1
      },
      answer: answer,
     
      
    }));
    //console.log(answer);
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionNumber = this.state.questionNumber + 1;
    this.setState({
      counter: counter,
      questionNumber: questionNumber,
      question: this.state.quizQuestions[counter].question,
      answerOptions: this.state.quizQuestions[counter].answers,
      answer: '',
    });
  }
// ---------------------------------------------------------------------------------------------------------------
  calculatePoints(){
    let correctas =this.state.answersQuantity.correct?this.state.answersQuantity.correct:0;
    const difficulty = this.state.categorySelected;
    let multiplier = 0;
    if (difficulty === 'Intermedio'){
      multiplier=200;
    }else if (difficulty === 'Avanzado'){
      multiplier = 300;
    }else{
      multiplier =100;
    }
    return ("tu puntaje es: {0}".format(Number(correctas)*Number(multiplier)));
  }
  obtainResults() {
    const answersQuantity = this.state.answersQuantity;
    return ('Haz logrado responder {0} preguntas correctamente de {1}'.format( answersQuantity["correct"]?answersQuantity["correct"]:0, this.state.quizQuestions.length));
  }

  setPoints(points){
    this.setState({points : points})
  }
  setResults(result) {
    this.setState({ result: result })
}

  renderQuiz() {
    if (this.state.result){
      this.currentPage='obtainResults';
    }

    return (
      <div className="App">
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionNumber={this.state.questionNumber}
        question={this.state.question}
        questionTotal={this.state.quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
      </div>
    )
  }

  renderResult() {
    return <Result quizResult={this.state.result}  quizPoints={this.state.points}/>;
  }


  backToInit(event){
    this.currentPage='levelSelection';
    event.preventDefault();
    this.setState({counter: 0,
      questionNumber: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersQuantity: {},
      result: '',
      categorySelected:''});
    this.componentDidMount();
      /*,      username:''*/
  }
  handleSubmit(event){
    event.preventDefault();
    this.setState({username: this.state.username});
    this.setState({pass: this.state.pass});

    let config = {
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      }
    }

    //el prevent default no funca, no se porque. Pero con este if evitamos que avance, pero queda el boton apretado, bug?
     if(this.state.username !==''){

        console.log(this.state.username);
        console.log(this.state.pass);

        axios.post(
          'http://localhost:5000/users/add',
          {
              username:this.state.username,
              //password: this.state.password,
          },
          {config}
          ).then(response => {
              console.log("Success ========>", response);
              this.currentPage='gameSelection';
          })
          .catch(error => {
              console.log("Error ========>", error);
          })

    }
   
    };

  render() {
    this.pages = this.generatePages();
    return this.pages[this.currentPage];
  }


}

export default App;
