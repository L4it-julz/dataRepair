import React, {useState} from 'react';
import './App.css';
import Content from './components/Content';

import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextArea from './components/UI/TextArea';

function App() {
  const [query, setQuery] = useState('');
  const [datalist, setDatalist] = useState('');

  const [tableHeader, setTableHeader] = useState('');
  const [tableField, setTableField] = useState('');
  const [rows, setRows] = useState('');
  const [qryInsert, setQryInsert] = useState('')
  const [dataObject, setDataObject] = useState('');

  const [enteredValue, setEnteredValue] = useState('')

  const changeHandle = (e) => {
    setQuery(e.target.value)
    return query;
  }

  const converted = () => {
    let list = query.split('\n').filter(n => n)
   
    let removeValue = list[0].split(' values (')
    setQryInsert(removeValue[0])
    
    // let cleanValue = removeValue[1].map( n => n.trim().split(');').join(''))
    // console.log('data1', removeValue[1].trim().split(');').join(''))
    let remove1 = removeValue[0].split(' ')
    let remove2 = remove1[2].split('(')
    let getTable = remove2[0]

    let remove3 = remove2[1].split(')')
    let getHeader = remove3[0].split(',')
    let remove4 = removeValue[1].split(')')
    let getRowValue = remove4[0].split(',')

    let tableName = getTable.trim().split('`').join('')
    let fieldName = getHeader.map( n => n.trim().split('`').join(''))
    let rowsData =  getRowValue.map( n => n.trim().split("'").join(''))

    setTableHeader(tableName);
    setTableField(fieldName);

    let gettingDataRow = list.map(lt => lt.split(' values ('))
    let reomoveQRow = gettingDataRow.map(m => m[1].trim().split("'").join())
    let removeSemiColon = reomoveQRow.map(m => m.trim().split(");").join(''))
    console.log('data1', )
    let reomoveCommaRow = gettingDataRow.map(m => m[1].replace(`);`,'').split(','))

    // setRows(rowsData);

    // let try1 = rows && rows.map(n => parseInt(n[0].trim().split("'").join('')))
    let x = parseInt(enteredValue)
    let try1 = rows && rows.map(n => {
      n[0] = x
      x = x + 1
      return n[0]
    })

    let try2 = reomoveCommaRow && reomoveCommaRow.map( (n, index) => n[0] = try1 ? try1[index].toString().padStart(10, "0") : 0)
    let highestToLowest = reomoveCommaRow.sort((a, b) => b[0]-a[0]);
    setRows(highestToLowest);

    console.log('data2', qryInsert)
  }
 
  const makeText = () => {
    let textFormat = qryInsert + " values (" + rows.map( n => "'" + n + "'" + ",") + ");"
    console.log('textformat:', textFormat)
  }

  return (
    <div className="App">
       <h1>Data Repair</h1>
     <h2>Insert the Query Code:</h2>
     <TextArea value={query} onChange={changeHandle}/>
     <div>
       <label>Reference No:</label>
      <input type="text" value={enteredValue} onChange={e => setEnteredValue(e.target.value)} />
        <button onClick={converted}>convert now!</button>
        <button onClick={makeText}>convert to text!</button>
     </div>
     <div>
       <header>
         Table Name: {tableHeader}
       </header>
     </div>
    <div style={{
      width: 500,
      height: 200
    }}>
    <Table striped bordered hover>
          <thead>
              <tr>
                {tableField && tableField.map(n => <th>{n}</th>)}
              </tr>
          </thead>
          <tbody>
             
                {rows && rows.map(n =>  
                <tr key={Math.random()}>
                  {n.map( item => <td>{item}</td>)}
                  </tr>
                  )}
              
          </tbody>
        </Table>
    </div>
  </div>
  );
}

export default App;
