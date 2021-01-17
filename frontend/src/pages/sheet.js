import React, { useState, useEffect } from 'react';
import '../App.css';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        grid: [
          [
            { readOnly: true, value: '' , width:200},
            { value: 'director', readOnly: true, width:300, colSpan:2 },
            { value: 'groupA', readOnly: true, width:300, colSpan:2 },
            { value: 'groupB', readOnly: true, width:300, colSpan:2 },
          ],
          [
            { readOnly: true, value: 'time slot'},
            { value: 'job', readOnly: true, width:150},
            { value: 'member', readOnly: true, width:150},
            { value: 'job', readOnly: true, width:150},
            { value: 'member', readOnly: true, width:150},
            { value: 'job', readOnly: true, width:150},
            { value: 'member', readOnly: true, width:150},
          ],
          [
            { value: "8:00~10:00" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
          ],
          [
            { value: "10:00~12:00" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
          ],
          [
            { value: "13:00~15:00" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
          ],
          [
            { value: "15:00~17:00" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
          ],
        ],
      };
    }
  render() {
    const newclass = []
    for (const g of this.props.groups){ 
        if(!newclass.includes(g.label.split(" ")[0])){
            newclass.push(g.label.split(" ")[0])
        }
    }
    
    return (
      <ReactDataSheet
        data={this.state.grid}
        valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          const grid = this.state.grid.map(row => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
          });
          this.setState({ grid });
        }}
      />
    );
  }
}
export default Sheet;