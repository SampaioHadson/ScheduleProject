import React from 'react'

export default props => {
    const list = props.list || []

    const renderRows = () => {
        console.log(list)
        return (list.map(todo => (
            <tr key={todo.id}>
                <td>{todo.nome}</td>
                <td>
                    <button className='btn btn-primary'style={{marginRight: 2}} onClick={()=>{props.contactLoadoDinamic(todo.id)}}><i class="fas fa-list"></i></button>
                    <button className='btn btn-primary' style={{marginRight: 2}}><i class="fas fa-edit"></i></button>
                    <button className='btn btn-danger' style={{marginRight: 2}}  onClick={()=>{props.handleDeleteUser(todo.id)}}><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        )))
    }

    return (
        <div className='container-fluid' style={{ marginTop: 20 }}>
            <div className="row row-cols1-1">
                <div className="col">
                    <div className='table-responsive'>
                        <table className='table table-striped table-hover table-borderless'>
                            <thead className='bg-primary'>
                                <tr>
                                    <th>NOME</th>
                                    <th >OPÇÕES</th>
                                </tr>

                            </thead>
                            <tbody>
                                {renderRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

