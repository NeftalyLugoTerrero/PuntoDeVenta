import React, { Component } from 'react';
import { InvoiceNavRoutes } from '../../routes/InvoiceNavRoutes';
import swal from 'sweetalert';
import _ from 'lodash';
import './Invoice.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';

/*

route: /inventory/set/car

Header:

@[Cantidad_Vendida]
@[ID_Tipo_Factura] = 1
@[NCF]
@[ITBIS]
@[RNC] = ''
@[Nombre]
@[ID_Tipo_Cliente] = 1
@[Monto_Total]
@[ITBIS_Total]
@[Descuento] = 0
@[Balance]
@[ID_TIPO_PAGO] =1

#Details:
@[ID_PRODUCTO]
@[Cantidad_Vendida]
@[ITBIS]
@[Monto]
@[Descuento]

EJ:

1: {ID_PRODUCTO: '0001',Cantidad_Vendida: 1,ITBIS: 18,Monto: 10,Descuento:0}

2+: [{ID_PRODUCTO: '0001',Cantidad_Vendida: 1,ITBIS: 18,Monto: 10,Descuento:0},
    {ID_PRODUCTO: '0001',Cantidad_Vendida: 1,ITBIS: 18,Monto: 10,Descuento:0}]

*/

class Invoice extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            productSelected: null,
            amount: 0,
            listProduct: [],
            listClient: [],
            shoppingCart: [],
            listToShow: [],
            ITBIS: 0,
            Total: 0,
            Sub_Total: 0
        };
        this.handlePushProduct = this.handlePushProduct.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
        this.addProductToShoppingCart = this.addProductToShoppingCart.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
        this.setSubTotal = this.setSubTotal.bind(this);
        this.setItbis = this.setItbis.bind(this);
        this.addProductToListToShow = this.addProductToListToShow.bind(this);
        this.handleProductSelected = this.handleProductSelected.bind(this);
    }

    componentDidMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/inventory/get/product?offset=0')
        .then(res => res.json())
        .then(res => {
            let newArray = [];
            _.forEach(res, value => {
                newArray[value.ID] = value;
            });
            this.setState({ listProduct : newArray }); 
            console.log(newArray);
        })
        .catch(error => console.log(error));

        //@Params: offset
        fetch('http://5.189.156.26:99/client/list?offset=0')
        .then(res => res.json())
        .then(res => this.setState({ listClient : res }))
        .catch(error => console.log(error));
    }

    addProductToShoppingCart = (product, amount) => {
        // let product = this.state.listProduct;
        // product = product[id];
    }

    addProductToListToShow = (product, amount) => {
        // let product = this.state.listProduct;
        // product = product[id];
    }

    updateTotal = () => {
        let subTotal = this.state.Sub_Total || 0;
        let ITBIS = this.state.ITBIS || 0;
        let total = _.add(subTotal, ITBIS);
        total = _.round(total);
        this.setState(prevState => ({ Total: _.add(prevState.Total + total) }));
    }

    setSubTotal = (n) => {
        n = _.round(n);
        this.setState({ Sub_Total: n });
    }

    setItbis = (n) => {
        n = _.round(n);
        this.setState({ ITBIS: n });
    }

    handleProductSelected = (e) => {
        let value = e.target.value;

        let listProduct = this.state.listProduct;
        let product = listProduct[value];

        let amount = document.querySelector('#input-amount');
        amount.disabled = false;
        amount.max = product.Existencia_Actual;
        amount.maxLength = _.size(product.Existencia_Actual.toString());

        // let btnAddProduct = document.querySelector('#btn-add-product');
        // btnAddProduct.disabled = false;

        this.setState({ productSelected: product.ID });
    }

    handleRemoveProduct = (e) => {
        let ID = e.target.id;
    }

    handlePushProduct = () => {
        let product = this.state.productSelected;
        let amount = this.state.amount;

        if(product === null) {
            swal("¡Atención!", "Debe seleccionar un producto para ser agregado.", "info");
            return;
        }

        if(!amount > 0) {
            swal("¡Atención!", "Debe especificar una cantidad mayor a cero para agregar este producto.", "info");
            return;
        }

        // let listToShow = {
        //     ID,
        //     Nombre_Producto,
        //     Cantidad,
        //     Detalle,
        //     Precio_Detalle,
        //     Precio_Total,
        //     ITBIS
        // }

        

        console.log(product);
        console.log(amount);

        
        this.addProductToShoppingCart(product, amount);
        this.addProductToListToShow(product, amount);


        // listProduct[_.size(listProduct)] =  

    }

    render() {
        var itbis = this.state.ITBIS || 0;
        var subTotal = this.state.Sub_Total|| 0;
        var total = this.state.Total|| 0;

        var listProduct = this.state.listProduct;
        var listClient = this.state.listClient;
        
        var listToShow = this.state.listToShow;
        if(listToShow !== null && listToShow.length > 0) {
            listToShow = listToShow.map(product => 
                <tr key={product.ID}>
                    <td>{product.ID}</td>
                    <td>{product.Nombre_Producto}</td>
                    <td>{product.Cantidad}</td>
                    <td>{product.Detalle}</td>
                    <td>{product.Precio_Detalle}</td>
                    <td>{product.ITBIS}</td>
                    <td>{product.Precio_Total}</td>
                    <td><button type="button" onClick={this.handleRemoveProduct} class="btn btn-sm btn-danger eliminar-producto" id={product.ID}>Eliminar</button></td>
                </tr>
            );
        } else {
            listToShow = <td>No hay producto en la factura</td>;
        }

        return (
        <div className="Invoice">
            <Sidebar classNameActive="invoice" />
            {/* Page Content  */}
            <div className="m-content">
                <Header navRoutes={InvoiceNavRoutes} />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Agregar productos a la venta</h3>
                        </div>
                        <div className="row">
                            <div className="col-md-3 ">
                                <div>Cliente:
                                    <select id="select-client" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un cliente</option>
                                        { listClient ? listClient.map((client, key) => <option key={client.ID} value={key}>{client.Nombre}</option>) : "" }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Producto:
                                    <select id="select-product" onChange={this.handleProductSelected} className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un producto</option>
                                        { listProduct ? listProduct.map((product, key) => <option key={product.ID} value={key}>{product.Nombre_Producto}</option>) : "" }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div>Cantidad:
                                    <input id="input-amount" type="number" className="col-md-12 form-control" onChange={e => this.setState({ amount: e.target.value })} disabled={true} min="0" max="0" placeholder="Cantidad" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div style={{marginTop: 23}}>
                                    <button onClick={this.handlePushProduct} id="btn-add-product" type="button" className="btn btn-success btn-agregar-producto">Agregar</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Productos</h3>
                            </div>
                            <div className="panel-body detalle-producto">
                                { listToShow !== null && listToShow.length > 0 ? (
                                    // { 1 === 1 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Nombre</th>
                                                <th>Cantidad</th>
                                                <th>Descripción</th>
                                                <th>Precio unidad</th>
                                                <th>ITBIS</th>
                                                <th>Precio total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listToShow}
                                            {/* <tr>
                                                <td>Código</td>
                                                <td>Nombre</td>
                                                <td>Cantidad</td>
                                                <td>Descripción</td>
                                                <td>Precio unidad</td>
                                                <td>Precio total</td>
                                                <td><button type="button" className="btn btn-sm btn-danger eliminar-producto" id="idproducto">Eliminar</button></td>
                                            </tr> */}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Sub-Total:</td>
                                                <td>{subTotal}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>ITBIS (18%):</td>
                                                <td>{itbis}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Total:</td>
                                                <td>{total}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : <div className="panel-body">No hay productos agregados.</div>
                                }
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-right">
                                <button type="button" className="btn btn-secondary guardar-shoppingCart">Finalizar venta</button>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        );
    }
}

export default Invoice;
