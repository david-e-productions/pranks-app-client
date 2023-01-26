import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function LoginPage () {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const navigate = useNavigate()

    const {storeToken,authenticateUser} = useContext(AuthContext)

    const handleLoginSubmit = (e) => {
        e.preventDefault()

        const reqbody = {email,password}

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,reqbody)
        .then((res)=>{
            console.log('JWT TOKEN',res.data.authToken)
            storeToken(res.data.authToken)
            authenticateUser()
            navigate('/')})
        .catch((error)=>{
            const errorDescription = error.response.data.message
            setErrorMessage(errorDescription)
        })
    }

    return (
        <div className='LoginPage'>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input type='text' name='email' value={email} onChange={handleEmail}></input>
                <label>Password</label>
                <input type='password' name='password' value={password} onChange={handlePassword}></input>
                <button type='submit'>Login</button>
            </form>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <p>Don't have an account yet?</p>
            <Link to={'/signup'}>Sign Up</Link>
        </div>
    )
}

export default LoginPage