import React, { Component } from 'react';
import { InvoiceNavRoutes } from '../../routes/InvoiceNavRoutes';
import _ from 'lodash';
import './InvoiceHistory.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class InvoiceHistory extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            listInvoice: [],
            listInvoiceSearch: null
        };
        this.handleSearchInvoiceHistory = this.handleSearchInvoiceHistory.bind(this);
        this.handleDeleteInvoice = this.handleDeleteInvoice.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/invoice/get/list?offset=0')
        .then(res => res.json())
        .then(res => { this.setState({ listInvoice : res }); console.log(res); })
        .catch(error => console.log(error));
    }

    // Cantidad_Por_Mayor: 80
    // Detalle: "Nada"
    // Entrada: 100
    // Existencia_Actual: 100
    // Existencia_Inicial: 100
    // ID: "0002"
    // ID_Tipo: 1
    // Nombre_Producto: "Yuca"
    // Precio_Detalle: 100
    // Precio_Por_Mayor: 80
    // Registro: "2018-10-16T23:30:29.640Z"
    // Salida: 0
    // Tipo_Producto: "Vegetales y viveres "

    handleSearchInvoiceHistory = () => {
        let searchText = _.trim(document.querySelector('#input-search-inventory').value);
        let invoices = [];
        let listInvoice = this.state.listInvoice;

        if(!_.isEmpty(searchText)) {
            for(let invoice in listInvoice) {
                if(_.toLower(listInvoice[invoice].ID).search(_.toLower(searchText)) !== -1) {
                    invoices.push(listInvoice[invoice]);
                }
            }
    
            if(Object.entries(invoices).length > 0) {
                listInvoice = invoices;
            } else {
                listInvoice = null;
            }
    
            this.setState({ listInvoiceSearch : listInvoice });
            console.log(listInvoice);
        } else {
            this.setState({ listInvoiceSearch : null });
        }
    }

    handleFilter = () => {
        let filter = document.querySelector('#select-client-type').value;
        let listClient = this.state.listClient;
        let clients = [];

        if(filter === 0) {
            listClient = null;
        } else {
            for(let client in listClient) {
                if (_.toLower(client.Tipo_Cliente).search(_.toLower(filter)) !== -1) {
                    clients.push(listClient[client]);
                }
            }
        }   

        if(Object.entries(clients).length > 0) {
            listClient = clients;
        } else {
            listClient = null;
        }
        
        this.setState({ listClientSearch : listClient });
    }
    
    handleDeleteInvoice = (e) => {
        // path: /client/delete
        // params: @ID
        fetch(`http://5.189.156.26:99/invoice/cancel?ID=${e.target.id}`)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    }

    render() {
        var listInvoice = this.state.listInvoiceSearch !== null ? this.state.listInvoiceSearch : this.state.listInvoice;
        var listInvoiceMap;
        if(listInvoice !== null && _.size(listInvoice) > 0) {
            listInvoiceMap = listInvoice.map((invoice) => 
                <tr key={invoice.ID}>
                    <td>{invoice.ID}</td>
                    {/* <td>{invoice.Cliente}</td> */}
                    <td>{invoice.Tipo_Factura}</td>
                    <td>{invoice.Estado_Factura === true ? 'Pagada' : 'No pagada'}</td>
                    <td>{invoice.Registro}</td>
                    <td>{invoice.Monto_Total}</td>
                    <td>{invoice.ITBIS_Total}</td>
                    <td>{invoice.Balance}</td>
                    <td><button type="button" onClick={this.handleDeleteInvoice} className="btn btn-sm btn-danger eliminar-invoiceo" id={invoice.ID}>Eliminar</button></td>
                </tr>
            );
        } else {
            listInvoiceMap = "No hay factura en la lista";
        }

        return (
        <div className="InvoiceHistory">
            <Sidebar classNameActive="inventory" />
            {/* Page Content  */}
            <div className="m-content">
                <Header navRoutes={InvoiceNavRoutes} />
                
                <div style={{paddingLeft:"25px", paddingRight:"25px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Historial de Facturación</h3>
                        </div>
                        <div className="row centered">
                            <div className="col-md-1"></div>
                            <div className="col-md-5">
                                <div>
                                    <input id="input-search-inventory" onChange={this.handleSearchInvoiceHistory} type="search" className="col-md-12 form-control" placeholder="Código de la factura" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <select id="select-client-type" onChange={this.handleFilter} className="col-md-12 form-control">
                                        <option value={0}>Estado de factura</option>
                                        <option value={'Pagada'}>Pagada</option>
                                        <option value={'No pagada'}>No pagada</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                            {/* style={{marginTop: 23}} */}
                                <div >
                                    <button type="button" onClick={this.handleSearchInvoiceHistory} className="btn btn-info btn-agregar-invoiceo">Buscar</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Facturas</h3>
                            </div>
                            <div className="panel-body detalle-invoiceo">
                                { listInvoice !== null && listInvoice.length > 0 ? (
                                // { 1 === 1 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                {/* <th>Cliente</th> */}
                                                <th>Categoría</th>
                                                <th>Estado</th>
                                                <th>Fecha</th>
                                                <th>Subtotal</th>
                                                <th>ITBIS</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listInvoiceMap}
                                            {/* <tr>
                                                <td>Código</td>
                                                <td>invoiceo</td>
                                                <td>Estado</td>
                                                <td>Agregado</td>
                                                <td>Precio</td>
                                                <td><button type="button" className="btn btn-sm btn-danger eliminar-invoiceo" id="idinvoiceo">Eliminar</button></td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                ) : <div className="panel-body">Cargando...</div>
                                }
                                
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12 text-right">
                                <button type="button" className="btn btn-secondary guardar-carrito">Finalizar venta</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default InvoiceHistory;
