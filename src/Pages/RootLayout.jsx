
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from '../apis/axiosApi'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { authAction } from '../store/authSlice'
import { userLogout } from '../store/customActions'

export const RootLayout = () => {
    const authToken = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRefreshToken = async () => {
            try {
                const response = await axios.get("/auth/refresh", { withCredentials: true });
                console.log(response.data);
                dispatch(authAction.setAuthToken({ ...response.data }))

            } catch (error) {
                console.log("fetch refresh token error", error);
                dispatch(userLogout());
                navigate("/auth/login");
            }
        }

        if (!authToken) {
            fetchRefreshToken();
        }

    }, [authToken, navigate, dispatch])

    if (!authToken) {
        return <>
            <LoadingSpinner />
        </>
    }

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
