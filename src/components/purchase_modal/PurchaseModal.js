import React, { Component } from 'react';
import swal from 'sweetalert';
import './PurchaseModal.css';
// import { Link } from 'react-router-dom';

class PurchaseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }

    handleAddProduct = () => {
        let ID = document.querySelector('#input-product-id').value;
        let Cantidad = document.querySelector('#input-product-amount').value;

        // Agregar cantidad a un producto ya registrado (compra)
        let body = {
            ID,
            Cantidad
        };
        console.log(body);

        //@Params: offset
        fetch('http://5.189.156.26:99/product/update/quantity',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            .catch(error => console.log(error));

    }

    render() {
        return (
            <div className="PurchaseModal" style={{ width: "100%" }}>
                {/* add product */}
                <div class="modal fade" id="purchaseModal" tabindex="-1" role="dialog" aria-labelledby="purchaseModalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="purchaseModalTitle">Punto de Venta</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="container">
                                    {/*  */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card ">
                                                <div className="card-header">
                                                    <h3 className="text-xs-center"><strong>Factura</strong></h3>
                                                </div>
                                                <div className="card-block">
                                                    <div className="table-responsive">
                                                        <table className="table table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <td><strong>Descripción</strong></td>
                                                                    <td className="text-xs-center"><strong>Precio Unit.</strong></td>
                                                                    <td className="text-xs-center"><strong>Cantidad</strong></td>
                                                                    <td className="text-xs-right"><strong>Total</strong></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Samsung Galaxy S5</td>
                                                                    <td className="text-xs-center">$900</td>
                                                                    <td className="text-xs-center">1</td>
                                                                    <td className="text-xs-right">$900</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Samsung Galaxy S5 Extra Battery</td>
                                                                    <td className="text-xs-center">$30.00</td>
                                                                    <td className="text-xs-center">1</td>
                                                                    <td className="text-xs-right">$30.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen protector</td>
                                                                    <td className="text-xs-center">$7</td>
                                                                    <td className="text-xs-center">4</td>
                                                                    <td className="text-xs-right">$28</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="highrow" />
                                                                    <td className="highrow" />
                                                                    <td className="highrow text-xs-center"><strong>Subtotal</strong></td>
                                                                    <td className="highrow text-xs-right">$958.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="emptyrow" />
                                                                    <td className="emptyrow" />
                                                                    <td className="emptyrow text-xs-center"><strong>ITBIS</strong></td>
                                                                    <td className="emptyrow text-xs-right">$20</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="emptyrow"><i className="fa fa-barcode iconbig" /></td>
                                                                    <td className="emptyrow" />
                                                                    <td className="emptyrow text-xs-center"><strong>Total</strong></td>
                                                                    <td className="emptyrow text-xs-right">$978.00</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary">Finalizar venta</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /add product */}

            </div>
        );
    }
}

export default PurchaseModal;

// <div className="row">
//                                         <div className="col-xs-12">
//                                             <div className="text-xs-center">
//                                                 <i className="fa fa-search-plus float-xs-left icon" />
//                                                 <h2>Invoice for purchase #33221</h2>
//                                             </div>
//                                             <hr />
//                                             <div className="row">
//                                                 <div className="col-xs-12 col-md-3 col-lg-3 float-xs-left">
//                                                     <div className="card  height">
//                                                         <div className="card-header">Billing Details</div>
//                                                         <div className="card-block">
//                                                             <strong>David Peere:</strong><br />
//                                                             1111 Army Navy Drive<br />
//                                                             Arlington<br />
//                                                             VA<br />
//                                                             <strong>22 203</strong><br />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-xs-12 col-md-3 col-lg-3">
//                                                     <div className="card  height">
//                                                         <div className="card-header">Payment Information</div>
//                                                         <div className="card-block">
//                                                             <strong>Card Name:</strong> Visa<br />
//                                                             <strong>Card Number:</strong> ***** 332<br />
//                                                             <strong>Exp Date:</strong> 09/2020<br />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-xs-12 col-md-3 col-lg-3">
//                                                     <div className="card  height">
//                                                         <div className="card-header">Order Preferences</div>
//                                                         <div className="card-block">
//                                                             <strong>Gift:</strong> No<br />
//                                                             <strong>Express Delivery:</strong> Yes<br />
//                                                             <strong>Insurance:</strong> No<br />
//                                                             <strong>Coupon:</strong> No<br />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-xs-12 col-md-3 col-lg-3 float-xs-right">
//                                                     <div className="card  height">
//                                                         <div className="card-header">Shipping Address</div>
//                                                         <div className="card-block">
//                                                             <strong>David Peere:</strong><br />
//                                                             1111 Army Navy Drive<br />
//                                                             Arlington<br />
//                                                             VA<br />
//                                                             <strong>22 203</strong><br />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>