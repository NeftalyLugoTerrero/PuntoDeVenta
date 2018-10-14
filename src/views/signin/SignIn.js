import React, { Component } from 'react';
import './SignIn.css';
import './util.css';
import swal from 'sweetalert';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;

        swal({
            title: "Iniciar Sesión",
            text: `${username} ${password}`,
            icon: "",
            button: "Aceptar",
        });
    }

    render() {
        return (
            <div className="SignIn">
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-form-title" style={{backgroundImage: 'url(./images/bg-01.jpg)'}}>
                                <span className="login100-form-title-1">Iniciar Sesión</span>
                            </div>
                            <form onSubmit={e => e.preventDefault()} className="login100-form validate-form">
                                <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                    <span className="label-input100">Usuario</span>
                                        <input className="input100" type="text" name="username" id="username" placeholder="Enter username" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                    <span className="label-input100">Contraseña</span>
                                        <input className="input100" type="password" name="pass" id="password" placeholder="Enter password" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="flex-sb-m w-full p-b-30">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                        <label className="label-checkbox100" htmlFor="ckb1">Recordarme</label>
                                    </div>
                                    <div>
                                        <a href="#" className="txt1">¿Olvidé la contraseña?</a>
                                    </div>
                                </div>
                                <div className="container-login100-form-btn">
                                    <button onClick={this.handleSubmit} className="login100-form-btn">Ingresar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
