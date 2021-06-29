import { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const titleHandler = (event) => {
    setEnteredTitle(event.target.value);
  };


  const addNewListHandler = () => {
    setEnteredTitle('');

    const listData = {
      title: enteredTitle
    }

    axios.post(`http://localhost:3001/users/${props.user_id}/lists`, listData)
  };


  useEffect(() => {
    setEnteredTitle(props.existingTitle);
  }, [props.existingTitle])

  const updateListHandler = () => {
    setEnteredTitle('');

    const updatedListData = {
      title: enteredTitle
    }

    axios.put(`http://localhost:3001/users/${props.user_id}/lists/${props.id}`, updatedListData);
  };

  const printMessage = (
    <Fragment>
      <p>Please Login and then you can use this feature. <br/>You can get Login or Register by visiting the following link.</p>
      <Link to="/">Home</Link>
    </Fragment>
    
    );

  return (
    <Fragment>
      {
        (props.isLoggedIn && props.user_id)
          ? <Fragment>
            <form className="ListForm" onSubmit={props.isEdit ? updateListHandler : addNewListHandler}>
              <input className="ListInput" type="text" value={enteredTitle} placeholder="List Title" onChange={titleHandler} />
              <button className="ListButton" type="submit">{props.isEdit ? "Update List" : "Add List"}</button>
            </form>
          </Fragment>
          : printMessage
      }
    </Fragment>
  );
};

export default ListForm;
