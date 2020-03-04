import React from 'react'
//import IconButton from '../template/iconButton'


export default props => {

    return (
        <div className="container-fluid">
            <div className="row row-cols-2">
                <div className="col-8">
                    <input id='description' className='form-control' placeholder='Adicione um usuario :)'
                        onChange={props.handleChangeUser}
                        value={props.userName}>
                    </input>
                </div>

                <div className="col-4">
                    <button type="button" class="btn btn-outline-primary" onClick={props.handleAddUser}>Adicionar <i class="fas fa-user-plus"></i>

                    </button>
                </div>
            </div>
        </div>
    )
}
