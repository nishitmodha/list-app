import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import ListForm from "./ListForm";

const ListItem = (props) => {
  const [lists, setLists] = useState([]);


  // For updating a list
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [existingTitle, setExistingTitle] = useState('');


  // For error handling
  const [noRecord, setNoRecord] = useState(false);


  // Fetching Lists from Backend
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${props.user_id}/lists`)
      .then(res => {
        // console.log("Data from GET: ", res);

        // If no lists found
        if (!res.data) {
          setNoRecord(true);
        }
        else {
          const data = Array.from(res.data);
          // console.log("Json parse: ", data);
          const transformedData = data.map((listData) => {
            return {
              id: listData.id,
              title: listData.title,
              user_id: listData.user_id
            }
          })
          setLists(transformedData);
        }
      })
  }, [props.user_id]);


  const deleteHandler = (id, i) => {
    axios.delete(`http://localhost:3001/users/${props.user_id}/lists/${id}`)
      .then(() => {
        setLists((prev) => {
          if (prev.length !== 0) {
            const newList = [...prev]
            newList.splice(i, 1);
            if (newList.length === 0) {
              setNoRecord(true);
              return [];
            }
            else {
              return newList;
            }
          }
          else {
            setNoRecord(true);
            return [];
          }
        });
      })
    console.log("List Deleted");
  }


  const updateHandler = (id, title) => {
    setEdit(true);
    setIndex(+id);
    setExistingTitle(title);
  }


  let printLists = (
    lists.map((list, i) =>
      <div key={list.id}>
        {list.title}
        <button className="ListButton" onClick={() => updateHandler(list.id, list.title, props.user_id)}>Update</button>
        <button className="ListButtonDel" onClick={() => deleteHandler(list.id, i)}>Delete</button>
      </div>
    )
  );

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        props.handleLogout();
        props.history.push("/");
      })
      .catch(error => {
        console.log("Logout Error", error);
      });
  };

  return (
    <Fragment>
      <div>
        <ListForm id={index} existingTitle={existingTitle} isEdit={edit} user_id={props.user_id} isLoggedIn={props.isLoggedIn} />
      </div>

      <br />

      {noRecord ? <p>No Lists found!</p> : printLists}
      <div>
        {props.isLoggedIn && props.user_id &&
          <button className="LogoutBtn" onClick={() => handleLogoutClick()}>Logout</button>
        }
      </div>
    </Fragment>
  );
};

export default ListItem;
