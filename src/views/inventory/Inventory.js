import React, { Component } from 'react';
import './Inventory.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class Inventory extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            listProduct: [],
            foundedProducts: null
        };
    }

    componentDidMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/inventory/get/product?offset=0')
        .then(res => res.json())
        .then(res => this.setState({ listProduct : res }))
        .catch(error => console.log(error));
    }

    render() {
        var listProduct = this.state.foundedProducts !== null ? this.state.foundedProducts : this.state.listProduct;
        var listProductMap = listProduct.map((product) => 
            <tr key={product.ID}>
                <td>{product.ID}</td>
                <td>{product.Nombre_Producto}</td>
                <td>{product.Existencia_Actual}</td>
                <td>{product.Registro}</td>
                <td>${product.Precio_Detalle}</td>
                <td><button type="button" className="btn btn-sm btn-danger eliminar-producto" id={`btn-remove-product${product.ID}`}>Eliminar</button></td>
            </tr>
        );

        var navRoutes = [
            { to: "/inventory", name: "Mercancías"},
            { to: "/purchase_history", name: "Historial de Compras"},
            { to: "/push_product", name: "Compra de Mercancías"},
            { to: "/push_product_modal", name: "Registrar Mercancía", dataToggle: "modal", dataTarget: "#pushProductModal"}
        ];

        return (
        <div className="Inventory">
            <Sidebar classNameActive="inventory" />
            {/* Page Content  */}
            <div className="m-content">
                <Header navRoutes={navRoutes} />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Inventario</h3>
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
                                    <input id="input-search-inventory" type="search" className="col-md-12 form-control" placeholder="Nombre o código del producto" autoComplete="off" />
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
                                <h3 className="panel-title">Productos</h3>
                            </div>
                            <div className="panel-body detalle-producto">
                                { listProduct !== null && listProduct.length > 0 ? (
                                // { 1 === 1 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Producto</th>
                                                <th>Existencia</th>
                                                <th>Agregado</th>
                                                <th>Precio</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProductMap}
                                            {/* <tr>
                                                <td>Código</td>
                                                <td>Producto</td>
                                                <td>Estado</td>
                                                <td>Agregado</td>
                                                <td>Precio</td>
                                                <td><button type="button" className="btn btn-sm btn-danger eliminar-producto" id="idproducto">Eliminar</button></td>
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