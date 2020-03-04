import React from 'react'

export default props => (
    <div class={`alert alert-${props.model} alert-dismissible fade show`} role="alert">
        <strong>{props.title}</strong> {props.text}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>


)