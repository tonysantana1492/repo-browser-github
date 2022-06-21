import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./TableReact.module.css";
import Item from "./Item";

const sortByType = (rows, ascending) => {
  return rows.sort((rowA, rowB)=>{
      if(ascending){
        return rowA.type > rowB.type ? 1 : -1;
      }else{
        return rowA.type < rowB.type ? 1 : -1;
      }
  });
};

/*const sortByName = (rows, ascending) => {
  return rows.sort((rowA, rowB)=>{
      if(ascending){
        return rowA.name > rowB.name ? 1 : -1;
      }else{
        return rowA.name < rowB.name ? 1 : -1;
      }
  });
};*/

const TableReact = (props) => {

  const rows = props.items;
  const rowsSorters = sortByType(rows, true);

  return (
    <Paper>
      <Table>
        <TableHead className={classes.header}>
          <TableRow>           
            <TableCell>Nombre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsSorters.map((row) => (
            <TableRow key={Math.random()}>              
              <TableCell component="th" scope="row">
                <Item 
                  name={row.name}
                  url={row.url}
                  type={row.type}
                />
              </TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableReact;
