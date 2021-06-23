import React from 'react';

const NewListForm = ({onNewList = f => f}) => {
    let title
    const submit = e => {
        e.preventDefault()
        onNewList(title.value)
        title.value = ''
        title.focus()
    }

    return (
        <form onSubmit={submit}>
            <input  ref={input => title = input}
                    type="text"
                    placeholder="Title..." required />
            <button>Add List</button>
        </form>
    )
}

export default NewListForm;