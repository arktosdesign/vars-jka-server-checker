import React from 'react';

// TODO
// VALIDATION
const AddServerForm = (props) => {
    return (
      <form id="queryserver" onSubmit={props.handleSubmit}>
            <span>Add Favourite Server:</span>
            <div className="form-group">
                  <input
                        onKeyUp={props.handleNameChange}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name" />
            </div>
            <div className="form-group form-group--ip-port">
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
            </div>
        <button type="submit">+ Add</button>
      </form>
    )
}

export default AddServerForm;