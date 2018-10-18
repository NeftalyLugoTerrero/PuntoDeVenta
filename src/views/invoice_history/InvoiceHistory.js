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
    }

    componentDidMount() {
        //@Params: offset
        // fetch('http://5.189.156.26:99/inventory/get/invoice?offset=0')
        // .then(res => res.json())
        // .then(res => this.setState({ listInvoice : res }))
        // .catch(error => console.log(error));
    }

    // Cantidad_Por_Mayor: 80
    // Detalle: "Nada"
    // Entrada: 100
    // Existencia_Actual: 100
    // Existencia_Inicial: 100
    // ID: "0002"
    // ID_Tipo: 1
    // Nombre_invoiceo: "Yuca"
    // Precio_Detalle: 100
    // Precio_Por_Mayor: 80
    // Registro: "2018-10-16T23:30:29.640Z"
    // Salida: 0
    // Tipo_invoiceo: "Vegetales y viveres "

    handleSearchInvoiceHistory = () => {
        let searchText = _.trim(document.querySelector('#input-search-inventory').value);
        let invoices = [];
        let listInvoice = this.state.listInvoice;

        if(!_.isEmpty(searchText)) {
            for(let invoice in listInvoice) {
                if(_.toLower(listInvoice[invoice].Nombre_invoiceo).search(_.toLower(searchText)) !== -1 || _.toLower(listInvoice[invoice].ID).search(_.toLower(searchText)) !== -1) {
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

    render() {
        var listInvoice = this.state.listInvoiceSearch !== null ? this.state.listInvoiceSearch : this.state.listInvoice;
        if(listInvoice !== null) {
            var listInvoiceMap = listInvoice.map((invoice) => 
                <tr key={invoice.ID}>
                    <td>{invoice.ID}</td>
                    <td>{invoice.Cliente}</td>
                    <td>{invoice.Categoria}</td>
                    <td>{invoice.Estado}</td>
                    <td>{invoice.Fecha}</td>
                    <td>{invoice.Subtotal}</td>
                    <td>{invoice.Total}</td>
                    <td><button type="button" className="btn btn-sm btn-danger eliminar-invoiceo" id={`btn-remove-invoice${invoice.ID}`}>Eliminar</button></td>
                </tr>
            );
        } else {
            listInvoiceMap = "No hay invoiceos en la lista";
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
                        {/* <div className="row centered" style={{marginBottom:"25px"}} >
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <input id="input-search-invoice" name="txt_cantidad" type="text" className="col-md-12 form-control" placeholder="Nombre del invoiceo" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div >
                                    <button type="button" className="btn btn-info btn-agregar-invoiceo">Buscar</button>
                                </div>
                            </div>
                        </div> */}

                        <div className="row centered">
                            <div className="col-md-2">
                                {/* <div>invoiceo:
                                    <select name="cbo_invoiceo" id="select-invoice" className="col-md-12 form-control">
                                        <option defaultValue disabled>Seleccione un invoiceo</option>
                                        <option value={"Arroz"}>Arroz</option>
                                        <option value={"Carne"}>Carne</option>
                                        <option value={"Habichuela"}>Habichuela</option>
                                    </select>
                                </div> */}
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <input id="input-search-inventory" onChange={this.handleSearchInvoiceHistory} type="search" className="col-md-12 form-control" placeholder="Código de la factura" autoComplete="off" />
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
                                                <th>Cliente</th>
                                                <th>Categoría</th>
                                                <th>Estado</th>
                                                <th>Fecha</th>
                                                <th>Subtotal</th>
                                                <th>Total</th>
                                                <th>Acciones</th>
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
