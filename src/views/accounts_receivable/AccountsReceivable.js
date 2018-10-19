import React, { Component } from 'react';
import { ClientNavRoutes } from '../../routes/ClientNavRoutes';
import _ from 'lodash';
import './AccountsReceivable.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class AccountsReceivable extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            listAccountsReceivable: [],
            listAccountsReceivableSearch: null
        };
        this.handleSearchAccountsReceivable = this.handleSearchAccountsReceivable.bind(this);
        this.handleDeleteAccountsReceivable = this.handleDeleteAccountsReceivable.bind(this);
    }

    componentDidMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/accounts_receivable/get/list?offset=0')
        .then(res => res.json())
        .then(res => this.setState({ listAccountsReceivable : res }))
        .catch(error => console.log(error));
    }

    handleSearchAccountsReceivable = () => {
        let searchText = _.trim(document.querySelector('#input-search-client').value);
        let accountsReceivables = [];
        let listAccountsReceivable = this.state.listAccountsReceivable;

        if(!_.isEmpty(searchText)) {
            for(let accountsReceivable in listAccountsReceivable) {
                if(_.toLower(`${listAccountsReceivable[accountsReceivable].Nombre} ${listAccountsReceivable[accountsReceivable].Apellido || ""}`).search(_.toLower(searchText)) !== -1 || _.toLower(listAccountsReceivable[accountsReceivable].Cedula).search(_.toLower(searchText)) !== -1) {
                    accountsReceivables.push(listAccountsReceivable[accountsReceivable]);
                }
            }
    
            if(Object.entries(accountsReceivables).length > 0) {
                listAccountsReceivable = accountsReceivables;
            } else {
                listAccountsReceivable = null;
            }
    
            this.setState({ listAccountsReceivableSearch : listAccountsReceivable });
            console.log(listAccountsReceivable);
        } else {
            this.setState({ listAccountsReceivableSearch : null });
        }
    }
    
    handleDeleteAccountsReceivable = (e) => {
        // path: /client/delete
        // params: @ID
        fetch(`http://5.189.156.26:99/accounts_receivable/delete?ID=${e.target.id}`)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    }

    render() {
        var accountsReceivable = this.state.listAccountsReceivable ? this.state.listAccountsReceivable : this.state.accountsReceivable;
        var accountsReceivableMap;
        if(accountsReceivable !== null) {
            accountsReceivableMap = accountsReceivable.map(accountsReceivable => 
                <tr key={accountsReceivable.Cedula}>
                    <td>{accountsReceivable.Cedula}</td>
                    <td>{`${accountsReceivable.Nombre} ${accountsReceivable.Apellido || ""}`}</td>
                    <td>{accountsReceivable.Telefono}</td>
                    <td>{accountsReceivable.Direccion}</td>
                    <td>{accountsReceivable.Email}</td>
                    <td>{accountsReceivable.Tipo_accountsReceivablee}</td>
                    <td><button type="button" onClick={this.handleDeleteAccountsReceivable} className="btn btn-sm btn-danger eliminar-producto" id={`${accountsReceivable.ID}`}>Eliminar</button></td>
                </tr>
            );
        } else {
            accountsReceivableMap = "No hay datos en la lista";
        }

        return (
        <div className="Client">
            <Sidebar classNameActive="client" />
            {/* Page Content  */}
            <div className="m-content">
                <Header navRoutes={ClientNavRoutes} />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Cuentas por Cobrar</h3>
                        </div>
                        <div className="row centered">
                            <div className="col-md-2">
                                {/* <div>Producto:
                                    <select name="cbo_producto" id="select-product" className="col-md-12 form-control">
                                        <option defaultValue disabled>Seleccione un producto</option>
                                        <option value={"Arroz"}>Arroz</option>
                                        <option value={"Carne"}>Carne</option>
                                        <option value={"Habichuela"}>Habichuela</option>
                                    </select>
                                </div> */}
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <input id="input-search-accountsReceivable" onChange={this.handleSearchAccountsReceivable} name="txt_cantidad" type="text" className="col-md-12 form-control" placeholder="Código de factura" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-3">
                            {/* style={{marginTop: 23}} */}
                                <div >
                                    <button type="button" onClick={this.handleSearchAccountsReceivable} className="btn btn-info btn-agregar-producto">Buscar</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Clientes</h3>
                            </div>
                            <div className="panel-body detalle-producto">
                                {/* { accountsReceivable !== null && accountsReceivable.length > 0 ? ( */}
                                { 1 === 1 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Cliente</th>
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
                                            {accountsReceivableMap}
                                            {/* <tr>
                                                <td>Cédula o RNC</td>
                                                <td>Nombre</td>
                                                <td>Teléfono</td>
                                                <td>Dirección</td>
                                                <td>Email</td>
                                                <td>Fecha de Nac.</td>
                                                <td><button type="button" className="btn btn-sm btn-danger eliminar-producto" id="idproducto">Eliminar</button></td>
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

export default AccountsReceivable;
