import React, { Component } from 'react';
import "simple.string.format";
import quizQuestions from './questions/allQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/carpincho.png';
import carpincho from './svg/carpinchoNerd.png'
import Button from './components/Button';
import './App.css';
import axios from 'axios'


const quizzes = [
  { id: 1, title: 'Elemental' },
  { id: 2, title: 'Intermedio' },
  { id: 3, title: 'Avanzado' },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersQuantity: {},
      result: '',
      categorySelected:'',
      username:'',
      points: '',
    };
    
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.backToInit= this.backToInit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.currentPage = 'home';
    this.pages = this.generatePages();
    
  
  }
  
  generatePages(){
     return {
      'home': (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {/*eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <h1>➕➖Math Quiz➖➕</h1>
          </div>
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
            <input  type="submit" value="Ingresar!" className="button" />
            <Button onClick={this.handleSubmit} > Ingresar</Button>
          </form>
         
          <img src={carpincho} alt="" className="carpi" />
          
        </div>
      ),
      'levelSelection': (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
           {/*eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <h1> ➕➖Math Quiz➖➕</h1>
            

          </div>
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
      'quest':(
      <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <h1>➕➖Math Quiz➖➕</h1>
      </div>
      
        {this.renderQuiz()}
        <img src={carpincho} alt="" className="carpi" />
    </div> ),
      'obtainResults': (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {/*eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <h1>➕➖Math Quiz➖➕</h1>
          </div>
          
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


  componentDidMount() {

    
    const mixedAnswers = quizQuestions.map(question =>
      this.mixQuestions(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: mixedAnswers[0]
    });
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
    if (this.state.questionId < quizQuestions.length) {
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

  handleCategorySelected(event) {
    this.setState({categorySelected: quizzes[event.currentTarget.id-1].title});
    this.currentPage='quest';
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
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: '',
    });
  }

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
    return ('Haz logrado responder {0} preguntas correctamente de {1}'.format( answersQuantity["correct"]?answersQuantity["correct"]:0, quizQuestions.length));
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
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
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
      questionId: 1,
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
    
    axios.post('http://localhost:5000/users/add',this.state.username)
    .then(res => console.log(res.data));
    this.currentPage='levelSelection';

    };

  render() {
    this.pages = this.generatePages();
    return this.pages[this.currentPage];
  }


}

export default App;
