import { createContext, useContext } from "react";
import axios from "axios";

export const authContext = createContext();

export function useProvideAuth() {
    // const [user, setUser] = useState(null);
    const signin = (cb, email, password) => {
        // * 로그인 요청
        axios.post('/v1/auth/sign-in', { email, password })
            .then(res => {
                localStorage.setItem('email', email)
                localStorage.setItem('token', res.data.accessToken)
                if (cb) cb()
            })
            .catch(err => { console.log(err) })
    }

    const signout = (cb) => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        console.log('signout')
        if(cb) cb()
    }
    const isSignedIn = () => {
        return !!localStorage.getItem('token')
    }
    const isSignedOut = () => {
        return !isSignedIn()
    }

    return {
        signin,
        signout,
        isSignedIn,
        isSignedOut
    };
}

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}