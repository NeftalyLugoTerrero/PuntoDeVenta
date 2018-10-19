import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InvoiceNavRoutes } from '../../routes/InvoiceNavRoutes';
import { InventoryNavRoutes } from '../../routes/InventoryNavRoutes';
import { ProviderNavRoutes } from '../../routes/ProviderNavRoutes';
import { ClientNavRoutes } from '../../routes/ClientNavRoutes';
import './Sidebar.css';
import PushProductModal from '../push_product_modal/PushProductModal';
import PushClientModal from '../push_client_modal/PushClientModal';
import PushProviderModal from '../push_provider_modal/PushProviderModal';
import AddProductModal from '../add_product_modal/AddProductModal';

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
                                <a href="#invoiceSubmenu" data-toggle="collapse" aria-expanded={classNameActive === 'invoice' ? "true" : "false"}>Facturación</a>
                                <ul className="collapse list-unstyled" id="invoiceSubmenu">
                                    { InvoiceNavRoutes ?
                                        InvoiceNavRoutes.map(item => 
                                            <li className="nav-item" key={item.to}>
                                                <a className="nav-link" href={item.to} data-toggle={item.dataToggle} data-target={item.dataTarget} >{item.name}</a>
                                            </li>
                                        ) : ""}
                                    {/* <li>
                                        <a href="/invoice">Generar Factura</a>
                                    </li>
                                    <li>
                                        <a href="/invoice_history">Historial de Facturas</a>
                                    </li> */}
                                </ul>
                            </li>
                            <li className={classNameActive === 'inventory' ? "active" : ""}>
                                <a href="#inventorySubmenu" data-toggle="collapse" aria-expanded={classNameActive === 'inventory' ? "true" : "false"}>Inventario</a>
                                <ul className="collapse list-unstyled" id="inventorySubmenu">
                                    { InventoryNavRoutes ?
                                        InventoryNavRoutes.map(item => 
                                            <li className="nav-item" key={item.to}>
                                                <a className="nav-link" href={item.to} data-toggle={item.dataToggle} data-target={item.dataTarget} >{item.name}</a>
                                            </li>
                                        ) : ""}
                                    {/* <li>
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
                                    </li> */}
                                </ul>
                            </li>
                            <li className={classNameActive === 'provider' ? "active" : ""}>
                                <a href="#providerSubmenu" data-toggle="collapse" aria-expanded={classNameActive === 'provider' ? "true" : "false"}>Proveedor</a>
                                <ul className="collapse list-unstyled" id="providerSubmenu">
                                    { ProviderNavRoutes ?
                                        ProviderNavRoutes.map(item => 
                                            <li className="nav-item" key={item.to}>
                                                <a className="nav-link" href={item.to} data-toggle={item.dataToggle} data-target={item.dataTarget} >{item.name}</a>
                                            </li>
                                        ) : ""}
                                    {/* <li>
                                        <a href="/provider">Listado de Proveedores</a>
                                    </li>
                                    <li>
                                        <a href="#">Cuentas por Pagar</a>
                                    </li>
                                    <li>
                                        <a href="/push_provider" data-toggle="modal" data-target="#pushProviderModal">Agregar proveedor</a>
                                    </li> */}
                                </ul>
                            </li>
                            <li className={classNameActive === 'client' ? "active" : ""}>
                                <a href="#clientSubmenu" data-toggle="collapse" aria-expanded={classNameActive === 'client' ? "true" : "false"}>Cliente</a>
                                <ul className="collapse list-unstyled" id="clientSubmenu">
                                    { ClientNavRoutes ?
                                        ClientNavRoutes.map(item => 
                                            <li className="nav-item" key={item.to}>
                                                <a className="nav-link" href={item.to} data-toggle={item.dataToggle} data-target={item.dataTarget} >{item.name}</a>
                                            </li>
                                        ) : ""}
                                    {/* <li>
                                        <a href="/client">Listado de Clientes</a>
                                    </li>
                                    <li>
                                        <a href="#">Cuentas por Cobrar</a>
                                    </li>
                                    <li>
                                        <a href="/push_client" data-toggle="modal" data-target="#pushCLientModal">Registrar Cliente</a>
                                    </li> */}
                                </ul>
                            </li>
                            {/* <li className={classNameActive === 'account' ? "active" : ""}>
                                <a href="#">Contabilidad</a>
                            </li> */}
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
                <AddProductModal />
            </div>
        );
    }
}

export default Sidebar;
