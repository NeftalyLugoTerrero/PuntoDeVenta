import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import PushProductModal from '../push_product_modal/PushProductModal';
import PushClientModal from '../push_client_modal/PushClientModal';
import PushProviderModal from '../push_provider_modal/PushProviderModal';

class Sidebar extends Component {
    constructor(props) {
        super(props); 
        this.state = {};
    }

    render() {
        let classNameActive = this.props.classNameActive || "";

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
                            <li className={classNameActive === 'invoice' ? "active" : ""}>
                                <a href="#invoiceSubmenu" data-toggle="collapse" aria-expanded="false">Facturación</a>
                                <ul className="collapse list-unstyled" id="invoiceSubmenu">
                                    <li>
                                        {/* <Link to="/invoice">Mercancías</Link> */}
                                        <a href="/invoice">Generar Factura</a>
                                    </li>
                                    <li>
                                        <a href="#">Historial de Facturas</a>
                                    </li>
                                </ul>
                            </li>
                            <li className={classNameActive === 'inventory' ? "active" : ""}>
                                <a href="#inventorySubmenu" data-toggle="collapse" aria-expanded="false">Inventario</a>
                                <ul className="collapse list-unstyled" id="inventorySubmenu">
                                    <li>
                                        {/* <Link to="/inventory">Mercancías</Link> */}
                                        <a href="/inventory">Mercancías</a>
                                    </li>
                                    <li>
                                        <a href="#">Historial de Compras</a>
                                    </li>
                                    <li>
                                        <a href="/push_product">Compra de Mercancías</a>
                                    </li>
                                    <li>
                                        <a href="/push_product" data-toggle="modal" data-target="#pushProductModal">Registrar Mercancía</a>
                                    </li>
                                </ul>
                            </li>
                            <li className={classNameActive === 'provider' ? "active" : ""}>
                                <a href="#providerSubmenu" data-toggle="collapse" aria-expanded="false">Proveedor</a>
                                <ul className="collapse list-unstyled" id="providerSubmenu">
                                    <li>
                                        {/* <Link to="/provider">Historial de Proveedor</Link> */}
                                        <a href="/provider">Listado de Proveedores</a>
                                    </li>
                                    <li>
                                        <a href="#">Cuentas por Pagar</a>
                                    </li>
                                    <li>
                                        <a href="/push_provider" data-toggle="modal" data-target="#pushProviderModal">Agregar proveedor</a>
                                    </li>
                                </ul>
                            </li>
                            <li className={classNameActive === 'client' ? "active" : ""}>
                                <a href="#clientSubmenu" data-toggle="collapse" aria-expanded="false">Cliente</a>
                                <ul className="collapse list-unstyled" id="clientSubmenu">
                                    <li>
                                        {/* <Link to="/client">Historial de Clientes</Link> */}
                                        <a href="/client">Listado de Clientes</a>
                                    </li>
                                    <li>
                                        <a href="#">Cuentas por Cobrar</a>
                                    </li>
                                    <li>
                                        <a href="/push_client" data-toggle="modal" data-target="#pushCLientModal">Registrar Cliente</a>
                                    </li>
                                </ul>
                            </li>
                            <li className={classNameActive === 'account' ? "active" : ""}>
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
                <PushProductModal />
                <PushClientModal />
                <PushProviderModal />
            </div>
        );
    }
}

export default Sidebar;
