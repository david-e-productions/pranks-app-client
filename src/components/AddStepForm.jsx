import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AddStepForm () {
    const [title,setTitle] = useState()
    const [description,setDescription] = useState()
    const navigate = useNavigate()
    const {prankId} = useParams()

  const storedToken = localStorage.getItem("authToken");


    console.log('prankId',prankId)

    const handleSubmit = (e) => {
        e.preventDefault()
        const reqBody = {title,description,prankId}

        axios.post(`${process.env.REACT_APP_API_URL}/api/step`,reqBody,{ headers: { Authorization: `Bearer ${storedToken}` } })
        .then((res)=>{
            navigate(`/pranks/${res.data._id}`)
        })
            // then navigate to the editPrank Page
            // find the corresponding prank
    }


    return (
        <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <label>Description</label>
        <input type='textarea' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
        <button type='submit'>Add Step</button>
        </form>
    )
}

export default AddStepForm