import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
    constructor(props) {
        super(props); 
        this.state = {};
    }

    render() {
        return (
            <div className="Sidebar">
                <div className="wrapper">
                    <nav id="sidebar">
                        <div id="dismiss">
                            <i className="fas fa-arrow-left" />
                        </div>
                        <div className="sidebar-header">
                            <h3>Nombre App</h3>
                        </div>
                        <ul className="list-unstyled components">
                            <p>Punto de Venta</p>
                            <li className="active">
                                <a href="#inventorySubmenu" data-toggle="collapse" aria-expanded="false">Inventario</a>
                                <ul className="collapse list-unstyled" id="inventorySubmenu">
                                    <li>
                                        <a href="#">Mercancías</a>
                                    </li>
                                    <li>
                                        <a href="#">Historial de Compras</a>
                                    </li>
                                    <li>
                                        <a href="#">Compra de Mercancías</a>
                                    </li>
                                    <li>
                                        <a href="#">Registrar Mercancía</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#providerSubmenu" data-toggle="collapse" aria-expanded="false">Proveedor</a>
                                <ul className="collapse list-unstyled" id="providerSubmenu">
                                    <li>
                                        <a href="#">Historial de Proveedor</a>
                                    </li>
                                    <li>
                                        <a href="#">Cuentas por Pagar</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#clientSubmenu" data-toggle="collapse" aria-expanded="false">Cliente</a>
                                <ul className="collapse list-unstyled" id="clientSubmenu">
                                    <li>
                                        <a href="#">Historial de Clientes</a>
                                    </li>
                                    <li>
                                        <a href="#">Cuentas por Cobrar</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Contabilidad</a>
                            </li>
                        </ul>
                        {/* <ul className="list-unstyled CTAs">
                            <li>
                                <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a>
                            </li>
                            <li>
                                <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a>
                            </li>
                        </ul> */}
                    </nav>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
}

export default Sidebar;
