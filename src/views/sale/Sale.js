import React, { Component } from 'react';
import './Sale.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class Sale extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            listProduct: []
        };
        this.handlePushProduct = this.handlePushProduct.bind(this);
    }

    handlePushProduct = () => {
        let product = document.querySelector('#select-product').value;
        let amount = document.querySelector('#input-amount').value;
        alert(product +" "+ amount);

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
        <div className="Sale">
            <Sidebar />
            {/* Page Content  */}
            <div className="m-content">
                <Header />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Agregue productos a la venta</h3>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div>Producto:
                                    <select name="cbo_producto" id="select-product" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un producto</option>
                                        <option value={"Arroz"}>Arroz</option>
                                        <option value={"Carne"}>Carne</option>
                                        <option value={"Habichuela"}>Habichuela</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div>Cantidad:
                                    <input id="input-amount" name="txt_cantidad" type="number" className="col-md-12 form-control" placeholder="Cantidad" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div style={{marginTop: 23}}>
                                    <button onClick={this.handlePushProduct} type="button" className="btn btn-success btn-agregar-producto">Agregar</button>
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
                                ) : <div className="panel-body"> No hay productos agregados</div>
                                }
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-right">
                                <button type="button" className="btn btn-secondary guardar-carrito">Finalizar venta</button>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        );
    }
}

export default Sale;
