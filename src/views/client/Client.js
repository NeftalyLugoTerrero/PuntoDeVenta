import React, { Component } from 'react';
import { ClientNavRoutes } from '../../routes/ClientNavRoutes';
import swal from 'sweetalert';
import _ from 'lodash';
import './Client.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClient: [],
            listClientSearch: null
        };
        this.handleSearchClient = this.handleSearchClient.bind(this);
        this.handleDeleteClient = this.handleDeleteClient.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.fetchClients = this.fetchClients.bind(this);
    }

    componentWillMount() {
        this.fetchClients();
    }

    fetchClients = () => {
        //@Params: offset
        fetch('http://5.189.156.26:99/client/list?offset=0')
            .then(res => res.json())
            .then(res => {
                let newArray = [];
                _.forEach(res, value => {
                    newArray[value.ID] = value;
                });
                this.setState({ listClient: newArray });
                console.log(newArray);
            })
            .catch(error => console.log(error));
    }

    handleFilter = () => {
        let filter = document.querySelector('#select-client-type').value;
        let listClient = this.state.listClient;
        let clients = [];

        if (filter === 0) {
            listClient = null;
        } else {
            for (let client in listClient) {
                if (_.toLower(listClient[client].Tipo_Cliente).search(_.toLower(filter)) !== -1) {
                    clients.push(listClient[client]);
                }
            }
        }

        if (Object.entries(clients).length > 0) {
            listClient = clients;
        } else {
            listClient = null;
        }

        this.setState({ listClientSearch: listClient });
    }

    handleSearchClient = () => {
        let searchText = _.trim(document.querySelector('#input-search-client').value);
        let filter = document.querySelector('#select-client-type').value;
        let clients = [];
        let listClient = this.state.listClient;

        if (!_.isEmpty(searchText)) {
            for (let client in listClient) {
                if (_.toLower(`${listClient[client].Nombre} ${listClient[client].Apellido || ""}`).search(_.toLower(searchText)) !== -1 || _.toLower(listClient[client].Cedula).search(_.toLower(searchText)) !== -1) {
                    if (filter === 0) {
                        clients.push(listClient[client]);
                    } else {
                        if (_.toLower(listClient[client].Tipo_Cliente).search(_.toLower(filter)) !== -1) {
                            clients.push(listClient[client]);
                        }
                    }
                }
            }

            if (Object.entries(clients).length > 0) {
                listClient = clients;
            } else {
                listClient = null;
            }

            this.setState({ listClientSearch: listClient });
        } else {
            this.setState({ listClientSearch: null });
        }
    }

    handleDeleteClient = (e) => {
        // path: /client/delete
        // params: @IDvar id = e.target.id;
        var id = e.target.id;
        swal({
            title: "¿Desea eliminar este cliente?",
            text: "¡Una vez este cliente haya sido eliminado no se podrá recuperar!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://5.189.156.26:99/client/delete?ID=${id}`)
                        .then(res => console.log(res))
                        .catch(error => console.log(error));
                    swal("¡El cliente ha sido eliminada correctamente!", {
                        icon: "success",
                    })
                        .then(() => window.location.reload());
                }
            });
    }

    render() {
        var listClient = this.state.listClientSearch ? this.state.listClientSearch : this.state.listClient;
        var listClientMap;
        if (listClient !== null) {
            listClientMap = listClient.map(client =>
                <tr key={client.Cedula}>
                    <td className="text-ajusted">{client.Cedula}</td>
                    <td className="text-ajusted">{`${client.Nombre} ${client.Apellido || ""}`}</td>
                    <td className="text-ajusted">{client.Telefono}</td>
                    <td className="text-ajusted">{client.Direccion}</td>
                    <td className="text-ajusted">{client.Email}</td>
                    <td className="text-ajusted">{client.Tipo_Cliente}</td>
                    <td><button type="button" onClick={this.handleDeleteClient} className="btn btn-sm btn-danger eliminar-producto" id={`${client.ID}`}>Eliminar</button></td>
                </tr>
            );
        } else {
            listClientMap = "No hay clientes en la lista";
        }

        return (
            <div className="Client">
                <Sidebar classNameActive="client" />
                {/* Page Content  */}
                <div className="m-content">
                    <Header navRoutes={ClientNavRoutes} />

                    <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                        <div className="container">
                            <div className="page-header">
                                <h3>Listado de clientes</h3>
                            </div>
                            <div className="row centered">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <div>
                                        <input id="input-search-client" onChange={this.handleSearchClient} type="text" className="col-md-12 form-control" placeholder="Nombre - Cédula - RNC" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <select id="select-client-type" onChange={this.handleFilter} className="col-md-12 form-control">
                                            <option value={0}>Seleccione tipo de cliente</option>
                                            <option value={'Persona'}>Persona</option>
                                            <option value={'Empresa'}>Empresa</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    {/* style={{marginTop: 23}} */}
                                    <div >
                                        <button type="button" onClick={this.handleSearchClient} className="btn btn-info btn-agregar-producto">Buscar</button>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Clientes</h3>
                                </div>
                                <div className="panel-body detalle-producto">
                                    {listClient !== null && listClient.length > 0 ? (
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
                                                {listClientMap}
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

export default Client;
