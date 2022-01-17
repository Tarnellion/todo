import axios from 'axios'
import React from 'react';
import ToDoItem from './component/Todo/ToDoItem';


function App() {

    let [todo, setTodo] = React.useState([

    ])
    React.useEffect(() => {
        let data = axios.get('http://localhost:8000/')
        data.then(res => {
            setTodo(res.data)
        })
    }, [])

    let input = React.createRef();

    let postData = () => {
        let post = axios.post('http://localhost:8000/', {
            id: null,
            task: input.current.value,
            isDone: 0
        })
        console.log(input.current.value);
    }

    return ( <
        div className = 'site__wrapper' >
        <
        h1 > TO DO List < /h1> <
        div className = 'addTask__wrapper' >
        <
        input ref = { input }
        placeholder = 'Напиши задание' / >
        <
        button onClick = { postData } > Add Task < /button> < /
        div > {
            todo.map(el => {
                return <ToDoItem task = { el.task }
                id = { el.id }
                / >
            })
        } <
        /div>
    );
}

export default App;