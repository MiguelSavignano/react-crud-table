import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import service from './services/cats.service'
import logo from './logo.svg';
import './App.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function onAfterSaveCell(row, cellName, cellValue) {
  console.log(row)
}

function onBeforeSaveCell(row, cellName, cellValue) {
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

class BlurToSaveTable extends React.Component {
  state = { resources: []}
  async componentDidMount() {
    const resources = await service.index()
    this.setState({ resources })
  }
  render() {
    const { resources } = this.state
    return (
      <BootstrapTable data={ resources } cellEdit={ cellEditProp }>
          <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='age'>Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default BlurToSaveTable
