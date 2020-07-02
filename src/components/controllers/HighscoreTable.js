import React from 'react'
import Table from '../Table'
import axios from 'axios'
// const contenido = [
//     {score:1200, owner: 'santi'},
//     {score:900, owner: 'clara'},
//     {score:1500, owner: 'martin'},
//     {score:500, owner: 'juan'},
//     {score:300, owner: 'hernan'},
//     {score:800, owner: 'tomas'},
//     {score:1500, owner: 'pablo'},
//     {score:1300, owner: 'maria'},
    
//   ];
export default class HighscoreTable extends React.Component{
    constructor(props) {
        super(props);
      //const dif= props.dif;
        this.state = {
            contenido:Array(Object),
        }
    }

    render(){

        return ( 
            <div>
                <div align ='center'>
                    <Table  datos= {this.state.contenido}/>
                </div>
            </div>
        );
    }
    componentDidMount(){
        let aux=[{}];
        axios.get('http://localhost:5000/qhighscores/')
        .then(response=> {
            response.data.map((item, index)  => {
                aux.push({
                    'owner':item.username,
                    'score':item.score
                })     
            })
            console.table(aux)
            this.setState({
                contenido:aux
            })
        })

    }

}