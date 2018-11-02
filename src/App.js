import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import service from './services/cats.service'
import logo from './logo.svg';
import './App.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function onAfterSaveCell(row, cellName, cellValue) {
  service.update(row)
}

function onBeforeSaveCell(row, cellName, cellValue) {
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}

function onAfterInsertRow(row) {
  service.create(row)
}

function onAfterDeleteRow(rowKeys) {
  const [key] = rowKeys
  service.destroy(key)
}

// const onAutovalue = (value) => {
//   return 99
// }


const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

const selectRow = {
  mode: 'radio'
};

const options = {
  saveText: 'Custom Save Text',
  afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
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
      <BootstrapTable data={ resources } search insertRow={ true } deleteRow={ true } selectRow={ selectRow } cellEdit={ cellEditProp } options={ options }>
          <TableHeaderColumn width='10%' dataField='id' isKey={ true } autoValue>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='age' dataSort>Age</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default BlurToSaveTable
