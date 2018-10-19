import React, { Component } from 'react';
import { InvoiceNavRoutes } from '../../routes/InvoiceNavRoutes';
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
            listProduct: [],
            listClient: [],
            carrito: [],
            listaParaMostrar: [],
            ITBIS: 0,
            Total: 0,
            Sub_Total: 0
        };
        this.handlePushProduct = this.handlePushProduct.bind(this);
        this.handleSearchProduct = this.handleSearchProduct.bind(this);
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    }

    componentDidMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/inventory/get/product?offset=0')
        .then(res => res.json())
        .then(res => this.setState({ listProduct : res }))
        .catch(error => console.log(error));

        //@Params: offset
        fetch('http://5.189.156.26:99/client/list?offset=0')
        .then(res => res.json())
        .then(res => this.setState({ listClient : res }))
        .catch(error => console.log(error));
    }

    handleSearchProduct = () => {
        let product = document.querySelector('input-search-product').value;
        //@Params: find
        fetch(`http://5.189.156.26:99/inventory/search/carproduct?find=${product}`)
        .then(res => res.json())
        .then(res => this.setState({ listProduct : res }))
        .catch(error => console.log(error));
    }

    handleDeleteProduct = (e) => {
        let ID = e.target.id;
    }

    handlePushProduct = () => {
        let product = document.querySelector('#select-product').value;
        let amount = document.querySelector('#input-amount').value;
        // alert(product +" "+ amount);
        let listProduct = this.state.listProduct;
        let listaParaMostrar = this.state.listaParaMostrar;
        
        console.log(listProduct[product]);
        let ID = product;
        let Nombre_Producto = listProduct[product].Nombre_Producto;
        let Cantidad = amount;
        let Detalle = listProduct[product].Detalle;
        let Precio_Detalle = listProduct[product].Precio_Detalle;

        let Precio_Total = Number(Cantidad * Precio_Detalle).toFixed(2);
        let ITBIS = Number(0.18 * Precio_Total).toFixed(2);
        // let ITBISPRODUCT = ITBIS.toFixed(2);

        let mostrarEnLista = {
            ID,
            Nombre_Producto,
            Cantidad,
            Detalle,
            Precio_Detalle,
            Precio_Total,
            ITBIS
        }

        if(amount > 0) {
            listaParaMostrar.push(mostrarEnLista);
            this.setState({ listaParaMostrar });
            
            let ITBIS2 = Number(this.state.ITBIS + ITBIS).toFixed(2);
            this.setState({ ITBIS: ITBIS2 });

            let Sub_Total2 = Number(this.state.Sub_Total + Precio_Total).toFixed(2);
            this.setState({ Sub_Total: Sub_Total2 });

            let Total2 = this.state.Total + Precio_Total + ITBIS;
            Total2 = Number(Total2).toFixed(2);
            this.setState({ Total: Total2 });

            // let Total2 = this.state.Total;
            // this.setState({ Sub_Total: Precio_Total + Sub_Total2 });
            
        }

        console.log(this.state.listaParaMostrar);
        // this.setState((current, props) => ({
        //     listProduct: current.listProduct + props.increment
        // }));
    }

    render() {
        var listProduct = this.state.listProduct;
        var listClient = this.state.listClient;
        
        var listaParaMostrar = this.state.listaParaMostrar;
        if(listaParaMostrar !== null && listaParaMostrar.length > 0) {
            listaParaMostrar = listaParaMostrar.map(product => 
                <tr key={product.ID}>
                    <td>{product.ID}</td>
                    <td>{product.Nombre_Producto}</td>
                    <td>{product.Cantidad}</td>
                    <td>{product.Detalle}</td>
                    <td>{product.Precio_Detalle}</td>
                    <td>{product.ITBIS}</td>
                    <td>{product.Precio_Total}</td>
                    <td><button type="button" onClick={this.handleDeleteProduct} class="btn btn-sm btn-danger eliminar-producto" id={product.ID}>Eliminar</button></td>
                </tr>
            );
        } else {
            listaParaMostrar = <td>No hay producto en la factura</td>;
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
                                    {/* <input id="input-search-product" onChange={this.handleSearchProduct} type="text" className="col-md-12 form-control" placeholder="Código o nombre del Cliente" autoComplete="off" /> */}
                                    <select id="select-client" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un cliente</option>
                                        { listClient ? listClient.map(client => <option value={client.ID}>{client.Nombre}</option>) : "" }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Producto:
                                    {/* <input id="input-search-product" onChange={this.handleSearchProduct} type="text" className="col-md-12 form-control" placeholder="Código o nombre del producto" autoComplete="off" /> */}
                                    <select id="select-product" className="col-md-12 form-control">
                                        <option selected disabled>Seleccione un producto</option>
                                        { listProduct ? listProduct.map(product => <option value={product.ID}>{product.Nombre_Producto}</option>) : "" }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div>Cantidad:
                                    <input id="input-amount" type="number" className="col-md-12 form-control" min="1" placeholder="Cantidad" autoComplete="off" />
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
                                { listaParaMostrar !== null && listaParaMostrar.length > 0 ? (
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
                                            {listaParaMostrar}
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
                                                <td>{this.state.Sub_Total || 0}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>ITBIS (18%):</td>
                                                <td>{this.state.ITBIS || 0}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Total:</td>
                                                <td>{this.state.Total || 0}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : <div className="panel-body"><td>No hay productos agregados</td></div>
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

export default Invoice;
