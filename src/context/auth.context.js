
import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const storeToken = (token) => {
    localStorage.setItem('authToken',token)
  }

  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken){
        axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`,{headers:{Authorization: `Bearer ${storedToken}`}})
            .then((res)=>{
                const user = res.data
                setIsLoggedIn(true)
                setIsLoading(false)
                setUser(user)
            })
            .catch((err)=>{
                setIsLoggedIn(false)
                setIsLoading(false)
                setUser(null)
            })
    }
    else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);  
    }
  }

  const removeToken = () => {
    localStorage.removeItem('authToken')
  }

  const logOutUser = () => {
    removeToken()
    authenticateUser()
  }

  useEffect(()=>{
    authenticateUser()
    // eslint-disable-next-line
  },[])

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user,storeToken,authenticateUser,logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };
