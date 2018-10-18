import React, { Component } from 'react';
// import './PushProductModal.css';
// import { Link } from 'react-router-dom';

class PushProductModal extends Component {
    render() {
        return (
            <div className="PushProductModal" style={{ width: "100%" }}>
                {/* add product */}
                <div className="modal fade" id="pushProductModal" tabIndex={-1} role="dialog">
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
                                    <label htmlFor="productCode" className="col-sm-3 control-label">Código </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="productCode" placeholder="Código del producto" name="productCode" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="productName" className="col-sm-3 control-label">Nombre </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="productName" placeholder="Nombre del producto" name="productName" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="quantity" className="col-sm-3 control-label">Cantidad </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="quantity" placeholder="Cantidad" name="quantity" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="rate" className="col-sm-3 control-label">Precio </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    {/* <div className="col-sm-8">
                                        <input type="text" className="form-control" id="rate" placeholder="Precio" name="rate" autoComplete="off" />
                                    </div> */}
                                    <div className="input-group col-sm-8">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">RD$</div>
                                        </div>
                                        <input id="input-product-price" type="number" className="form-control" id="inlineFormInputGroup" min={0} defaultValue={0} placeholder="Precio" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="brandName" className="col-sm-3 control-label">Proveedor </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="brandName" name="brandName">
                                            <option selected disabled>Seleccionar proveedor</option>
                                            <option value={1}>La Casita</option>
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
                                    <label htmlFor="categoryName" className="col-sm-3 control-label">Categoría </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <select type="text" className="form-control" id="categoryName" placeholder="Product Name" name="categoryName">
                                            <option selected disabled>Seleccionar categoría</option>
                                            <option value={1}>Tuberculo</option>
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
                                <button type="submit" className="btn btn-primary" id="createProductBtn" data-loading-text="Loading..." autoComplete="off"> <i className="glyphicon glyphicon-ok-sign" /> Guardar cambios</button>
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
