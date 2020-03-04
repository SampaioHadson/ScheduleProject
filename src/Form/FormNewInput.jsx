import React from 'react'

export default props => {

    const SendNewInput = () => {
        let NewCampo = {
            nomeAtributo: '',
            typeAtributo: '',
            placeHolderAtributo: '',
            inputAtributo: '',
            dinamic: ''
        }

        NewCampo.nomeAtributo = document.getElementById('nomeatributo').value
        NewCampo.typeAtributo = document.getElementById('tipoatributo').value
        NewCampo.placeHolderAtributo = document.getElementById('placeatributo').value
        NewCampo.inputAtributo = document.getElementById('inputatributo').value
        NewCampo.dinamic = true
        props.addNewCampo(NewCampo);
    }

    return (
        <div>
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#dynamicinput">
                Gerenciar atributos <i class="fas fa-stream"></i>
            </button>

            <div class="modal fade" id="dynamicinput" tabindex="-1" role="dialog" aria-labelledby="dynamicinputTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-primary" id="dynamicinputTitle"> Gerenciar atributos <i class="fas fa-stream"></i></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className='container-fluid'>
                                <div>
                                    {props.listaDeAtributosDinamicos()}
                                </div>

                                <div>
                                    <h5 className='h5 text-primary'>Cadastrar novo campo <i className="fas fa-share-square"></i></h5>
                                    <input id='nomeatributo' className='form-control' placeholder='Digite o nome do campo' style={{marginTop: 10}}></input>
                                    <select id='tipoatributo' className='form-control' style={{marginTop: 10}}>
                                        <option value=""></option>
                                        <option value="string">String</option>
                                        <option value="int">Integer</option>
                                        <option value="boolean">Boolean</option>
                                        <option value="byte">Byte</option>
                                    </select>
                                    <input id='placeatributo' className='form-control' placeholder='Digite o placeholder do campo' style={{marginTop: 10}}></input>
                                    <select id="inputatributo" className='form-control' style={{marginTop: 10}}>
                                        <option value=""></option>
                                        <option value="input">Mostrar</option>
                                        <option value="hidden">Ocultar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={SendNewInput}>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}