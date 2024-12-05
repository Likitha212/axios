import React, { useState } from 'react'
import { useEffect } from 'react'
import { deletePost, getPost } from '../api/PostApi';
import { Form } from './Form';

 export const Posts = () => {
  const [data, setData] =useState([])
  const [updateDataApi, setUpdateDataApi] = useState({})
  
  const getPostData =async ()=>{
    const res = await getPost();
    console.log(res.data)
    setData(res.data)

  }

  useEffect(()=>{
    getPostData()

  },[])
//delete function
  const handleDeletePosts = async(id)=>{
    try {
      const res = await deletePost(id);
      if(res.status === 200){
        const newUpdatePosts = data.filter((currPost)=>{
          return currPost.id !== id;

        })
        setData(newUpdatePosts)
      }
      else{
        console.log("failed to delete the post :",res.status)
      }
      
    } catch (error) {
      console.log(error)
    }

  }

  const handleUpdatePost = (curElem)=>setUpdateDataApi(curElem);

  
 


  return (
    <>
    <section className='section-form'>
      <Form data={data} setData ={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>

    </section>
    <section className='section-post '>
      <ol>
        {
          data.map((curElem)=>{
            const { id, body, title } = curElem;
            return(
            <li key={id}>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
              <button onClick={()=>handleUpdatePost(curElem)}>Edit</button>
              <button onClick={()=>handleDeletePosts(id)} id='delete'>Delete</button>

            </li>
            )
          })
        }
      </ol>
    </section>
  </>
  )
}

