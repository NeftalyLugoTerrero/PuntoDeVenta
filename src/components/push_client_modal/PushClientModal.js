import React, { Component } from 'react';
import _ from 'lodash';
// import './PushCLientModal.css';
// import { Link } from 'react-router-dom';

// path: /client/delete
// params: @ID

class PushCLientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handlePushClient = this.handlePushClient.bind(this);
    }

    handlePushClient = () => {
        let Cedula = _.trim(document.querySelector('#input-client-id').value);
        let Nombre = _.trim(document.querySelector('#input-client-name').value);
        let Apellido = _.trim(document.querySelector('#input-client-lastname').value);
        let ID_Tipo_Cliente = _.trim(document.querySelector('#input-client-type').value);
        let Direccion = _.trim(document.querySelector('#input-client-adress').value);
        let Telefono = _.trim(document.querySelector('#input-client-phone').value);
        let Email = _.trim(document.querySelector('#input-client-email').value);
        let Sexo = _.trim(document.querySelector('#input-client-gender').value);
        let ID = 0;

        let body = {
            ID,
            Cedula,
            Nombre,
            Apellido,
            ID_Tipo_Cliente,
            Direccion,
            Telefono,
            Email,
            Sexo
        };
        console.log(body);

        //@Params: offset
        fetch('http://5.189.156.26:99/client/set',
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="PushCLientModal" style={{ width: "100%" }}>
                {/* add roduct */}
                <div className="modal fade" id="pushCLientModal" tabIndex={-1} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* <form className="form-horizontal" id="submitClientForm" onSubmit={e => e.preventDefault()}> */}
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                <h4 className="modal-title" style={{ position: "absolute" }}><i className="fa fa-plus" /> Agregar cliente</h4>
                            </div>
                            <div className="modal-body" style={{ maxHeight: 450, overflow: 'auto' }}>
                                <div id="add-client-messages" />
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-client-id" className="col-sm-3 control-label">Cédula </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" minLength="11" maxLength="11" id="input-client-id" placeholder="Cédula" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-client-name" className="col-sm-3 control-label">Nombre(s) </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" minLength="3" id="input-client-name" placeholder="Nombre(s)" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-client-lastname" className="col-sm-3 control-label">Apellidos </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" minLength="3" id="input-client-lastname" placeholder="Apellidos" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-client-type" className="col-sm-3 control-label">Tipo </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="input-client-type">
                                            <option disabled>Seleccionar tipo de cliente</option>
                                            <option value={2}>Persona</option>
                                            <option value={1}>Empresa</option>
                                        </select>
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-client-adress" className="col-sm-3 control-label">Dirección </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" minLength="5" id="input-client-adress" placeholder="Dirección" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-client-phone" className="col-sm-3 control-label">Teléfono </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control" id="input-client-phone" minLength="10" maxLength="10" placeholder="Teléfono" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="input-client-email" className="col-sm-3 control-label">Correo </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <input type="email" className="form-control" minLength="10" id="input-client-email" placeholder="Correo" autoComplete="off" />
                                    </div>
                                </div> {/* /row*/}
                                <div className="row centered">
                                    <label htmlFor="input-client-gender" className="col-sm-3 control-label">Sexo </label>
                                    <label className="col-sm-1 control-label">: </label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="input-client-gender">
                                            <option disabled>Seleccionar sexo del cliente</option>
                                            <option value={1}>Hombre</option>
                                            <option value={0}>Mujer</option>
                                        </select>
                                    </div>
                                </div> {/* /row*/}
                            </div> {/* /modal-body */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign" /> Cerrar</button>
                                <button type="submit" className="btn btn-primary" onClick={this.handlePushClient} data-loading-text="Loading..." autoComplete="off"> <i className="glyphicon glyphicon-ok-sign" /> Guardar cambios</button>
                            </div> {/* /modal-footer */}
                            {/* </form> */}
                        </div> {/* /modal-content */}
                    </div> {/* /modal-dailog */}
                </div>
                {/* /add client */}

            </div>
        );
    }
}

export default PushCLientModal;
