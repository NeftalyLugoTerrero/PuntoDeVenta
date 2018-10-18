import React, { Component } from 'react';
import './Client.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class Client extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            listCient: []
        };
    }

    componentDidMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/client/list?offset=0')
        .then(res => res.json())
        .then(res => this.setState({ listCient : res }))
        .catch(error => console.log(error));
    }

    render() {
        var listCient = this.state.listCient;
        var listCientMap = listCient.map(client => 
            <tr key={client.Cedula}>
                <td>{client.Cedula}</td>
                <td>{client.Nombre}</td>
                <td>{client.Telefono}</td>
                <td>{client.Direccion}</td>
                <td>{client.Email}</td>
                <td>{client.Tipo_Cliente}</td>
                <td><button type="button" className="btn btn-sm btn-danger eliminar-producto" id="idproducto">Eliminar</button></td>
            </tr>
        );

        var navRoutes = [
            { to: "/client", name: "Listado de Proveedores"},
            { to: "/accounts_receivable", name: "Cuentas por Cobrar"},
            { to: "/push_client_modal", name: "Agregar Cliente", dataToggle: "modal", dataTarget: "#pushclientModal"}
        ];

        return (
        <div className="Client">
            <Sidebar classNameActive="client" />
            {/* Page Content  */}
            <div className="m-content">
                <Header navRoutes={navRoutes} />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Listado de clientes</h3>
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
                                    <input id="input-search-client" name="txt_cantidad" type="text" className="col-md-12 form-control" placeholder="Nombre del cliente" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-3">
                            {/* style={{marginTop: 23}} */}
                                <div >
                                    <button type="button" className="btn btn-info btn-agregar-producto">Buscar</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Clientes</h3>
                            </div>
                            <div className="panel-body detalle-producto">
                                { listCient !== null && listCient.length > 0 ? (
                                // { 1 === 1 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Cédula o RNC</th>
                                                <th>Nombre</th>
                                                <th>Teléfono</th>
                                                <th>Dirección</th>
                                                <th>Email</th>
                                                <th>Tipo de Cliente</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCientMap}
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
                                ) : <div className="panel-body">No hay clientes en la lista</div>
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

export default Client;
