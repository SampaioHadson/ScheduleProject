import React from 'react'
//import IconButton from '../template/iconButton'
//import ButtonDelete from './buttonDelete'
import FormContato from '../Form/FormContato'
import FormNewInput from '../Form/FormNewInput'
import FormContatoEdit from '../Form/formContatoEdit'
import ContatoForm from '../Form/ContactForm'

export default props => {
  const contact = props.contact || []
  const listaAtributos = props.listaAtributos || []
  const atributes = props.listaAtributos || []

  const renderThead = () => {
    const comps = atributes.map((v, k) => {
      if (v.inputAtributo == 'hidden') {
        return
      }
      return (
        <th key={v.id}>{v.nomeAtributo.toUpperCase()}</th>
      )

    })
    return comps
  }

  const handleSelectSource = () => {
    const comps = atributes.map((v, k) => {
      if (v.inputAtributo == 'hidden') {
        return
      }
      //console.log(v.nomeAtributo)
      return (
        <option value={v.nomeAtributo}>{v.nomeAtributo}</option>
      )
    })
    return comps
  }

  const renderRows = () => {
    console.log(contact)
    //console.log('CONTACTLIST')
    let value = ''
    let valueKey = 1
    const comps = contact.map((contactt, k) => {
      value = ''
      const top = listaAtributos.map((contato, k) => {
        let nameAtribute = contato.nomeAtributo.replace(/ /g, "_")
        nameAtribute = nameAtribute.toLowerCase();
        if (contato.dinamic === true) {
          let stmt = `contactt.dynamicField.valueFields.${nameAtribute}`
          value = eval(stmt)
          valueKey += 1
          return (<td key={valueKey}>{value}</td>)
        } else {
          if (contato.nomeAtributo == 'id_cli_fk') {
            let stmt = `contactt.usuario.id`
          } else {
            let stmt = `contactt.${nameAtribute}`
            value = eval(stmt)
            valueKey += 1

            return (<td key={valueKey}>{value}</td>)
          }
        }
      })
      valueKey += 1
      return (
        <tr key={valueKey}>
          {top}
          <td>
            {/**                <FormContatoEdit
                  contato={contactt}
                  idUser={props.idUser}
                  list={props.listaAtributos}
                  submitForm={props.submitForm}
                  handleChangeDynamicTrue={props.handleChangeDynamicTrue}
                  handleChangeDynamicFalse={props.handleChangeDynamicFalse}
                  handleEditContact={props.handleEditContact}
                  contatoEdit={contactt}
                /> */}

                <button className='btn btn-danger' style={{ marginRight: 2 }} onClick={() => { props.handleDeleteContato(contactt.id) }}><i class="fas fa-trash-alt"></i></button>
                <button type="button"   onClick={() => { props.handleEditContact(contactt) }} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenterA"><i class="fas fa-user-edit"></i></button>

          </td>
        </tr>)
    })
    return (comps)
  }

  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <FormContato
              idUser={props.idUser}
              list={props.listaAtributos}
              submitForm={props.submitForm}
              contato={props.contato}
              handleChangeDynamicTrue={props.handleChangeDynamicTrue}
              handleChangeDynamicFalse={props.handleChangeDynamicFalse}
              handleModelContato = {props.handleModelContato}
            ></FormContato>
          </div>
          <div className='col'>
            <FormNewInput
              contato = {props.listaAtributos}
              listaDeAtributosDinamicos={props.listaDeAtributosDinamicos}
              addNewCampo={props.addNewCampo}
            ></FormNewInput>
          </div>
        </div>
      </div>

      {/**  <select >
        {handleSelectSource()}
        <option value='' selected>Filtro</option>
      </select>*/}

      <table className='table table-striped table-hover table-borderless' style={{ marginTop: 20 }}>
        <thead className='bg-primary'>
          <tr>
            {renderThead()}
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
      <div>

      <div className="modal fade modal" id="exampleModalCenterA" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterA  Title" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-primary" id="exampleModalCenterATitle" > AAEnviar novo contato <i className="fas fa-share-square"></i></h5>
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
    </div>

  )
}
