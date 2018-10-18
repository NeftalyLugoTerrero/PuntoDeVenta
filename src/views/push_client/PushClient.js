import React, { Component } from 'react';
import './PushClient.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';


/*
Ruta: /client/set

params:
@Cedula
@Nombre
@Apellido
@ID_Tipo_Cliente {1: empresa, 2: persona}
@Direccion
@Telefono
@Email
@Sexo: {1: macho, 0: hembra}


*/




class PushClient extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            
        };
        this.handlePushClient = this.handlePushClient.bind(this);
    }

    handlePushClient = () => {
        let Cedula = document.querySelector('#input-client-id').value;
        let Nombre = document.querySelector('#input-client-name').value;
        let Apellido = document.querySelector('#input-client-lastname').value;
        let ID_Tipo_Cliente = document.querySelector('#input-client-type').value;
        let Direccion = document.querySelector('#input-client-adress').value;
        let Telefono = document.querySelector('#input-client-phone').value;
        let Email = document.querySelector('#input-client-email').value;
        let Sexo = document.querySelector('#input-client-gender').value;

        let body = {
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
            method: 'POST',
            body: JSON.stringify(body)
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
        <div className="PushClient">
            <Sidebar classNameActive="client" />
            {/* Page Content  */}
            <div className="m-content">
                <Header />
                
                <div style={{paddingLeft:"50px", paddingRight:"50px"}}>
                    <div className="container">
                        <div className="page-header">
                            <h3>Agregar cliente</h3>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div>Cédula o RNC:
                                    <input id="input-client-id" required type="text" className="col-md-12 form-control" placeholder="Cédula" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Nombre(s):
                                    <input id="input-client-name" required type="text" className="col-md-12 form-control" placeholder="Nombre del cliente" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>Apellidos:
                                    <input id="input-client-lastname" required type="text" className="col-md-12 form-control" placeholder="Nombre del cliente" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div>Tipo de cliente:
                                    <select id="input-client-type" required className="col-md-12 form-control">
                                        <option disabled>Seleccione el tipo de cliente</option>
                                        <option value={"2"}>Persona</option>
                                        <option value={"1"}>Empresa</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col-md-4">
                                <div>Dirreción:
                                    <input id="input-client-adress" type="text" required className="col-md-12 form-control" placeholder="Dirreción" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>Teléfono:
                                    <input id="input-client-phone" type="tel" required minLength="10" maxLength="14" className="col-md-12 form-control" placeholder="Teléfono" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>Correo:
                                    <input id="input-client-email" type="email" required className="col-md-12 form-control" placeholder="Correo" autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div>Sexo:
                                    <select id="input-client-gender" required className="col-md-12 form-control">
                                        <option disabled>Seleccione el sexo</option>
                                        <option value={"1"}>Hombre</option>
                                        <option value={"0"}>Mujer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br />
                        
                        <div className="row">
                            <div className="col-md-12 text-left">
                                <button type="button" onClick={this.handlePushClient} className="btn btn-secondary guardar-carrito">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default PushClient;
