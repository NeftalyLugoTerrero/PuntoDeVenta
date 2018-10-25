import React, { Component } from 'react';
import swal from 'sweetalert';
// import './PushProductModal.css';
// import { Link } from 'react-router-dom';

class PushProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProvider: null,
            listCategory: null
        };
        this.handlePushProduct = this.handlePushProduct.bind(this);
    }

    componentWillMount = () => {
        // path: /product/complement
        //methos: GET
        //return 2 arrays [0]=> provider, [1] => type product

        fetch('http://5.189.156.26:99/product/complement')
            .then(res => res.json())
            .then(res => {
                this.setState({ listProvider: res[0] });
                this.setState({ listCategory: res[1] });
            })
            .catch(error => console.log(error));
    }

    handlePushProduct = () => {
        // let RNC = document.querySelector('#input-product-id').value;
        let Nombre = document.querySelector('#input-product-name').value;
        let Existencia_Actual = document.querySelector('#input-product-amount').value;
        let Precio_Detalle = document.querySelector('#input-product-price').value;
        // let Precio_Detalle = 123456;
        let ID_Proveedor = document.querySelector('#input-product-provider').value;
        let ID_Tipo = document.querySelector('#input-product-category').value;
        let Detalle = document.querySelector('#input-product-description').value;

        // Registrar Por Primera Vez
        let body = {
            ID: 0,
            Detalle,
            Nombre,
            Existencia_Actual,
            Precio_Detalle,
            ID_Proveedor,
            ID_Tipo
        };

        console.log(body);

        //@Params: offset
        fetch('http://5.189.156.26:99/product/set',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            .then(() => {
                swal("¡Éxito!", "El producto ha sido agregado correctamente", "success")
                .then(() => window.location.reload());
            })
            .catch(error => console.log(error));
    }

    render() {
        var listProvider = this.state.listProvider;
        var listCategory = this.state.listCategory;

        return (
            <div className="PushProductModal" style={{ width: "100%" }}>
                {/* add product */}
                <div className="modal fade" id="pushProductModal" tabIndex={-1} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* <form className="form-horizontal" id="submitProductForm" onSubmit={e => e.preventDefault()}> */}
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                <h4 className="modal-title" style={{ position: "absolute" }}><i className="fa fa-plus" /> Registrar producto</h4>
                            </div>
                            <div className="modal-body" style={{ maxHeight: 450, overflow: 'auto' }}>
                                <div id="add-product-messages" />
                                {/* <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="productCode" className="col-sm-3 control-label">Código </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="productCode" placeholder="Código del producto" name="productCode" autoComplete="off" />
                                    </div>
                                </div> */}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-product-name" className="col-sm-3 control-label">Nombre </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="input-product-name" placeholder="Nombre del producto" name="productName" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-product-description" className="col-sm-3 control-label">Descripción </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="input-product-description" placeholder="Descripción" name="productName" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-product-amount" className="col-sm-3 control-label">Cantidad </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" id="input-product-amount" placeholder="Cantidad" name="quantity" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-product-price" className="col-sm-3 control-label">Precio </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="input-group col-sm-8">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">RD$</div>
                                        </div>
                                        <input id="input-product-price" type="number" className="form-control" min={0} defaultValue={0} placeholder="Precio" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-product-provider" className="col-sm-3 control-label">Proveedor </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <select defaultValue="Seleccionar" className="form-control" id="input-product-provider" name="brandName">
                                            <option value="Seleccionar" disabled>Seleccionar proveedor</option>
                                            {listProvider ? listProvider.map(provider => <option key={provider.ID} value={provider.ID}>{provider.Nombre}</option>) : ""}
                                            {/* <?php 
                                            $sql = "SELECT brand_id, brand_name, brand_active, brand_status FROM brands WHERE brand_status = 1 AND brand_active = 1";
                                                    $result = $connect->query($sql);

                                                    while($row = $result->fetch_array()) {
                                                        echo "<option value='".$row[0]."'>".$row[1]."</option>";
                                                    } // while
                                                    
                                            ?> */}
                                        </select>
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered">
                                    <label htmlFor="input-product-category" className="col-sm-3 control-label">Categoría </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <select type="text" className="form-control" id="input-product-category" placeholder="Categoría">
                                            <option selected disabled>Seleccionar categoría</option>
                                            {listCategory ? listCategory.map(category => <option key={category.ID} value={category.ID}>{category.Nombre}</option>) : ""}
                                            {/* <?php 
                                            $sql = "SELECT categories_id, categories_name, categories_active, categories_status FROM categories WHERE categories_status = 1 AND categories_active = 1";
                                                    $result = $connect->query($sql);

                                                    while($row = $result->fetch_array()) {
                                                        echo "<option value='".$row[0]."'>".$row[1]."</option>";
                                                    } // while
                                                    
                                            ?> */}
                                        </select>
                                    </div>
                                </div> {/* /row*/}
                                {/* <div className="row centered"  style={{ marginTop: '20px' }}>
                                    <label htmlFor="productStatus" className="col-sm-3 control-label">Estado </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="productStatus" name="productStatus">
                                            <option selected disabled>Seleccionar estado</option>
                                            <option value={1}>Disponible</option>
                                            <option value={2}>No disponible</option>
                                        </select>
                                    </div>
                                </div> /row */}
                            </div> {/* /modal-body */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign" /> Cerrar</button>
                                <button type="submit" onClick={this.handlePushProduct} className="btn btn-primary" id="createProductBtn" data-loading-text="Loading..." autoComplete="off"> <i className="glyphicon glyphicon-ok-sign" /> Guardar cambios</button>
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

export default PushProductModal;
