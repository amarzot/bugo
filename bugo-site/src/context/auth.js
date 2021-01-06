import React from 'react'
import api from '../services/api'

const AuthContext = React.createContext()
function AuthProvider(props) {
    const initialValue = JSON.parse(localStorage.getItem("authState")) || {}

    const [authState, updateAuthState] = React.useState(initialValue);

    React.useEffect(() => {
        localStorage.setItem("authState", JSON.stringify(authState))
    }, [authState])

    const login = (data) => { // make a login request
        return api.postData('/api/login', data)
        .then(
            response => updateAuthState(response)
        )
    } 
    const register = (data) => { // register the user
        return api.postData('/api/register', data)
        .then(
            response => updateAuthState(response)
        )
    } 
    const logout = () => { // clear the token in localStorage and the user data
        updateAuthState({})
    } 
    // note, I'm not bothering to optimize this `value` with React.useMemo here
    // because this is the top-most component rendered in our app and it will very
    // rarely re-render/cause a performance problem.
    return (
        <AuthContext.Provider value={{authState, login, logout, register}} {...props} />
    )
}
const useAuth = () => React.useContext(AuthContext)
export {AuthProvider, useAuth}

// the UserProvider in user-context.js is basically:
