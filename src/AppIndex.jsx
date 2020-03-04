import React, { Component } from 'react'
import axios from 'axios'
import UserForm from './Form/UserForm'
import ContatoForm from './Form/ContactForm'
import UserList from './List/UserList'
import ContatoList from './List/ContatoList'
import Alert from './Messages/Alert'
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
//import arrayMove from 'array-move';
import arrayMove from 'array-move';



let SortableItem = sortableElement(({ value }) => <li className="list-group-item" onClick={() => console.log("AAA")}  >{value}</li>);

let SortableContainer = sortableContainer(({ children }) => {
  return <ul onClick={() => console.log(children)} className="list-group" >{children}</ul>;
});
//.props.value.props.children

export default class Contato extends Component {


  state = {
    userName: '',
    idUser: '',
    nome: '',
    list: [],
    tipo: '',
    desc: '',
    idcont: 0,
    user: 0,
    contlist: [],
    updatecontact: '',
    brands: [],
    brand: '',
    addContact: '',
    contact: [],
    listaAtributos: [],
    contato: '',
    editContactAtive: '',
    idContato: 0,
    listForm: [],
    exitForm: '',
    ativo: '',
    alert: '',
    items: []
  }

  mostrarOrdem = (children) => {
    console.log(children)
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };


  dragquinkk = () => {
    this.refreshListContato()
    let toprson = []
    let itensADD = []
    axios.get('http://localhost:8080/Api/AtributosContato/')
      .then((resp) => {
        resp.data.forEach(atributo => {
          if (atributo.inputAtributo != 'hidden') {
            itensADD.push(<div class="row">
              <div class="col-sm">{atributo.nomeAtributo}</div>
              <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenterA"><i class="fas fa-trash"></i></button>
            </div>)
          }
        })
      })
    this.setState({ items: itensADD })
  }

  mostrarDragQuin = () => {

    //const items = this.state.items
    let { items } = this.state;
    let x = 0
    console.log("****************************")
    return (
      <SortableContainer onSortEnd={this.onSortEnd}>
        {items.map((value, index) => {
          console.log("-------------------------")
          console.log(value.props.children[0].props.children)
          console.log(index)
          console.log("-------------------------")
          x++
          return (
            <SortableItem key={`item-${value}-${x}`} index={index} value={value} />
          )
          x = x + 1
        })}
      </SortableContainer>
    )
  }

  addNewContactDinamic = () => {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    console.log("AQUI PORAAAAAAAAAAAAAAAAA")
    console.log("OPORRA")
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    axios.get('http://localhost:8080/Api/AtributosContato/')
      .then((resp) => {
        this.setState({ listaAtributos: resp.data })
      })
  }

  contactLoadoDinamic = (id) => {
    axios.get(`http://localhost:8080/Api/Contato/${id}`)
      .then((resp) => {
        this.setState({ contact: resp.data, idUser: id })
      })
    this.showList()
  }

  refreshListContato = () => {
    console.log('???????????????????????????????????')
    console.log(this.state.idUser)
    console.log('???????????????????????????????????')
    axios.get(`http://localhost:8080/Api/Contato/${this.state.idUser}`)
      .then((resp) => {
        this.setState({ contact: resp.data, editContactAtive: false })
        this.handleModelContato()
        this.addNewContactDinamic()
      })
  }

  handleChangeUser = (e) => {
    this.setState({ ... this.state, userName: e.target.value })
  }

  sourceListUsers = () => {
    axios.get(`http://localhost:8080/Api/Usuario?sort=-nome`)
      .then((resp) => {
        this.setState({ list: resp.data })
      })
  }

  showList = () => {
    if (this.state.ativo) {
      this.setState({ ativo: false })
      return
    }
    this.setState({ ativo: true })
  }

  componentDidMount() {
    this.sourceListUsers()
    this.addNewContactDinamic()
    this.setState({ ... this.state, ativo: false, alert: false })
    this.handleModelContato()
    this.dragquinkk()
  }
  handleAddUser = (e) => {
    const { userName } = this.state
    axios.post('http://localhost:8080/Api/Usuario', { "nome": userName })
      .then((resp) => {
        this.refresh();
        this.setState({ alert: true, model: 'primary', title: 'Confirmação!', text: 'Usuario adicionado' })

      });

  }

  handleShowAlert = () => {
    return (<Alert
      model={this.state.model}
      title={this.state.title}
      text={this.state.text}
    />)
  }

  refresh = () => {
    this.setState({ ...this.state, userName: '' })
    this.sourceListUsers()
  }

  addNewContactDinamic = () => {
    axios.get('http://localhost:8080/Api/AtributosContato/')
      .then((resp) => {
        this.setState({ listaAtributos: resp.data })
      })
  }

  handleDeleteContato = (id) => {
    console.log(id)
    axios.delete(`http://localhost:8080/Api/Contato/${id}`)
      .then((resp) => {
        this.refreshListContato()
        this.addNewContactDinamic()
      });
  }

  handleDeleteUser = (id) => {
    axios.delete(`http://localhost:8080/Api/Usuario/${id}`)
      .then((resp) => {
        // console.log(this)
        this.refresh();
      });
  }

  showContatoForm = () => {
    return (
      <ContatoForm></ContatoForm>
    )
  }

  handleMoveDownAtribute = (id) => {
    console.log("*****************************")
    axios.get(`http://localhost:8080/Api/AtributosContato/desce/${id}`)
      .then(() => {
        this.addNewContactDinamic()
      })
    console.log("*****************************")
  }


  handleMoveUpAtribute = (id) => {
    axios.get(`http://localhost:8080/Api/AtributosContato/sobe/${id}`)
      .then(() => {
        this.addNewContactDinamic()
      })
  }

  listaDeAtributosDinamicos = () => {
    const comps = this.state.listaAtributos.map((v, k) => {

      console.log("###############")
      console.log(k)
      console.log(this.state.listaAtributos.length)
      console.log("###############")

      if (k == 0 && v.inputAtributo != 'hidden') {
        console.log("%%%%%%%%%%%%%%%%%")
        console.log(v.nomeAtributo)
        console.log("desce")
        console.log("%%%%%%%%%%%%%%%%%")
        if (v.dinamic) {
          return (
            <tr key={v.id}>
              <td>{v.nomeAtributo}</td>
              <td><button className='btn btn-danger' onClick={() => { this.handleDeleteAttributes(`${v.id}-${v.nomeAtributo}`) }} style={{ marginRight: 2 }}><i class="fas fa-trash-alt"></i></button>
                <button className='btn btn-primary' onClick={() => { this.handleMoveDownAtribute(v.id) }} style={{ marginRight: 2 }}><i class="fas fa-arrow-down"></i></button></td>
            </tr>
          )
        }
        return (
          <tr key={v.id}>
            <td>{v.nomeAtributo}</td>
            <td><button className='btn btn-secundary' style={{ marginRight: 2 }}><i class="fas fa-trash-alt"></i></button>
              <button className='btn btn-primary' onClick={() => { this.handleMoveDownAtribute(v.id) }} style={{ marginRight: 2 }}><i class="fas fa-arrow-down"></i></button></td>
          </tr>
        )

      }

      if ((k + 1) == this.state.listaAtributos.length && v.inputAtributo != 'hidden') {
        console.log("%%%%%%%%%%%%%%%%%")
        console.log(v.nomeAtributo)
        console.log("sobe")
        console.log("%%%%%%%%%%%%%%%%%")
        if (v.dinamic) {
          return (
            <tr key={v.id}>
              <td>{v.nomeAtributo}</td>
              <td><button className='btn btn-danger' onClick={() => { this.handleDeleteAttributes(`${v.id}-${v.nomeAtributo}`) }} style={{ marginRight: 2 }}><i class="fas fa-trash-alt"></i></button>
                <button className='btn btn-primary' onClick={() => { this.handleMoveUpAtribute(v.id) }} style={{ marginRight: 2 }}><i class="fas fa-arrow-up"></i></button></td>
            </tr>
          )
        }
        return (
          <tr key={v.id}>
            <td>{v.nomeAtributo}</td>
            <td><button className='btn btn-secundary' style={{ marginRight: 2 }}><i class="fas fa-trash-alt"></i></button>
              <button className='btn btn-primary' onClick={() => { this.handleMoveUpAtribute(v.id) }} style={{ marginRight: 2 }}><i class="fas fa-arrow-up"></i></button></td>
          </tr>
        )
      }

      if (v.inputAtributo != 'hidden') {
        console.log("%%%%%%%%%%%%%%%%%")
        console.log(v.nomeAtributo)
        console.log("sobe e desce")
        console.log("%%%%%%%%%%%%%%%%%")
        if (v.dinamic) {
          return (
            <tr key={v.id}>
              <td>{v.nomeAtributo}</td>
              <td><button className='btn btn-danger' onClick={() => { this.handleDeleteAttributes(`${v.id}-${v.nomeAtributo}`) }} style={{ marginRight: 2 }}><i class="fas fa-trash-alt"></i></button>
                <button className='btn btn-primary' onClick={() => { this.handleMoveUpAtribute(v.id) }} style={{ marginRight: 2 }}><i class="fas fa-arrow-up"></i></button>
                <button className='btn btn-primary' onClick={() => { this.handleMoveDownAtribute(v.id) }} style={{ marginRight: 2 }}><i class="fas fa-arrow-down"></i></button></td>
            </tr>
          )
        }
        return (
          <tr key={v.id}>
            <td>{v.nomeAtributo}</td>
            <td><button className='btn btn-secundary'><i class="fas fa-trash-alt"></i></button>
              <button className='btn btn-primary' onClick={() => { this.handleMoveUpAtribute(v.id, k) }} style={{ marginRight: 2 }}><i class="fas fa-arrow-up"></i></button>
              <button className='btn btn-primary' onClick={() => { this.handleMoveDownAtribute(v.id, k) }} style={{ marginRight: 2 }}><i class="fas fa-arrow-down"></i></button></td>
          </tr>
        )
      }
    })
    return (
      <div>
        <table className='table table-striped table-hover table-borderless'>
          <thead className='bg-primary'>
            <tr>
              <th>NOME</th>
              <th>OPÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {comps}
          </tbody>
        </table>
      </div>
    )

  }

  handleEditContact = (contatoEdit) => {
    console.log(contatoEdit)
    this.state.listaAtributos.forEach(atributo => {
      if (atributo.dinamic) {
        if (contatoEdit.dynamicField.valueFields[atributo.nomeAtributo] === null) {
          contatoEdit.dynamicField.valueFields[atributo.nomeAtributo] = ''
        }
      } else {
        if (contatoEdit[atributo.nomeAtributo] === null) {
          contatoEdit[atributo.nomeAtributo] = ''
        }
      }
    })

    this.setState({ contato: contatoEdit, editContactAtive: true })
  }

  handleDeleteAttributes = (el) => {
    console.log(el)
    axios.delete(`http://localhost:8080/Api/AtributosContato/${el}`)
      .then((resp) => {
        this.refreshListContato()
      });
  }


  ////
  handleChangeDynamicFalse = (e) => {
    let contatoEdit = this.state.contato
    contatoEdit[e.target.id] = e.target.value
    console.log(contatoEdit)
    this.setState({ contato: contatoEdit })
  }
  handleChangeDynamicTrue = (e) => {
    let contatoEdit = this.state.contato
    console.log(this.state.contato)
    contatoEdit.dynamicField.valueFields[e.target.id] = e.target.value
    console.log(e.target.id.toLowerCase())
    console.log("DYNAMIC TRUEEEEE")
    console.log("CONTATOOOOO")
    console.log(e.target.id)
    console.log(e.target.value)
    console.log(contatoEdit)
    console.log("DYNAMIC TRUEEEEE")
    this.setState({ contato: contatoEdit })
  }
  ////
  showListContato = () => {
    console.log("AAAAAAAAAAA")
    return (
      <ContatoList
        listaDeAtributosDinamicos={this.listaDeAtributosDinamicos}
        handleDeleteContato={this.handleDeleteContato}
        contact={this.state.contact}
        listaAtributos={this.state.listaAtributos}
        atributes={this.state.listaAtributos}
        idUser={this.state.idUser}
        list={this.state.listaAtributos}
        submitForm={this.submitForm}
        addNewCampo={this.addNewCampo}
        contato={this.state.contato}
        handleChangeDynamicTrue={this.handleChangeDynamicTrue}
        handleChangeDynamicFalse={this.handleChangeDynamicFalse}
        handleEditContact={this.handleEditContact}
        handleModelContato={this.handleModelContato}

      ></ContatoList>
    )
  }

  submitForm = () => {
    if (this.state.editContactAtive) {
      let id = this.state.contato.id
      let atributos = []
      let values = []
      this.state.listaAtributos.forEach(contato => {
        let nameAtribute = contato.nomeAtributo.replace(/ /g, "_")
        nameAtribute = nameAtribute.toLowerCase()
        atributos.push(nameAtribute)
        if (contato.dinamic) {
          values.push(this.state.contato.dynamicField.valueFields[contato.nomeAtributo])
          console.log(this.state.contato.dynamicField.valueFields[contato.nomeAtributo])
        } else {
          if (contato.nomeAtributo === 'id_cli_fk') {
            values.push(this.state.idUser)
          } else {
            values.push(this.state.contato[contato.nomeAtributo])
            console.log(this.state.contato[contato.nomeAtributo])
          }
        }
      })
      console.log("EDIT")
      console.log("_____________________")
      console.log(atributos)
      console.log(values)
      console.log("_____________________")
      axios.put(`http://localhost:8080/Api/Contato/${id}`, { "inputsName": atributos, "inputsValue": values })
        .then(
          () => {
            this.refreshListContato()
          }
        )
      return
    }

    let atributos = []
    let values = []
    console.log("********************************************************")
    console.log(this.state.contato)
    this.state.listaAtributos.forEach(contato => {
      let nameAtribute = contato.nomeAtributo.replace(/ /g, "_")
      //nameAtribute = nameAtribute.toLowerCase()
      atributos.push(nameAtribute)
      if (contato.dinamic) {
        values.push(this.state.contato.dynamicField.valueFields[contato.nomeAtributo])
        console.log(this.state.contato.dynamicField.valueFields[contato.nomeAtributo])
      } else {
        if (contato.nomeAtributo === 'id_cli_fk') {
          values.push(this.state.idUser)
        } else {
          values.push(this.state.contato[contato.nomeAtributo])
          console.log(this.state.contato[contato.nomeAtributo])
        }
      }
    })
    console.log(this.state.contato)
    console.log(atributos)
    console.log(values)
    console.log("********************************************************")
    axios.post('http://localhost:8080/Api/Contato/TOP', { "inputsName": atributos, "inputsValue": values })
      .then(
        this.refreshListContato()
      )
  }

  handleModelContato = () => {
    console.log("ACHOU AQUI")
    axios.get('http://localhost:8080/Api/Contato/TOP')
      .then((resp) => {
        this.setState({ contato: resp.data, editContactAtive: false })
        console.log("TOMA NO MEIO DO CU")
        console.log(resp.data)
        console.log("TOMA NO MEIO DO CU")
      })
    console.log("ACHOU AQUI")
  }

  addNewCampo = (newCampo) => {
    const nome = newCampo.nomeAtributo.toLowerCase()
    const tipo = newCampo.typeAtributo
    const place = newCampo.placeHolderAtributo
    const input = newCampo.inputAtributo
    const dinamic = newCampo.dinamic
    console.log("-------------------------------")
    console.log(newCampo)
    console.log("-------------------------------")
    axios.post('http://localhost:8080/Api/AtributosContato/', { "nomeAtributo": nome, "typeAtributo": tipo, "placeHolderAtributo": place, "inputAtributo": input, "dinamic": true })
      .then((resp) => {
        this.refreshListContato()
        this.addNewContactDinamic()
      });

  }


  render() {

    return (
      <div className='.container-fluid' style={{ margin: 20 }}>
        <div class="row">
          <div class="col-sm">
            {this.state.alert ? this.handleShowAlert() : ''}
            <UserForm
              handleChangeUser={this.handleChangeUser}
              handleAddUser={this.handleAddUser}
              userName={this.state.userName}
              contactLoadoDinamic={this.contactLoadoDinamic}
            ></UserForm>
            <UserList
              list={this.state.list}
              contactLoadoDinamic={this.contactLoadoDinamic}
              handleDeleteUser={this.handleDeleteUser}
            />

          </div>
          <div class="col-sm">
            {this.state.ativo ? this.showListContato() : ''}
            <button onClick={() => this.dragquinkk()}>AAA</button>
            <button onClick={() => console.log(this.state.items)}>array</button>
            {this.mostrarDragQuin()}
          </div>
        </div>
      </div>
    )
  }
}