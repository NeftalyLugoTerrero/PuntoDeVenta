import React, { Component } from 'react';
import './PushProduct.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class PushProduct extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            
        };
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }

    handleAddProduct = () => {
        let code = document.querySelector('#input-product-code').value;
        let name = document.querySelector('#input-product-name').value;
        let price = document.querySelector('#input-product-price').value;
        let amount = document.querySelector('#input-amount').value;
        alert(name +" "+ amount);
    }

    render() {
        var navRoutes = [
            { to: "/inventory", name: "Mercancías"},
            { to: "/purchase_history", name: "Historial de Compras"},
            { to: "/push_product", name: "Compra de Mercancías"},
            { to: "/push_product_modal", name: "Registrar Mercancía", dataToggle: "modal", dataTarget: "#pushProductModal"}
        ];

        return (
        <div className="PushProduct">
            <Sidebar classNameActive="inventory" />
            {/* Page Content  */}
            <div className="m-content">
                <Header navRoutes={navRoutes} />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Agregar producto al inventario</h3>
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

                        <div className="row">
                            <div className="col-md-2">
                                <div>Código:
                                    <input id="input-product-code" name="txt_cantidad" type="number" className="col-md-12 form-control" placeholder="Código" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Descripción:
                                <input id="input-product-name" name="txt_cantidad" type="text" className="col-md-12 form-control" placeholder="Nombre del producto" autoComplete="off" />
                                    {/* <select name="cbo_producto" id="select-product" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un producto</option>
                                        <option value={"Arroz"}>Arroz</option>
                                        <option value={"Carne"}>Carne</option>
                                        <option value={"Habichuela"}>Habichuela</option>
                                    </select> */}
                                </div>
                            </div>
                            {/* <div className="col-md-4">
                                <div>Tipo:
                                    // <input id="input-product-name" name="txt_cantidad" type="text" className="col-md-12 form-control" placeholder="Nombre del producto" autoComplete="off" />
                                    <select name="cbo_producto" id="select-product-type" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione el tipo</option>
                                        <option value={"Arroz"}>Lacteo</option>
                                        <option value={"Carne"}>Carne</option>
                                        <option value={"Habichuela"}>Habichuela</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className="col-md-3">
                                <div>Precio:
                                    {/* <input id="input-product-price" name="txt_cantidad" type="number" className="col-md-12 form-control" placeholder="Precio" autoComplete="off" /> */}
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">RD$</div>
                                        </div>
                                        <input id="input-product-price" type="number" className="form-control" id="inlineFormInputGroup" placeholder="Precio" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div>Existencia:
                                    <input id="input-product-amount" name="txt_cantidad" type="number" className="col-md-12 form-control" placeholder="Cantidad" autoComplete="off" />
                                </div>
                            </div>
                            {/* <div className="col-md-2">
                                <div style={{marginTop: 23}}>
                                    <button onClick={this.handleAddProduct} type="button" className="btn btn-success btn-agregar-producto">Agregar</button>
                                </div>
                            </div> */}
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-4">
                                <div>Proveedor:
                                    <select name="cbo_producto" id="select-provider" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un proveedor</option>
                                        <option value={"T-Mobile"}>T-Mobile</option>
                                        <option value={"Samsung"}>Samsung</option>
                                        <option value={"Apple"}>Apple</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Tipo:
                                    <select name="cbo_producto" id="select-type" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un proveedor</option>
                                        <option value={"Lácteo"}>Lácteo</option>
                                        <option value={"Dulce"}>Dulce</option>
                                        <option value={"Embutido"}>Embutido</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br />
                        
                        <div className="row">
                            <div className="col-md-12 text-left">
                                <button type="button" className="btn btn-secondary guardar-carrito">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default PushProduct;
