import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/PostApi';

 export const Form = ({data, setData, updateDataApi, setUpdateDataApi}) => {
  const [addData, setAddData] =useState({
    title:"",
    body:""
  })

  //to change add to edit button in form
  let isEmpty =Object.keys(updateDataApi).length === 0;

  //get the updated data and add into input field
  useEffect(()=>{
    updateDataApi &&
    setAddData({
      title: updateDataApi.title || "",
      body: updateDataApi.body ||"",
    })
  },[updateDataApi])

  const handleInputChange =(e)=>{
    const name = e.target.name;
    const value = e.target.value

    setAddData((prev)=>{
      return {
        ...prev,
        [name]:value,
      }
    })
  }
  
  const addPostData =async()=>{
    const res = await postData(addData);
    console.log("res",res)
    if(res.status === 201){
      setData([...data,res.data])
      setAddData({title:"",body:""})
    }
  }

  const updatePostData = async ()=>{
   try {
    const res = await updateData(updateDataApi.id,addData);
    console.log(res)
    if(res.status === 200){
      setData((prev)=>{
        return prev.map((curElem)=>{
          return curElem.id === res.data.id ? res.data :curElem;
        })
      })
      setAddData({title:"",body:""})
      setUpdateDataApi({})

    }
   
    
   } catch (error) {
    console.log(error)
    
   }
  
  }

  const handleFormSubmit= (e)=>{
    e.preventDefault();
    const action = e.nativeEvent.submitter.value; // retrieves the value of the button (or submit element) that triggered a form submission, allowing you to identify which button was clicked.

   
    if(action ==="Add"){
      addPostData();

    }
    else if(action ==="Edit"){
      updatePostData()
    }
  }
  return (
    <form onSubmit={handleFormSubmit}>
      
        <label htmlFor='title'></label>
        <input 
        value={addData.title}
        onChange={handleInputChange}
        type='text' id='title' name='title' autoComplete='off' placeholder='Add Title'/>
     
        <label htmlFor='body'></label>
        <input
        value={addData.body}
        onChange={handleInputChange}
         type='text' id='body' name='body'autoComplete='off' placeholder='Add Post'/>
     
      <button type='submit ' value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add": "Edit"}</button>
      
    </form>
  )
}

