
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';
import axios from '../apis/axiosApi';
import { ErrorBox } from '../components/ErrorBox';

export const Singup = () => {
    const { loading, setLoading, error, setError } = useFetch();

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setLoading(true);
        const fd = new FormData(event.target);
        const formData = Object.fromEntries(fd.entries());
        try {
            setError(null);
            const response = await axios.post("/auth/signup", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status == 201) {
                navigate("/auth/login")
            }

        } catch (err) {
            console.log("signup error", err);
            setError(err.response.data.message)
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='w-5/6 my-10 mx-auto py-8 px-4 bg-gray-100 rounded-md md:w-1/3'>
            <h3 className='text-2xl font-semibold text-center'>SingUp</h3>
            {!loading && error && <ErrorBox>{error}</ErrorBox>}
            <form className='my-6' onSubmit={handleSignup}>
                <div className='flex-col mb-4'>
                    <label className='text-lg font-medium px-2'>Name</label>
                    <input className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='text' name='name' placeholder='Enter your name' />
                </div>
                <div className='flex-col mb-4'>
                    <label className='text-lg font-medium px-2'>Email Address</label>
                    <input className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='email' name='email' placeholder='Enter your email Address' />
                </div>
                <div className='flex-col mb-4'>
                    <label className='text-lg font-medium px-2'>Password</label>
                    <input className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='password' name='password' placeholder='Enter your password' />
                </div>
                <button className='w-full my-4 py-3 text-center text-xl bg-green-700 text-white rounded-md cursor-pointer transition-all ease-in duration-200 hover:bg-green-800' disabled={loading ? true : false}>{loading ? "Signing...." : "Signup"}</button>
            </form>
            <p className='text-center '>Already have a account?<Link to={"/auth/login"} className='text-blue-700 cursor-pointer hover:underline'> Login </Link></p>
        </div>
    )
}
