import React, { Component } from 'react';
import "simple.string.format";
import Quiz from './components/Quiz';
import Result from './components/Result';
import carpincho from './svg/carpinchoNerd.png'
import Button from './components/Button';
import Button2 from './components/Button2';
import './App.css';
import axios from 'axios'
import Header from './Header'
import MoneyGame from './components/MoneyGame';
import PopUp from './components/PopUp'

//import {loginGrupos} from './controller/gameController.js';

const quizzes = [
  { id: 1, title: 'Facil' },
  { id: 2, title: 'Intermedio' },
  { id: 3, title: 'Avanzado' },
];

const games =[
  {id: 1, title: 'Quiz'},
  {id: 2, title: 'Cuenta Billetes'},
  {id: 3, title: 'Comparar Numeros'},
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
    this.handleAnswerSelectedComp = this.handleAnswerSelectedComp.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleGameSelected = this.handleGameSelected.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleSubmitRegistro=this.handleSubmitRegistro.bind(this);
    this.backToInit= this.backToInit.bind(this);
    this.backToHome= this.backToHome.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.pushResultados =this.pushResultados.bind(this);

    this.currentPage = 'home'; //Cuenta Billetes
    this.pages = this.generatePages();
    }
  generatePages(){
     return {
      'home': (
        <div className="App" type='hidden'  >
         <Header />
          <h1 className="titleWithEffect"> ¡Empecemos a Jugar!</h1>
          <form>
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
            <Button onClick={this.handleSubmit}> Ingresar</Button>
            <Button onClick={this.handleSubmitRegistro}> Registrarse</Button>
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
          <div><Button2 onClick={this.backToHome}>Salir</Button2> </div>
          <h1> </h1>
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
          <div><Button2 onClick={this.backToInit}>Volver</Button2> </div>
          <h1> </h1>
        </div>
      ),
      'Cuenta Billetes':(
        <div className="App">
        <Header />
        <MoneyGame
          dif= {this.state.categorySelected}
          username={this.state.username}
        />
        <div><Button2 onClick={this.backToInit}>Volver</Button2> </div>
          <h1> </h1>
        </div>
      ),
      'Comparar Numeros':(
        <div className="App" >
          <Header />
          {this.renderQuizComp()}
        <img src={carpincho} alt="" className="carpi" />
        <div><Button2 onClick={this.backToInit}>Volver</Button2> </div>
          <h1> </h1>
        </div>
      ),
      'quest':(
      <div className="App">
      <Header />
        {this.renderQuiz()}
        <img src={carpincho} alt="" className="carpi" />
        <div><Button2 onClick={this.backToInit}>Volver</Button2> </div>
          <h1> </h1>
    </div> ),
      'obtainResults': (
        <div className="App">
          <Header />   
               
          <center>{this.renderResult()}</center>
          <center>{this.calculatePoints}</center> 
          
          <Button onClick={this.backToInit}>Volver A Jugar!</Button> 
          <PopUp/>
          
          <img src={carpincho} alt="" className="carpi" />
          </div>          
          
      ),
    }
  }
  
  pushResultados(){
    console.log("LLEGUE")
    let config = {
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      }
    }
    console.log(this.state.username,this.state.points)
    axios.post('http://localhost:5000/qhighscores/add',
    {
      username: this.state.username,
      score: this.state.points,
    },
    {config})
        .then(response => {
              console.log("Success ========>", response);            
        })
        .catch(error => {
              console.log("Error ========>", error);
        })
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

  getQuestions(props) {
    console.log('component did mount')
    let url = 'http://localhost:5000/qquestions/';
    if (props === 2) {
      url = url + '3'
    }
    else if (props === 1) {
      url = url + '2'
    }
    else {
      url = url + '1'
    }
    console.log('url: ' + url)
    axios.get(url)
      .then(response => {
        const mixedAnswers = response.data.map(question =>
          this.mixQuestions(question.answers))
        this.setState({
          quizQuestions: response.data,
          question: response.data[0].question,
          answerOptions: mixedAnswers[0]
        });
      })

  }
  getQuestionsComp(props) {
    console.log('component did mount')
    let url = 'http://localhost:5000/qquestionsComp/';
    if (props === 2) {
      url = url + '3'
    }
    else if (props === 1) {
      url = url + '2'
    }
    else {
      url = url + '1'
    }
    console.log('url: ' + url)
    axios.get(url)
      .then(response => {
        const mixedAnswers = response.data.map(question =>
          this.mixQuestions(question.answers))
        this.setState({
          quizQuestions: response.data,
          question: response.data[0].question,
          answerOptions: mixedAnswers[0]
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

  handleAnswerSelectedComp(event) {
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
    this.setState({ categorySelected: quizzes[event.currentTarget.id - 1].title });
    if (this.state.gameSelected === games[0].title) {
      this.getQuestions(event.currentTarget.id - 1)
    } else if (this.state.gameSelected === games[2].title) {
      this.getQuestionsComp(event.currentTarget.id - 1);
    }

    if (this.state.gameSelected === games[0].title) { //quiz
      this.currentPage = 'quest';
    } else if (this.state.gameSelected === games[1].title) { //Juego 2
      this.currentPage = 'Cuenta Billetes';
    } else if (this.state.gameSelected === games[2].title) { //Juego 3
      this.currentPage = 'Comparar Numeros';
    }
    else {
      this.currentPage = '';
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
    return (Number(correctas)*Number(multiplier));
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
      this.pushResultados();
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

  renderQuizComp() {
    if (this.state.result){
      this.pushResultados();
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
        onAnswerSelected={this.handleAnswerSelectedComp}
      />
      </div>
    )
  }


  renderResult() {
    return <Result quizResult={this.state.result}  quizPoints={this.state.points}/>;
  }


  backToInit(event){
    this.currentPage='gameSelection';
    // event.preventDefault();
    this.setState({counter: 0,
      questionNumber: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersQuantity: {},
      result: '',
      categorySelected:''});
   
      /*,      username:''*/
  }

  backToHome(event) {
    this.currentPage = 'home';
    event.preventDefault();
    this.setState({
      counter: 0,
      questionId: 1,
      question: ' ',
      answerOptions: [],
      answer: '',
      answersQuantity: {},
      gameSelected: "Ninguno",

      result: '',
      categorySelected: '',
      nameUser: ''
    });



  }

  handleSubmitRegistro(event){
    event.preventDefault();
    let url='http://localhost:5000/users/registrar'
    let config = {
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      }
    }
     if(this.state.username !==''){

        console.log(this.state.username);
        console.log(this.state.pass);
        axios.post(url,
          {
              username:this.state.username,
              password:this.state.pass
              //password: this.state.password,
          },
          {config}
          ).then(response => {
              console.log("Success ========>", response);
              this.setState({username: this.state.username});
              this.setState({pass: this.state.pass});
              alert('Te registraste correctamente, ahora podes iniciar tu sesion')
              // this.currentPage='gameSelection'    
                    
          })
          .catch(error => {
            alert("ese usuario ya esta tomado :( proba con otro")
              console.log("Error ========>", error);
          })
    }
   
    };
    //login
  handleSubmit(event){
    event.preventDefault();
    let url='http://localhost:5000/users/login';
    let config = {
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      }
    }
     if(this.state.username !==''){

        console.log(this.state.username);
        //console.log(this.state.pass);
        axios.post(url,
          {
              username:this.state.username,
              password:this.state.pass
              //password: this.state.password,
          },
          {config}
          ).then(response => {
            this.setState({username: this.state.username});
            this.setState({pass: this.state.pass});
           alert("inicio de sesion correcto. ¡A JUGAR!")
           this.backToInit()
            
            console.log(this.currentPage)              
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