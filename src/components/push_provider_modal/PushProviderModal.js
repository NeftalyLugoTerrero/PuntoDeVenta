import React, { Component } from 'react';
// import './PushProviderModal.css';
// import { Link } from 'react-router-dom';

class PushProviderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handlePushProvider = this.handlePushProvider.bind(this);
    }

    handlePushProvider = () => {
        let RNC = document.querySelector('#input-provider-id').value;
        let Nombre = document.querySelector('#input-provider-name').value;
        let Descripcion = document.querySelector('#input-provider-description').value;
        let Direccion = document.querySelector('#input-provider-adress').value;
        let Telefono = document.querySelector('#input-provider-phone').value;
        let Email = document.querySelector('#input-provider-email').value;
        let ID = 0;

        let body = {
            ID,
            RNC,
            Nombre,
            Descripcion,
            Direccion,
            Telefono,
            Email
        };
        console.log(body);

        //@Params: offset
        fetch('http://5.189.156.26:99/provider/set',
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            .catch(error => console.log(error));
    }
    
    render() {
        return (
            <div className="PushProviderModal" style={{ width: "100%" }}>
                {/* add roduct */}
                <div className="modal fade" id="pushProviderModal" tabIndex={-1} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* <form className="form-horizontal" id="submitProviderForm" onSubmit={e => e.preventDefault()}> */}
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                <h4 className="modal-title" style={{ position: "absolute" }}><i className="fa fa-plus" /> Agregar proveedor</h4>
                            </div>
                            <div className="modal-body" style={{ maxHeight: 450, overflow: 'auto' }}>
                                <div id="add-provider-messages" />
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-provider-id" className="col-sm-3 control-label">RNC </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="input-provider-id" placeholder="RNC" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-provider-name" className="col-sm-3 control-label">Nombre </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="input-provider-name" placeholder="Nombre(s)" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-provider-description" className="col-sm-3 control-label">Descripción </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="input-provider-description" placeholder="Descripción" name="rate" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-provider-adress" className="col-sm-3 control-label">Dirección </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="input-provider-adress" placeholder="Dirección" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-provider-phone" className="col-sm-3 control-label">Teléfono </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="input-provider-phone" minLength="10" maxLength="14" placeholder="Teléfono" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-provider-email" className="col-sm-3 control-label">Correo </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="email" className="form-control" id="input-provider-email" placeholder="Correo" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                            </div> {/* /modal-body */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign" /> Cerrar</button>
                                <button type="submit" className="btn btn-primary" onClick={this.handlePushProvider} data-loading-text="Loading..." autoComplete="off"> <i className="glyphicon glyphicon-ok-sign" /> Guardar cambios</button>
                            </div> {/* /modal-footer */}
                            {/* </form> */}
                        </div> {/* /modal-content */}
                    </div> {/* /modal-dailog */}
                </div>
                {/* /add provider */}

            </div>
        );
    }
}

export default PushProviderModal;
