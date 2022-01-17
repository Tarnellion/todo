import React from "react";

let ToDoItem = (props) => {
    return (
        <div className="ToDoItem">
            <div><span>{props.id} </span>{props.task}</div>
            <button>&times;</button>
        </div>
    )
}

export default ToDoItem;