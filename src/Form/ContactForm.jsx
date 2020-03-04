import React, { Component } from 'react'
//import ButtonDel from './buttonDelete'
//import Confirm from './confirm'
//import Confirm from './bootc'
import axios from 'axios'
import Contato from '../AppIndex'
//import AddInput from './AddInput'
//import '../css/FormLogin.css'

//import { Button } from 'react-bootstrap/lib/InputGroup'

export default class ContactForm extends Component {

    state = {
        list: [],
        nome: '',
        tipo: '',
        place: '',
        mostrar: '',
        listaAtributos: [],
        contato: ''

    }


    handleModelContato = ()=>{
        axios.get('http://localhost:8080/Api/Contato/TOP')
        .then((resp)=> this.setState({contato:resp.data}))
      }

    clearForm = () => {
        this.props.list.forEach(contato => {
            //console.log(document.getElementById(contato.nomeAtributo).value)
            if (document.getElementById(contato.nomeAtributo) != null) {
                document.getElementById(contato.nomeAtributo).value = ''
                return
            }
        })
    }

    loadFormForEdit = () => {
        let value
        this.props.list.forEach(contato => {
            console.log(this.props.contatoss)
            //console.log(document.getElementById(contato.nomeAtributo).value)  
            let nameAtribute = contato.nomeAtributo.replace(/ /g, "_")
            nameAtribute = nameAtribute.toLowerCase()
            if (contato.dinamic === true) {
                let sql = `this.props.contatoss.dynamicField.valueFields.${nameAtribute}`
                console.log(nameAtribute)
                value = eval(sql)
                document.getElementById(contato.nomeAtributo).value = value
                return
            }
            let sql = `this.props.contatoss.${nameAtribute}`
            value = eval(sql)
            document.getElementById(contato.nomeAtributo).value = value
            console.log(nameAtribute)
        })
    }




    submitForm = () => {
        if (this.props.editContactAtive) {
            let id = this.props.contatoss.id
            let atributos = []
            let values = []
            this.props.list.forEach(contato => {
                let nameAtribute = contato.nomeAtributo.replace(/ /g, "_")
                nameAtribute = nameAtribute.toLowerCase()
                atributos.push(nameAtribute)
                values.push(document.getElementById(contato.nomeAtributo).value)
                console.log(document.getElementById(contato.nomeAtributo).value)
                //json[nameAtribute] = document.getElementById(contato.nomeAtributo).value
            })
            console.log("EDIT")
            console.log("_____________________")
            console.log(atributos)
            console.log(values)
            console.log("_____________________")
            axios.put(`http://localhost:8080/Api/Contato/${id}`, { "inputsName": atributos, "inputsValue": values })
                .then(
                    () => {
                        //AAAAAAAAAAA
                    }
                )
            //REFRESH
            return
        }
        let json = new Object()
        let atributos = []
        let values = []
        console.log("!!!!!!!!!!!!!!!!!!")
        console.log(this.props.list)
        console.log("!!!!!!!!!!!!!!!!!!")
        this.props.list.forEach(contato => {
            let nameAtribute = contato.nomeAtributo.replace(/ /g, "_")
            nameAtribute = nameAtribute.toLowerCase()
            atributos.push(nameAtribute)
            values.push(document.getElementById(contato.nomeAtributo).value)
            console.log("++++++++++++++++++++++++++++++")
            console.log(document.getElementById(contato.nomeAtributo).value)
            //console.log(document.getElementById('aaa').value)
            console.log("++++++++++++++++++++++++++++++")
            json[nameAtribute] = document.getElementById(contato.nomeAtributo).value
        })
        console.log(atributos)
        console.log(values)
        axios.post('http://localhost:8080/Api/Contato/TOP', { "inputsName": atributos, "inputsValue": values })
            .then(

            )
    }

    addNewContactDinamic = () => {
        console.log("AQUI PORAAAAAAAAAAAAAAAAA")
        axios.get('http://localhost:8080/Api/AtributosContato/')
            .then((resp) => {
                this.setState({ listaAtributos: resp.data })
            })
    }

    addNewCampo = (newCampo) => {
        const nome = newCampo.nomeAtributo
        const tipo = newCampo.typeAtributo
        const place = newCampo.placeHolderAtributo
        const input = newCampo.inputAtributo
        const dinamic = newCampo.dinamic
        console.log("-------------------------------")
        console.log(newCampo)
        console.log("-------------------------------")
        axios.post('http://localhost:8080/Api/AtributosContato/', { "nomeAtributo": nome, "typeAtributo": tipo, "placeHolderAtributo": place, "inputAtributo": input, "dinamic": true })
            .then((resp) => {
            });
    }

    loadAtributes = () => {
        axios.get(`http://localhost:8080/Api/AtributosContato/`)
            .then((resp) => this.setState({ list: resp.data }),
            )
    }

    componentDidMount() {
        this.loadAtributes();
        this.addNewContactDinamic();
        this.handleModelContato()
        console.log("AA")
    }


    deleteAtributo = (e) => {
        //const id = e.target.value
        console.log(e)
        axios.delete(`http://localhost:8080/Api/AtributosContato/${e}`)
            .then((resp) => {

            });

    }

    esconderOpções = () => {
        console.log("AAA")
        this.state.list.map((contato, k) => {
            //if(document.getElementById(`${contato.nomeAtributo}excluir`) != null){
            document.getElementById(`${contato.nomeAtributo}excluir`).style.display = 'none'
            console.log("A")
            //}

        })
    }

    optionssss = (v) => {
        return (
            <div className='col-2'>
                <button style={{ display: 'none' }} id={`${v.nomeAtributo}excluir`} value={`${v.id} ${v.nomeAtributo}`} onClick={() => { this.deleteAtributo(`${v.id}-${v.nomeAtributo}`) }} className='btn btn-danger'>X</button>
            </div>
        )
    }

    geraCompnentes = () => {
        console.log("ZZZZZZ")
        console.log(this.props.list)
        const comps = this.props.list.map((v, k) => {
            console.log(v.nomeAtributo)
            if (v.inputAtributo === 'hidden') {
                return (
                    <input key={v.id} id={v.nomeAtributo} value={this.props.idUser} type="hidden" className='form-control' placeholder={`${v.placeHolderAtributo}`}></input>
                )
            }

            if (v.dinamic === false) {
                return (
                    <div key={v.id} className={this.props.nomeCC} id={`${v.nomeAtributo}div`} style={{marginTop: 10}}>
                        <input key={v.id} id={v.nomeAtributo} type="text" className='form-control' onChange={this.props.handleChangeDynamicFalse} value={this.props.contato[v.nomeAtributo]} placeholder={`${v.placeHolderAtributo}`} />
                    </div>
                )
            }
            return (
                <div key={v.id} id={`${v.nomeAtributo}div`}>
                    <div className="row" id={`${v.nomeAtributo}class`}>
                        <div className="col" id={`${v.nomeAtributo}row`}>
                            <input key={v.id} id={v.nomeAtributo} type="text" style={{marginTop: 10}} className='form-control'  placeholder={`${v.placeHolderAtributo}`} value={this.props.contato.dynamicField.valueFields[v.nomeAtributo]} onChange={this.props.handleChangeDynamicTrue}/>
                        </div>
                    </div>
                </div>
            )
        })
        return comps
    }

    handleChangeDynamicFalse = (e)=>{
        let contatoEdit = this.state.contato
        contatoEdit[e.target.id]=e.target.value
        console.log(contatoEdit)
        this.setState({contato:contatoEdit})
    }
    handleChangeDynamicTrue = (e)=>{
        let contatoEdit = this.state.contato
        contatoEdit.dynamicField.valueFields[e.target.id]=e.target.value
        console.log("DYNAMIC TRUEEEEE")
        console.log(e.target.id)
        console.log(e.target.value)
        console.log(contatoEdit)
        console.log("DYNAMIC TRUEEEEE")
        this.setState({contato:contatoEdit})
    }

    mostrar = () => {
        console.log(this.props.contatoss)
        //<button onClick={this.submitForm}>TESTE DE ENVIO</button>
    }

    render() {
        return (
            <div className='.container-fluid'>
                {this.geraCompnentes()}
                <div>
                    {/**  <button onClick={this.submitForm}>TESTE DE ENVIO</button>*/}
                </div>
                {/**this.props.editContactAtive ? this.loadFormForEdit() : this.clearForm()*/}
            </div>
        )
    }
}