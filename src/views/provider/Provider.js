import React, { Component } from 'react';
import { ProviderNavRoutes } from '../../routes/ProviderNavRoutes';
import _ from 'lodash';
import './Provider.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class Provider extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            listProvider: [],
            listProviderSearch: null
        };
        this.handleSearchProvider = this.handleSearchProvider.bind(this);
        this.handleDeleteProvider = this.handleDeleteProvider.bind(this);
    }

    componentDidMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/provider/list?offset=0')
        .then(res => res.json())
        .then(res => this.setState({ listProvider : res }))
        .catch(error => console.log(error));
    }

    handleSearchProvider = () => {
        let searchText = _.trim(document.querySelector('#input-search-provider').value);
        let providers = [];
        let listProvider = this.state.listProvider;

        if(!_.isEmpty(searchText)) {
            for(let provider in listProvider) {
                if(_.toLower(listProvider[provider].Nombre).search(_.toLower(searchText)) !== -1 || _.toLower(listProvider[provider].RNC).search(_.toLower(searchText)) !== -1) {
                    providers.push(listProvider[provider]);
                }
            }

            if(Object.entries(providers).length > 0) {
                listProvider = providers;
            } else {
                listProvider = null;
            }

            this.setState({ listProviderSearch : listProvider });
        } else {
            this.setState({ listProviderSearch : null });
        }
    }

    handleDeleteProvider = (e) => {
        // path: /client/delete
        // params: @ID
        fetch(`http://5.189.156.26:99/provider/delete?RNC=${e.target.id}`)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    }

    render() {
        var listProvider = this.state.listProviderSearch ? this.state.listProviderSearch : this.state.listProvider;
        if(listProvider !== null) {
            var listProviderMap = listProvider.map(provider => 
                <tr key={provider.RNC}>
                    <td>{provider.RNC}</td>
                    <td>{provider.Nombre}</td>
                    <td>{provider.Direccion}</td>
                    <td>{provider.Telefono}</td>
                    <td>{provider.Direccion}</td>
                    <td>{provider.Email}</td>
                    <td><button type="button" onClick={this.handleDeleteProvider} className="btn btn-sm btn-danger eliminar-producto" id={provider.RNC}>Eliminar</button></td>
                </tr>
            );
        } else {
            listProviderMap = "No hay proveedores en la lista";
        }

        return (
        <div className="Provider">
            <Sidebar classNameActive="provider" />
            {/* Page Content  */}
            <div className="m-content">
                <Header navRoutes={ProviderNavRoutes} />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Listado de Proveedores</h3>
                        </div>
                        {/* <div className="row centered" style={{marginBottom:"25px"}} >
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <input id="input-search-product" name="txt_cantidad" type="text" className="col-md-12 form-control" placeholder="Nombre del producto" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div >
                                    <button type="button" className="btn btn-info btn-agregar-producto">Buscar</button>
                                </div>
                            </div>
                        </div> */}

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
                                    <input id="input-search-provider" onChange={this.handleSearchProvider} type="text" className="col-md-12 form-control" placeholder="Nombre del proveedor" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-3">
                            {/* style={{marginTop: 23}} */}
                                <div >
                                    <button type="button" onClick={this.handleSearchProvider} className="btn btn-info btn-agregar-producto">Buscar</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Proveedores</h3>
                            </div>
                            <div className="panel-body detalle-producto">
                                { listProvider !== null && listProvider.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>RNC</th>
                                                <th>Nombre</th>
                                                <th>Descripción</th>
                                                <th>Teléfono</th>
                                                <th>Dirección</th>
                                                <th>Correo</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProviderMap}
                                            {/* <tr>
                                                <td>Producto</td>
                                                <td>Cantidad</td>
                                                <td>Precio</td>
                                                <td>Subtotal</td>
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

export default Provider;
