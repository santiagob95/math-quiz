import React from 'react'
import Table from './Table'
const columnasNombre =  ['#','Puntos','Nombre'];
const contenido = [
    {score:1200, owner: 'santi'},
    {score:900, owner: 'clara'},
    {score:1500, owner: 'martin'},
    {score:500, owner: 'juan'},
    {score:300, owner: 'hernan'},
    {score:800, owner: 'tomas'},
    {score:1500, owner: 'pablo'},
    {score:1300, owner: 'maria'},
    
  ];

export default class HighscoreTable extends React.Component{
    render(){

        return ( 
            <div>
                <div align ='center'>
                    <Table  datos= {contenido}/>
                </div>
            </div>
        );
    }
}
