import React, { Component } from 'react';
import { InvoiceNavRoutes } from '../../routes/InvoiceNavRoutes';
import swal from 'sweetalert';
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
        this.fetchInvoices = this.fetchInvoices.bind(this);
        this.handlePayInvoice = this.handlePayInvoice.bind(this);
    }

    componentWillMount() {
        this.fetchInvoices();
    }

    fetchInvoices = () => {
        //@Params: offset
        fetch('http://5.189.156.26:99/invoice/get/list?offset=0')
            .then(res => res.json())
            .then(res => {
                let newArray = [];
                _.forEach(res, value => {
                    newArray[value.ID] = value;
                });
                this.setState({ listInvoice: newArray });
                console.log(newArray);
            })
            .catch(error => console.log(error));
    }

    handleSearchInvoiceHistory = () => {
        let filter = document.querySelector('#select-invoice-type').value;
        let searchText = _.trim(document.querySelector('#input-search-invoice').value);
        let invoices = [];
        let listInvoice = this.state.listInvoice;

        if (!_.isEmpty(searchText)) {
            for (let invoice in listInvoice) {
                if (_.toLower(listInvoice[invoice].ID).search(_.toLower(searchText)) !== -1) {
                    if (filter === 0) {
                        invoices.push(listInvoice[invoice]);
                    } else if (_.toLower(filter).search(_.toLower(listInvoice[invoice].Estado_Factura)) !== -1) {
                        invoices.push(listInvoice[invoice]);
                        // }
                    }
                }
            }

            if (Object.entries(invoices).length > 0) {
                listInvoice = invoices;
            } else {
                listInvoice = null;
            }

            this.setState({ listInvoiceSearch: listInvoice });
            console.log(listInvoice);
        } else {
            this.setState({ listInvoiceSearch: null });
        }
    }

    handleFilter = () => {
        let filter = document.querySelector('#select-invoice-type').value;
        let listInvoice = this.state.listInvoice;
        let invoices = [];

        if (filter === 0) {
            listInvoice = null;
        } else {
            for (let invoice in listInvoice) {
                if (_.toLower(filter).search(_.toLower(listInvoice[invoice].Estado_Factura)) !== -1) {
                    invoices.push(listInvoice[invoice]);
                }
            }
        }

        if (Object.entries(invoices).length > 0) {
            listInvoice = invoices;
        } else {
            listInvoice = null;
        }

        this.setState({ listInvoiceSearch: listInvoice });
    }

    handleDeleteInvoice = (e) => {
        // path: /client/delete
        // params: @ID
        var id = e.target.id;
        swal({
            title: "¿Desea eliminar esta factura?",
            text: "¡Una vez eliminada esta factura no será posible recuperarla!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://5.189.156.26:99/invoice/cancel?ID=${id}`)
                        .then(res => console.log(res))
                        .catch(error => console.log(error));
                    swal("¡La factura ha sido eliminada correctamente!", {
                        icon: "success",
                    })
                        .then(() => {
                            window.location.reload();
                        });
                }
            });
    }

    handlePayInvoice = (e) => {
        var id = e.target.id;
        let invoices = this.state.listInvoice;

        if (invoices[id].Estado_Factura) {
            swal("¡La factura ya había sido pagada!", { icon: "info" });
        } else {
            fetch(`http://5.189.156.26:99/invoice/pay`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(id)
                })
                .then(res => console.log(res))
                .catch(error => console.log(error));
            swal("¡La factura ha sido pagada correctamente!", {
                icon: "success",
            })
                .then(() => {
                    window.location.reload();
                });
        }
    }

    render() {
        var listInvoice = this.state.listInvoiceSearch !== null ? this.state.listInvoiceSearch : this.state.listInvoice;
        var listInvoiceMap;
        if (listInvoice !== null && _.size(listInvoice) > 0) {
            listInvoiceMap = listInvoice.map((invoice) =>
                <tr key={invoice.ID}>
                    <td>{invoice.ID}</td>
                    {/* <td>{invoice.Cliente}</td> */}
                    <td>{invoice.Tipo_Factura}</td>
                    <td>{invoice.Estado_Factura === true ? 'Pagada' : 'No pagada'}</td>
                    <td>{invoice.Registro}</td>
                    <td>{invoice.Balance}</td>
                    <td>{invoice.ITBIS_Total}</td>
                    <td>{invoice.Monto_Total}</td>
                    <td><button type="button" onClick={this.handleDeleteInvoice} className="btn btn-sm btn-danger eliminar-invoiceo" id={invoice.ID}>Eliminar</button>
                        <button type="button" disabled={invoice.Estado_Factura} onClick={this.handlePayInvoice} style={{ marginLeft: 10 }} className="btn btn-sm btn-success eliminar-invoiceo" id={invoice.ID}>Pagar</button></td>
                </tr>
            );
        } else {
            listInvoiceMap = "No hay factura en la lista";
        }

        return (
            <div className="InvoiceHistory">
                <Sidebar classNameActive="invoice" />
                {/* Page Content  */}
                <div className="m-content">
                    <Header navRoutes={InvoiceNavRoutes} />

                    <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                        <div className="container">
                            <div className="page-header">
                                <h3>Historial de Facturación</h3>
                            </div>
                            <div className="row centered">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <div>
                                        <input id="input-search-invoice" onChange={this.handleSearchInvoiceHistory} type="search" className="col-md-12 form-control" placeholder="Código de la factura" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <select id="select-invoice-type" onChange={this.handleFilter} className="col-md-12 form-control">
                                            <option value={0}>Estado de factura</option>
                                            <option value={true}>Pagada</option>
                                            <option value={false}>No pagada</option>
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
                                    {listInvoice !== null && listInvoice.length > 0 ? (
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
