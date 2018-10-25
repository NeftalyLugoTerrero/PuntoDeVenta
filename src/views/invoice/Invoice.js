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

//
RNC:
Cantidad_Vendida
Monto_Total:
ITBIS_Total:
Descuento:
Balance:
ID_Tipo_Pago
JSON

//

Header:

@[Cantidad_Vendida]
@[ID_Tipo_Factura] = 1
@[NCF]
@[ITBIS]
@[RNC] = ''
--@[Nombre]
--@[ID_Tipo_Cliente] = 1
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
            clientSelected: null,
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
        this.updateSubTotal = this.updateSubTotal.bind(this);
        this.updateItbis = this.updateItbis.bind(this);
        this.addProductToListToShow = this.addProductToListToShow.bind(this);
        this.handleProductSelected = this.handleProductSelected.bind(this);
        this.handleInvoice = this.handleInvoice.bind(this);
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
        })
        .catch(error => console.log(error));

        //@Params: offset
        fetch('http://5.189.156.26:99/client/list?offset=0')
        .then(res => res.json())
        .then(res => {
            let newArray = [];
            _.forEach(res, value => {
                newArray[value.ID] = value;
            });
            this.setState({ listClient : newArray }); 
        })
        .catch(error => console.log(error));
    }

    addProductToShoppingCart = (productId, amount) => {
        let shoppingCart = this.state.shoppingCart;
        let listProduct = this.state.listProduct;
        let product = listProduct[productId];

        // let precioItem = _.multiply(product.Precio_Detalle, amount);
        // let itbis = _.multiply(precioItem, 0.18);

        // this.updateItbis(itbis);
        // this.updateSubTotal(precioItem);
        // this.updateTotal();

        if(shoppingCart[productId]) {
            amount = _.add(amount, shoppingCart[productId].amount);
        }

        let precioItem = _.round(_.multiply(product.Precio_Detalle, amount), 2);
        let itbis = _.round(_.multiply(precioItem, 0.18), 2);

        shoppingCart[productId] = {
            productId, 
            amount,
            itbis, 
            precioItem
        };
        this.setState({ shoppingCart });
        this.updateItbis();
        this.updateSubTotal();
        this.updateTotal();
    }

    addProductToListToShow = (productId, amount) => {
        // let listProduct = this.state.listProduct;
        // let product = listProduct[productId];
        

        // let listToShow = {
        //     ID,
        //     Nombre_Producto,
        //     Cantidad,
        //     Detalle,
        //     Precio_Detalle,
        //     Precio_Total,
        //     ITBIS
        // }
        
    }

    updateTotal = () => {
        let subTotal = this.state.Sub_Total || 0;
        let ITBIS = this.state.ITBIS || 0;
        // let total = _.round(_.add(subTotal, ITBIS), 2);
        this.setState({ Total: _.round(_.add(subTotal, ITBIS), 2) });
    }

    updateSubTotal = () => {
        let shoppingCart = this.state.shoppingCart;
        // let listProduct = this.state.listProduct;

        let subTotal = 0;
        _.forEach(shoppingCart, product => {
            if(product) subTotal += product.precioItem || 0;
        });
        _.round(subTotal, 2);
        // this.setState(prevState => ({ Sub_Total: _.add(prevState.Sub_Total, n )}));
        this.setState({ Sub_Total: subTotal });
        this.updateTotal();
    }

    updateItbis = () => {
        let shoppingCart = this.state.shoppingCart;
        // let listProduct = this.state.listProduct;

        let itbis = 0;
        _.forEach(shoppingCart, product => {
            if(product) itbis += product.itbis || 0;
        });
        _.round(itbis, 2);
        // this.setState(prevState => ({ ITBIS: _.add(prevState.ITBIS, n )}));
        this.setState({ ITBIS: itbis });
        this.updateTotal();
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
        let id = e.target.id;
        let shoppingCart = this.state.shoppingCart;
        _.pull(shoppingCart, shoppingCart[id]);
        this.setState({ shoppingCart });

        this.updateItbis();
        this.updateSubTotal();
        this.updateTotal();
    }

    handlePushProduct = () => { 
        let listProduct = this.state.listProduct;
        let productId = this.state.productSelected;
        let amount = this.state.amount;        

        if(productId === null) {
            swal("¡Atención!", "Debe seleccionar un producto para ser agregado.", "info");
            return;
        }

        if(amount < 1) {
            swal("¡Atención!", "Debe especificar una cantidad mayor a cero para agregar este producto.", "info");
            return;
        }

        let currentExistence = listProduct[productId].Existencia_Actual;

        if(amount > currentExistence) {
            swal("¡Atención!", `La cantidad seleccionada no puede exceder la existencia total de este producto. Existencia actual de este producto: ${currentExistence}.`, "info");
            return;
        } else {
            listProduct[productId].Existencia_Actual -= amount;
            this.setState({ listProduct });
        }

        this.addProductToShoppingCart(productId, amount);
        this.addProductToListToShow(productId, amount);
    }

    handleInvoice = () => {
        let clientId = this.state.clientSelected;
        let shoppingCart = this.state.shoppingCart;

        if(clientId === null) {
            swal("¡Atención!", "Debe seleccionar un cliente para facturar.", "info");
            return;
        }

        if(_.size(shoppingCart) < 1 || shoppingCart === null || _.isEmpty(shoppingCart)) {
            swal("¡Atención!", "Debe seleccionar al menos un producto para facturar.", "info");
            return;           
        }

        let listClient = this.state.listClient;
        console.log(listClient);
        let client = listClient[clientId];

        let ITBIS = this.state.ITBIS;
        let subTotal = this.state.Sub_Total;
        let Monto_Total = _.round(_.add(ITBIS, subTotal), 2);

        // @[ID_PRODUCTO]
        // @[Cantidad_Vendida]
        // @[ITBIS]
        // @[Monto]
        // @[Descuento]
        console.log(shoppingCart);
        
        let newArray = [];
        _.forEach(shoppingCart, product => {
            if(product) {
                newArray.push({
                    ID_Producto: product.productId,
                    Monto: product.precioItem,
                    Cantidad_Vendida: product.amount,
                    ITBIS: product.itbis,
                    Descuento: 0
                });
            };
        });

        let SendData = {
            RNC: client.ID,
            Monto_Total: Monto_Total,
            ITBIS_Total: ITBIS, 
            ID_Tipo_Factura: 1,
            ID_Tipo_Pago: 2,
            Descuento: 0,
            Balance: subTotal,
            // ID_Tipo_Pago: client.Tipo_Cliente === 'Persona' ? 1 : 2,S
            JSON: newArray
        }

        // SendData = JSON.stringify(SendData);
        console.log(SendData);

        //@Params: offset
        fetch('http://5.189.156.26:99/invoice/generate',
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(SendData)
            })
            .catch(error => console.log(error));
        /**
         * 
         */


    }

    render() {
        var itbis = this.state.ITBIS || 0;
        var subTotal = this.state.Sub_Total|| 0;
        // var total = this.state.Total || 0;
        var total = _.round(itbis + subTotal, 2);

        var listProduct = this.state.listProduct;
        var listClient = this.state.listClient;
        
        var listToShow = this.state.shoppingCart;
        // productId, 
        //     amount,
        //     itbis, 
        //     precioItem
        if(listToShow !== null && listToShow.length > 0) {
            listToShow = listToShow.map(product => 
                <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{listProduct[product.productId].Nombre_Producto}</td>
                    <td>{listProduct[product.productId].Detalle}</td>
                    <td>{product.amount}</td>
                    <td>{listProduct[product.productId].Precio_Detalle}</td>
                    <td>{product.itbis}</td>
                    <td>{product.precioItem}</td>
                    <td><button type="button" onClick={this.handleRemoveProduct} className="btn btn-sm btn-danger eliminar-producto" id={product.productId}>Eliminar</button></td>
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
                                    <select id="select-client" onChange={e => this.setState({ clientSelected: e.target.value })} className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un cliente</option>
                                        { listClient ? listClient.map(client => <option key={client.ID} value={client.ID}>{`${client.Nombre || ''} ${client.Apellido || ''}`}</option>) : "" }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Producto:
                                    <select id="select-product" onChange={this.handleProductSelected} className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un producto</option>
                                        { listProduct ? listProduct.map(product => <option key={product.ID} value={product.ID}>{product.Nombre_Producto}</option>) : "" }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div>Cantidad:
                                    <input id="input-amount" type="number" className="col-md-12 form-control" onChange={e => this.setState({ amount: _.toNumber(e.target.value) })} disabled={true} min="0" max="0" placeholder="Cantidad" autoComplete="off" />
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
                                                <th>Descripción</th>
                                                <th>Cantidad</th>
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
                                <button type="button" onClick={this.handleInvoice} className="btn btn-secondary guardar-shoppingCart">Finalizar venta</button>
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

// let newArray = [];
// let SendData;
// try{
//     _.forEach(shoppingCart, product => {
//         if(product) {
//             newArray.push({
//                 ID_PRODUCTO: product.productId,
//                 Precio_Producto: product.precioItem,
//                 Cantidad_Vendida: product.amount, 
//                 ITBIS: product.itbis,
//                 Descuento: 0
//             });
//         };
//     });

//     // newArray = newArray.length 
//     if(_.size(newArray) === 1) {
//         // newArray = newArray
//         var returnObj = new Object();
//         returnObj[newArray[0].productId] = newArray;
//         console.log(JSON.stringify(returnObj));
//     }

// }finally{

//     SendData = {
//         RNC: client.ID,
//         Monto_Total: Monto_Total,
//         ITBIS_Total: ITBIS,
//         Descuento: 0,
//         Balance: subTotal,
//         // ID_Tipo_Pago: client.Tipo_Cliente === 'Persona' ? 1 : 2,S
//         JSON: (JSON.stringify(newArray) )
//     }

// }