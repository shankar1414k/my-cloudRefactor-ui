import React, { Component } from 'react';
import axios from 'axios';

//ag-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-bootstrap.css';
import records from '../users.json'

export class ViewRecords extends Component {


    constructor() {
        super();
        this.state = {
            data: '',
            error: '',
            columnDefs: [],
            rowData: [],
            style: {
                width: '100%',
                height: '600px'

            },
        }
        this.autoSizeAll = this.autoSizeAll.bind(this);
    }


    componentDidMount() {
        this.buildColumnHeader();
        this.getData();
        

    }


    getData = () => {

        this.setState({ rowData: records })

        // axios.get("/entries").then( dataFromService => {
        //     this.setState({rowData : dataFromService.data});
        // }).catch(serviceError => {
        //     this.setState({error: serviceError});
        // });

    }
    buildColumnHeader() {
        let columnHeader = [];
        columnHeader.push({ headerName: "ID", field: "applicationId", sortable: true, filter: true });
        columnHeader.push({ headerName: "First Name", field: "firstName", sortable: true, filter: true });
        columnHeader.push({ headerName: "Last Name", field: "lastName", sortable: true, filter: true });
        columnHeader.push({ headerName: "smallSoc", field: "smallSoc", sortable: true, filter: true });
        columnHeader.push({ headerName: "D.O.B", field: "dob", sortable: true, filter: true });
        columnHeader.push({ headerName: "Email", field: "email", sortable: true, filter: true, resizable: true });
        columnHeader.push({ headerName: "Phone", field: "phone", sortable: true, filter: true });
        columnHeader.push({ headerName: "Address", field: "address", sortable: true, filter: true });
        columnHeader.push({ headerName: "City", field: "city", sortable: true, filter: true });
        columnHeader.push({ headerName: "State", field: "state", sortable: true, filter: true });
        columnHeader.push({ headerName: "Zip", field: "zip", sortable: true, filter: true });
        columnHeader.push({ headerName: "Phone Interview", field: "phoneInterviewAvailability", sortable: true, filter: true });
        columnHeader.push({ headerName: "In Person Interview", field: "inPersonInterviewAvailability", sortable: true, filter: true });
        columnHeader.push({ headerName: "Start Assignment", field: "startAssignment", sortable: true, filter: true });
        columnHeader.push({ headerName: "Resume", field: "resumeLink", sortable: true, filter: true, cellRenderer:this.hyperlinkCellRenderer });
        columnHeader.push({ headerName: "idLink", field: "idLink", sortable: true, filter: true });
        columnHeader.push({ headerName: "Work Authorization", field: "workAuthorizationType", sortable: true, filter: true });

        this.setState({ columnDefs: columnHeader });
        // let header = Object.keys(this.state.data[0])
        // return header.map((key, index) => {
        //     return <th key={index}>{key.toUpperCase()}</th>
        //  })
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.autoSizeAll(false);
        this.gridApi.doLayout();
    };
    autoSizeAll(skipHeader) {
        var allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId);
        });
        this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    }

    hyperlinkCellRenderer(params){
        console.log(params);

        let resultElement =  document.createElement("span");
        resultElement.innerHTML = "<a href='"+ params.value + "' target='_self'>Resume</a>"
        console.log(resultElement);
        return resultElement;

    }
    renderTableHeader() {
        let header = Object.keys(this.state.data[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.data.map((records, index) => {

            return (<tr key={records.appId}>
                {
                    Object.entries(records).map((k, i) => {
                        return <td key={k[0] + index}>{k[1]}</td>
                    })
                }
            </tr>)
        })
    }

    render() {
        return (


            <div style={{ height: '100%' }}>
                {/* <div style={{ marginBottom: '5px' }}>
                <button onClick={this.fillLarge.bind(this)}>Fill 100%</button>
                <button onClick={this.fillMedium.bind(this)}>Fill 60%</button>
                <button onClick={this.fillExact.bind(this)}>Exactly 400 x 400 pixels</button>
                </div> */}
                <div style={{ height: 'calc(100% - 25px)' }} className="ag-theme-balham">
                    <div style={this.state.style}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}

                            onGridReady={this.onGridReady.bind(this)}
                        />
                    </div>
                </div>
            </div>


            // <div>
            //     <div style = {{height:'500px', width:'100%'}} className="ag-theme-balham" >
            //             <AgGridReact
            //                 columnDefs={this.state.columnDefs}
            //                 rowData={this.state.rowData}
            //                 onGridReady={this.onGridReady}
            //             >

            //             </AgGridReact>
            //     </div>
            // </div>



            //    <div>
            //       <h1 id='title'>Records from DB</h1>
            //       {this.state.data.length ===  0 ? (
            //           <div> Loading data </div>
            //       ) :  
            //         <table id='records'>
            //             <tbody id='table-body'>
            //                 <tr id='table-header'>{this.renderTableHeader()}</tr>
            //                 {this.renderTableData()}
            //             </tbody>
            //         </table>
            //     }
            //    </div>
        )
    }
}

export default ViewRecords
