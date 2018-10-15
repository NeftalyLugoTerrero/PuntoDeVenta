import React, { Component } from 'react';
import './Inventory.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class Inventory extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            listProduct: []
        };
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }

    handleAddProduct = () => {
        let code = document.querySelector('#input-product-code').value;
        let name = document.querySelector('#input-product-name').value;
        let price = document.querySelector('#input-product-price').value;
        let amount = document.querySelector('#input-amount').value;
        alert(name +" "+ amount);

        // this.setState((current, props) => ({
        //     listProduct: current.listProduct + props.increment
        // }));
    }

    render() {
        var listProduct = this.state.listProduct;
        var listProductMap = listProduct.map((product, key) => 
            <tr key={key}>
                <td>Producto</td>
                <td>Cantidad</td>
                <td>Precio</td>
                <td>Subtotal</td>
                <td><button type="button" class="btn btn-sm btn-danger eliminar-producto" id="idproducto">Eliminar</button></td>
            </tr>
        );

        return (
        <div className="Inventory">
            <Sidebar />
            {/* Page Content  */}
            <div className="m-content">
                <Header />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Agregar producto al inventario</h3>
                        </div>
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
                            <div className="col-md-2">
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
                            <div className="col-md-2">
                                <div style={{marginTop: 23}}>
                                    <button onClick={this.handleAddProduct} type="button" className="btn btn-success btn-agregar-producto">Agregar</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Productos</h3>
                            </div>
                            <div className="panel-body detalle-producto">
                                { listProduct !== null && listProduct.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Descripción</th>
                                                <th>Cantidad</th>
                                                <th>Precio</th>
                                                <th>Subtotal</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProductMap}
                                            {/* <tr>
                                                <td>Producto</td>
                                                <td>Cantidad</td>
                                                <td>Precio</td>
                                                <td>Subtotal</td>
                                                <td><button type="button" class="btn btn-sm btn-danger eliminar-producto" id="idproducto">Eliminar</button></td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                ) : <div className="panel-body">No hay productos en el inventario</div>
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

export default Inventory;
