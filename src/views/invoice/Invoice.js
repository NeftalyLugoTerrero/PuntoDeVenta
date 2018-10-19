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
            carrito: null,
            listaParaMostrar: null
        };
        this.handlePushProduct = this.handlePushProduct.bind(this);
        this.handleSearchProduct = this.handleSearchProduct.bind(this);
    }

    componentDidMount() {
        //@Params: offset
        fetch('http://5.189.156.26:99/inventory/get/product?offset=0')
        .then(res => res.json())
        .then(res => this.setState({ listProduct : res }))
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
        let Descripcion = listProduct[product].Descripcion;
        let Precio_Detalle = listProduct[product].Precio_Detalle;

        let mostrarEnLista = {
            ID,
            Nombre_Producto,
            Cantidad,
            Descripcion,
            Precio_Detalle
        }

        if(amount > 0) {
            listaParaMostrar.push(mostrarEnLista);
            this.setState({ listaParaMostrar });
            
        }

        console.log(this.state.listaParaMostrar);
        // this.setState((current, props) => ({
        //     listProduct: current.listProduct + props.increment
        // }));
    }

    render() {
        var listProduct = this.state.listProduct;
        // var listProductMap = listProduct.map((product, key) => 
        //     <tr key={key}>
        //         <td>Producto</td>
        //         <td>Cantidad</td>
        //         <td>Precio</td>
        //         <td>Subtotal</td>
        //         <td><button type="button" class="btn btn-sm btn-danger eliminar-producto" id="idproducto">Eliminar</button></td>
        //     </tr>
        // );

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
                                    <input id="input-amount" type="number" className="col-md-12 form-control" min="0" placeholder="Cantidad" autoComplete="off" />
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
                                {/* { listProduct !== null && listProduct.length > 0 ? ( */}
                                    { 1 === 1 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Nombre</th>
                                                <th>Cantidad</th>
                                                <th>Descripción</th>
                                                <th>Precio unidad</th>
                                                <th>Precio total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {listProductMap} */}
                                            <tr>
                                                <td>Código</td>
                                                <td>Nombre</td>
                                                <td>Cantidad</td>
                                                <td>Descripción</td>
                                                <td>Precio unidad</td>
                                                <td>Precio total</td>
                                                <td><button type="button" className="btn btn-sm btn-danger eliminar-producto" id="idproducto">Eliminar</button></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Sub-Total:</td>
                                                <td>Sub-Total</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>ITBIS (18%):</td>
                                                <td>ITBIS</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Total:</td>
                                                <td>Total</td>
                                                <td></td>
                                            </tr>
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

export default Invoice;
