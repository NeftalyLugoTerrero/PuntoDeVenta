import React, { Component } from 'react';
import swal from 'sweetalert';
// import './AddProductModal.css';
// import { Link } from 'react-router-dom';

class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            amount: 0
        };
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }

    handleAddProduct = () => {
        // let ID = document.querySelector('#input-product-id').valueAsNumber;
        // let Cantidad = document.querySelector('#input-product-amount').value;
        let ID = this.state.id || null;
        let Cantidad = this.state.amount || 0;

        // Agregar cantidad a un producto ya registrado (compra)
        if(ID === null || ID < 1) {
            swal("Debe especificar un código de producto válido.", { icon: "info" })
            return;
        }

        let body = { ID, Cantidad };

        fetch('http://5.189.156.26:99/product/update/quantity',
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            .then(() => {
                swal("¡El producto ha sido actualizado correctamente!", { icon: "success" })
                .then(() => {
                    window.location.reload();
                });
            })
            .catch(error => console.log(error));
            
    }

    render() {
        return (
            <div className="AddProductModal" style={{ width: "100%" }}>
                {/* add product */}
                <div className="modal fade" id="addProductModal" tabIndex={-1} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* <form className="form-horizontal" id="submitProductForm" onSubmit={e => e.preventDefault()}> */}
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                <h4 className="modal-title" style={{ position: "absolute" }}><i className="fa fa-plus" /> Agregar producto</h4>
                            </div>
                            <div className="modal-body" style={{ maxHeight: 450, overflow: 'auto' }}>
                                <div id="add-product-messages" />
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-product-id" className="col-sm-3 control-label">Código </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" onChange={e => this.setState({ id: e.target.valueAsNumber })} min={1} id="input-product-id" placeholder="Código del producto" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="row centered">
                                    <label htmlFor="input-product-amount" className="col-sm-3 control-label">Cantidad </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" onChange={e => this.setState({ amount: e.target.valueAsNumber })} id="input-product-amount" placeholder="Cantidad" autoComplete="off" />
                                    </div>
                                </div>
                            </div> {/* /modal-body */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign" /> Cerrar</button>
                                <button type="submit" onClick={this.handleAddProduct} className="btn btn-primary"  id="createProductBtn" data-loading-text="Loading..." autoComplete="off"> <i className="glyphicon glyphicon-ok-sign" /> Guardar cambios</button>
                            </div> {/* /modal-footer */}
                            {/* </form> */}
                        </div> {/* /modal-content */}
                    </div> {/* /modal-dailog */}
                </div>
                {/* /add product */}

            </div>
        );
    }
}

export default AddProductModal;
