import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    color: 'blue',
    maxWidth:'100%',
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


export default function SimpleTable(props) {
  const classes = useStyles();
  const datos = props.datos.sort((a, b) => Number(b.score) - Number(a.score));
  console.table(datos);
  return (
    <TableContainer className={classes.table} align='center' id='button' component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>#</TableCell> */}
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((item,index) => (
            <TableRow key={index.Number}>
              {/* <TableCell align="center">{item.index}</TableCell> */}
              <TableCell align="center">{item.owner}</TableCell>
              <TableCell align="center">{item.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}