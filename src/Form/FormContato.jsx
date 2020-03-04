import React from 'react'
import ContatoForm from './ContactForm'

export default props => (
    <div>
        <button onClick={() =>{props.handleModelContato()}} type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Enviar novo contato <i class="fas fa-share-square"></i>
            </button>

        <div className="modal fade modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-primary" id="exampleModalCenterTitle" > Enviar novo contato <i className="fas fa-share-square"></i></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                      <ContatoForm
                            list={props.list}
                            idUser={props.idUser}
                            contato = {props.contato}
                            handleChangeDynamicTrue = {props.handleChangeDynamicTrue}
                            handleChangeDynamicFalse={props.handleChangeDynamicFalse}
                        ></ContatoForm>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" onClick={props.submitForm} data-dismiss="modal">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)