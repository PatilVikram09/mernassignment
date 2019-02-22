import React, { Component } from 'react';

export default class TableRow extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {  
      return (
        <tr>
          {Object.keys(this.props.rec[0]).map((r, i) =>
            r !== "_id" ? r !== "__v" ? r !== "password" ? <td>{this.props.row[r]}</td> : null : null : null
          )}
        </tr>
      );
    }
  }


