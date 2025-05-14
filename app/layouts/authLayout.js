import {ToastContainer} from "react-toastify";


const AuthLayout = ({children}) => {
    return <>
        <main>
            <ToastContainer>{children}</ToastContainer></main>
    </>
}

export default AuthLayout;