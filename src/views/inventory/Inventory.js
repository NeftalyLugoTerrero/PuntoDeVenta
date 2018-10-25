import React, { Component } from 'react';
import { InventoryNavRoutes } from '../../routes/InventoryNavRoutes';
import swal from 'sweetalert';
import _ from 'lodash';
import './Inventory.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            listProductSearch: null
        };
        this.handleSearchInventory = this.handleSearchInventory.bind(this);
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    }

    componentWillMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/inventory/get/product?offset=0')
            .then(res => res.json())
            .then(res => this.setState({ listProduct: res }))
            .catch(error => console.log(error));
    }

    handleSearchInventory = () => {
        let searchText = _.trim(document.querySelector('#input-search-inventory').value);
        let products = [];
        let listProduct = this.state.listProduct;

        if (!_.isEmpty(searchText)) {
            for (let product in listProduct) {
                if (_.toLower(listProduct[product].Nombre_Producto).search(_.toLower(searchText)) !== -1 || _.toLower(listProduct[product].ID).search(_.toLower(searchText)) !== -1) {
                    products.push(listProduct[product]);
                }
            }

            if (Object.entries(products).length > 0) {
                listProduct = products;
            } else {
                listProduct = null;
            }

            this.setState({ listProductSearch: listProduct });
            console.log(listProduct);
        } else {
            this.setState({ listProductSearch: null });
        }
    }

    handleDeleteProduct = (e) => {
        // path: /client/delete
        // params: @ID
        var id = e.target.id;
        swal({
            title: "¿Desea eliminar este producto?",
            text: "¡Una vez este producto haya sido eliminado no se podrá recuperar!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://5.189.156.26:99/product/delete?ID=${id}`)
                        .then(res => console.log(res))
                        .catch(error => console.log(error));
                    swal("¡El producto ha sido eliminada correctamente!", {
                        icon: "success",
                    })
                        .then(() => {
                            window.location.reload();
                        });
                }
            });
    }

    render() {
        var listProduct = this.state.listProductSearch !== null ? this.state.listProductSearch : this.state.listProduct;
        if (listProduct !== null) {
            var listProductMap = listProduct.map((product) =>
                <tr key={product.ID}>
                    <td>{product.ID}</td>
                    <td>{product.Nombre_Producto}</td>
                    <td>{product.Existencia_Actual}</td>
                    <td>{product.Registro}</td>
                    <td>{product.Tipo_Producto}</td>
                    <td>${product.Precio_Detalle}</td>
                    <td><button type="button" onClick={this.handleDeleteProduct} className="btn btn-sm btn-danger eliminar-producto" id={product.ID}>Eliminar</button></td>
                </tr>
            );
        } else {
            listProductMap = "No hay productos en la lista";
        }

        return (
            <div className="Inventory">
                <Sidebar classNameActive="inventory" />
                {/* Page Content  */}
                <div className="m-content">
                    <Header navRoutes={InventoryNavRoutes} />

                    <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
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
                                        <input id="input-search-inventory" onChange={this.handleSearchInventory} type="search" className="col-md-12 form-control" placeholder="Nombre o código del producto" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    {/* style={{marginTop: 23}} */}
                                    <div >
                                        <button type="button" onClick={this.handleSearchInventory} className="btn btn-info btn-agregar-producto">Buscar</button>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Productos</h3>
                                </div>
                                <div className="panel-body detalle-producto">
                                    {listProduct !== null && listProduct.length > 0 ? (
                                        // { 1 === 1 ? (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Código</th>
                                                    <th>Producto</th>
                                                    <th>Existencia</th>
                                                    <th>Agregado</th>
                                                    <th>Categoría</th>
                                                    <th>Precio</th>
                                                    <th></th>
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

export default Inventory;
