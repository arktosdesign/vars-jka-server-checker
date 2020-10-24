import React from 'react';

// TODO
// VALIDATION
const AddServerForm = (props) => {
    return (
      <>
        <form id="queryserver" onSubmit={props.handleSubmit}>
          <input
                onKeyUp={props.handleNameChange}
                type="text"
                name="name"
                id="name"
                placeholder="Name" />
          <input
                onKeyUp={props.handleIpChange}
                type="text"
                name="ip"
                id="ip"
                placeholder="IP Address" />
          <input
                onKeyUp={props.handlePortChange}
                type="text"
                name="port"
                id="port"
                placeholder="Port" />
          <button type="submit">+ Add</button>
        </form>
      </>
    )
}

export default AddServerForm;