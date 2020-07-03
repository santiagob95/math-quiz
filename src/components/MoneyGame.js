import React from 'react'
import Button from './Button' 
import Button2 from './Button2'  

import './MoneyGame.css'
import axios from 'axios'
import uno from '../svg/uno.png'
import dos from '../svg/dos.png'
import cinco from '../svg/cinco.png'
import diez from '../svg/diez.png'
import veinte from '../svg/veinte.png'
import cincuenta from '../svg/cincuenta.png'
import cien from '../svg/cien.png'

import PopUp from './PopUp'
const billetes =[
    {id:0,value:1, img:uno},
    {id:1,value:2, img:dos},
    {id:2,value: 5, img:cinco},
    {id:3,value:10, img:diez},
    {id:4,value: 20, img:veinte},
    {id:5,value:50, img:cincuenta},
    {id:6,value: 100, img:cien}
]
const max =100, min =0;

const maxcount =1;

// Dificultades: 
//     Facil: Muestra la suma de billetes
//     Intermedio: No muestra la suma de billetes y no penaliza errores
//     Avanzado: No muestra la suma de billetes y hay penalización por respuestas incorrectas

export default class MoneyGame extends React.Component {
        constructor(props) {
          super(props);
        //const dif= props.dif;
          this.state = {
              counter:0,
              numero: Math.floor(Math.random() * (max - min) - min),
              sumaBilletes:0,
              cant:[0,0,0,0,0,0,0],
              correctasCounter:0,
              reintentos:0,
              username:this.props.username
          }
          this.handleBilleteSelected = this.handleBilleteSelected.bind(this);
          this.handleNumeroSuperado = this.handleNumeroSuperado.bind(this);
          this.calcularPuntos = this.calcularPuntos.bind(this)
          this.backToInit = this.backToInit.bind(this);
          this.pushPuntaje = this.pushPuntaje.bind(this);
          
        };
        render(){
            return (
                <div className="Contenedor">
                {this.state.counter<maxcount &&
                <div>
                    <div className='button' id='titulo'>
                        <p>Queremos comprar una bolsa de caramelos, pero cuesta ${this.state.numero}
                            ¿Cuántos billetes crees que necesitaremos?</p>
                    </div>
                    <div className='BotonesYHighscore'>
                        <div className='botonHolder'>
                            {billetes.map((item, index) => {
                                return (
                                    <Button 
                                    class='grid-item'
                                    id='Money'
                                    key={item.value}
                                    value={item.value}
                                    onClick={(e) => this.handleBilleteSelected(item)}
                                    >
                                    <img alt='' src={item.img} width='50%' />
                                    {" x"+this.state.cant[item.id]||'0'}
                                    </Button>  
                                    
                                )
                                })}
                            <Button id='Money' onClick={(e)=> this.handleSubmitBilletes(this.props)}> Listo!</Button>
                            <Button id='Money' onClick={(e)=>this.resetSuma()}>Borrar</Button>
                        </div>
                        <div>

                        {/* //highscore  */}
                        {this.props.dif==='Facil' &&  
                                <p className='button'>Llevas ${this.state.sumaBilletes}</p>}    
                        </div>
                    </div>
                </div>}
                {this.state.counter>=maxcount &&
                            <div>
                                {console.log(this.props.username)}
                                <div className='button'>Tenes {this.calcularPuntos()} puntos!
                                </div>
                                <PopUp className='button2' />  
                                <Button2 onClick={(e)=> this.resetGame()}>Volver a jugar</Button2>

                            </div>}
        </div>)

    }
    calcularPuntos(){
        console.log("user:"+this.props.username)
        let puntos = (this.state.correctasCounter - this.state.reintentos*0.25);
        if(this.props.dif==='Facil')
            puntos= puntos*100;
        if(this.props.dif==='Intermedio')
            puntos = puntos*200;
        else if(this.props.dif ==='Avanzado')
            puntos=puntos*300;
        this.pushPuntaje(puntos)
        return (puntos);
    }
    resetSuma(){
        console.log("borrado")
        this.setState({
            sumaBilletes:0,
            cant:[0,0,0,0,0,0,0],
            })   
    }
    resetGame(){
        this.backToInit();
        this.setState({
            counter:0,
            reintentos:0,
        })
    }
    backToInit(){
        this.setState({
            numero: Math.floor(Math.random() * (max - min) - min),
            sumaBilletes:0,
            cant:[0,0,0,0,0,0,0],
            counter:this.state.counter + 1
        })
    }

    handleBilleteSelected(props){
            let nuevaCant = this.state.cant; 
            nuevaCant[props.id]= nuevaCant[props.id] + 1;

            this.setState({
                sumaBilletes:this.state.sumaBilletes + props.value,
                cant:nuevaCant
            })
        }        

    
    handleSubmitBilletes(props){
        if (this.state.numero === this.state.sumaBilletes){
            this.backToInit();
            this.setState({
                correctasCounter: this.state.correctasCounter +1})
            alert("MUY BIEN! Adivinaste :D");         
        }
        else if (this.state.numero < this.state.sumaBilletes){
            if(props.dif==='Avanzado'){
                alert('Al piste perdiste. No es correcto ')
                this.setState({reintentos: this.state.reintentos + 1.25})
                this.backToInit();
            }
            else{
                this.resetSuma();
                this.setState({reintentos: this.state.reintentos + 1})
                alert("Te pasaste :( \n Intentalo otra vez!")
            }
        }
        else{
            if(props.dif==='Avanzado'){
                alert('Al piste perdiste. No es correcto ')
                this.setState({reintentos: this.state.reintentos + 1.25})
                this.backToInit();
            }
            else{
                alert("Te quedaste corto ;)")
                this.resetSuma();
                this.setState({
                    reintentos:this.state.reintentos + 1
                })
            }
        }
        
    }
    pushPuntaje(props){

        let config = {
          headers: {
            'Access-Control-Allow-Origin':'http://localhost:3000',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
          }
        }
        axios.post('http://localhost:5000/qhighscores/add',
        {
          username:this.state.username,
          score: props,
        },
        {config})
            .then(response => {
                  console.log("Success ========>", response);            
            })
            .catch(error => {
                  console.log("Error ========>", error);
            })
      }
    handleNumeroSuperado(){
        alert("superaste el numero! :(");
        this.backToInit();
    }
    
}
 
