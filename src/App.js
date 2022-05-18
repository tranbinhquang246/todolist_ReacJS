import './App.css';
import React,{useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom';
import axios from 'axios'
import Update_Todo from './components/update_create/Update_Todo';
import Create_Todo from './components/update_create/Create_Todo';
import { BsFillArchiveFill,BsFillPencilFill } from "react-icons/bs";

function App() {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [datas, setDatas] = useState([]);
  const location = useLocation();
  var email = location.state.email;
  useEffect( () => {
    axios.post('http://localhost:8080/gettodo', {
              "email": email
          })
              .then(function (response) {
                  setDatas(response.data);
                  //Hiển thị mảng trống
                  console.log(datas);
              })
              .catch(function (error) {
                  console.log(error);
              })
  }, []);
  const [dataToChildEdit, setDataToChildEdit] = useState({
    email: email,
    index: null,
    title: null,
    content: null,
    status: null
  });

  const [dataToChildAdd, setDataToChildAdd] = useState({
    email: email
  });


  //Hiển thị ra dữ liệu
  console.log(datas);

  const handleClickTodo = (data, index, email) => {
    setDataToChildEdit({
      email: email,
      index: index,
      title: data.title,
      content: data.content,
      status: data.status
    })
    setShowFormEdit(true);
  }

  const handleClickAdd = () => {
    setDataToChildAdd({
      email: email
    })
    setShowFormAdd(true);
  }

  const handleClickDelete = (email, index) => {
      axios.post('http://localhost:8080/deletetodo', {
                "email": email,
                "index": index
            })
                .then(function (response) {
                  window.location.reload();
                  alert(response.data)
                    
                })
                .catch(function (error) {
                    console.log(error);
                })
  }


  return (
    <div className="App flex justify-center relative">
      {showFormEdit ? <Update_Todo data = {dataToChildEdit}/> : null}
      {showFormAdd ? <Create_Todo data = {dataToChildAdd}/> : null}
      <div className = "flex flex-col justify-center items-center overflow-auto h-full w-full  bg-gradient-to-b from-slate-500 to-orange-300">
          <h1 className="font-bold text-xl mt-10">What's the Plan for Today?</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-3" 
          type="button" onClick={handleClickAdd}>Add new todolist</button>
          {
              datas.map(function (data, index){
                var divStyleColor;
                if(data.status == true){
                  divStyleColor = {
                    backgroundColor: 'rgb(117, 239, 117)'
                  }
                }else{
                  divStyleColor = {
                    backgroundColor: 'rgb(240, 246, 131)'
                  }
                }
                return <div className= "flex justify-between items-center w-1/2 m2 m-2 shadow appearance-none border rounded border-white" style={divStyleColor}>
                  <div className="flex-col justify-between w-1/2 ">
                    <p className="font-bold font-poppins m-2">{data.title}</p>
                    <p className="font-poppins m-2">{data.content}</p>
                </div>
                <div className = " flex mr-5">
                <div className="mr-5">
                  <BsFillPencilFill onClick={() => handleClickTodo(data, index, email)}></BsFillPencilFill>
                </div>
                <div>
                  <BsFillArchiveFill onClick = {() => handleClickDelete(email, index)}></BsFillArchiveFill>
                </div>
              </div>
              </div>
              })
          }          
      </div>
        {/* <Link to="/signin" className="hover:text-blue-500 cursor-pointer">Sign here</Link>
        <Link to="/" className="hover:text-blue-500 cursor-pointer">Login here</Link> */}
    </div>
  );
}

export default App;
