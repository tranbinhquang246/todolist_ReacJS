import React, { useState } from 'react'
import axios from 'axios'

function Create_Todo(props) {
    const [title, setTitle] = useState('title');
    const [content, setContent] = useState('content');
    const [checkbox, setCheckbox] = useState(false);
    const handleCheckboxChange = () => {
        setCheckbox(!checkbox);
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleClickSubmit = () => {
        axios.post('http://localhost:8080/addtodo', {
            "email": props.data.email,
            "todolist": [{
                    "title": title,
                    "content": content,
                    "status": checkbox
                }
            ]
            })
                .then(function (response) {
                    if(response.data === "Added successful"){
                        alert(response.data);
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
  return (
    <div className=" flex fixed w-full h-full bg-black bg-opacity-70 overflow-hidden justify-center items-center">
    <div className="w-1/2 h-1/2 bg-slate-300 rounded-xl flex flex-col justify-center items-center">
        <span className="text-xl font-poppins p-5 font-medium normal-nums antialiased">Edit Todo</span>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" onChange={handleChangeTitle}/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Content
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" onChange={handleChangeContent}/>
        </div>
        <div className="mb-4"> 
            <input type="checkbox" checked={checkbox} onClick={handleCheckboxChange}/>
            <label for="vehicle1"> Complete </label></div>
        <div className="mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button" onClick={handleClickSubmit}>
                Save
            </button>
        </div>
    </div>
</div>
  )
}

export default Create_Todo