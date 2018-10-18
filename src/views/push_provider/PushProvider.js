import React, { Component } from 'react';
import './PushClient.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

/*

Ruta: /provider/set

params:
@[ID]
@[Nombre]
@[Direccion]
@[Telefono]
@[Email]
@[Descripcion]
@[RNC]

*/

class PushClient extends Component {
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
        <div className="PushClient">
            <Sidebar classNameActive="client" />
            {/* Page Content  */}
            <div className="m-content">
                <Header />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Agregar cliente</h3>
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
                                <div>Cédula o RNC:
                                    <input id="input-product-code" name="txt_cantidad" type="number" className="col-md-12 form-control" placeholder="Cédula" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Nombre(s):
                                <input id="input-client-name" name="txt_cantidad" type="text" className="col-md-12 form-control" placeholder="Nombre del cliente" autoComplete="off" />
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
                            <div className="col-md-4">
                                <div>Apellidos:
                                <input id="input-client-last" name="txt_cantidad" type="text" className="col-md-12 form-control" placeholder="Nombre del cliente" autoComplete="off" />
                                    {/* <select name="cbo_producto" id="select-product" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un producto</option>
                                        <option value={"Arroz"}>Arroz</option>
                                        <option value={"Carne"}>Carne</option>
                                        <option value={"Habichuela"}>Habichuela</option>
                                    </select> */}
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div>Tipo de cliente:
                                    <select name="cbo_producto" id="select-type-client" className="col-md-12 form-control">
                                        <option disabled>Seleccione el tipo de cliente</option>
                                        <option value={"Persona"}>Persona</option>
                                        <option value={"Empresa"}>Empresa</option>
                                    </select>
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
                                <div>Lorem ipsum:
                                    <select name="cbo_producto" id="select-provider" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un Lorem ipsum</option>
                                        <option value={"T-Mobile"}>T-Mobile</option>
                                        <option value={"Samsung"}>Samsung</option>
                                        <option value={"Apple"}>Apple</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Lorem ipsum:
                                    <select name="cbo_producto" id="select-type" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un Lorem ipsum</option>
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

export default PushClient;
