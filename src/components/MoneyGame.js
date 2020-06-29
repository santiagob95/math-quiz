import React from 'react'
import Button from './Button'

import './MoneyGame.css'

import uno from '../svg/uno.png'
import dos from '../svg/dos.png'
import cinco from '../svg/cinco.png'
import diez from '../svg/diez.png'
import veinte from '../svg/veinte.png'
import cincuenta from '../svg/cincuenta.png'
import cien from '../svg/cien.png'

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


export default class MoneyGame extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
              numero: Math.floor(Math.random() * (max - min) - min),
              sumaBilletes:0,
              cant:[0,0,0,0,0,0,0],
          }
          this.handleBilleteSelected = this.handleBilleteSelected.bind(this);
          this.handleNumeroSuperado = this.handleNumeroSuperado.bind(this);
          this.backToInit = this.backToInit.bind(this);
          
        };
        render(){
            return (
                <div >
                    <h1> Tu dinero a matchear es: ${this.state.numero}</h1>
                    <div className='botonHolder' id='block1'>
                    {billetes.map((item, index) => {
                        return (
                            <Button 
                            id='Money'
                            key={item.value}
                            value={item.value}
                            onClick={(e) => this.handleBilleteSelected(item)}
                            >
                            <img alt='' src={item.img} width='50%' />
                            x{this.state.cant[item.id]||'0'}
                            </Button>  
                            
                        )
                        })
                    }
                    <Button id='Money' onClick={(e)=> this.handleSubmitBilletes()}> Listo!</Button>
                    <Button id='Money' onClick={(e)=>this.resetSuma()}>Borrar</Button>
                    </div>
                    
                </div>
        )
    }
    resetSuma(){
        console.log("borrado")
        this.setState({
            sumaBilletes:0,
            cant:[0,0,0,0,0,0,0],
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

    
    handleSubmitBilletes(){
        console.log("listo!")
        if (this.state.numero === this.state.sumaBilletes){
            this.backToInit();
            alert("GANASTE!");         
        }
        else if (this.state.numero < this.state.sumaBilletes){
            this.resetSuma();
            alert("Te pasaste :( \n Intentalo otra vez!")
        }
        else{
            alert("Te quedaste corto ;)")
        }
        
    }
    handleNumeroSuperado(){
        alert("superaste el numero! :(");
        this.backToInit();
    }
    backToInit(){
        this.setState({
            numero: Math.floor(Math.random() * (max - min) - min),
            sumaBilletes:0,
            cant:[0,0,0,0,0,0,0],
        })
    }
}
 