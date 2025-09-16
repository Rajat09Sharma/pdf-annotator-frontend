
import { useDispatch } from "react-redux";
import userImg from "../assets/user.png";
import { userLogout } from "../store/customActions";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <nav className="flex justify-between items-center px-4 py-6 bg-neutral-900 text-white">
            <div className='nav-brand'>
                <Link to={"/"} className="text-2xl font-semibold">Pdf-Anno</Link>
            </div>
            <div className="flex">
                <div className="flex justify-between items-center gap-3">
                    <img src={userImg} alt="User-image" />
                    <button className="text-[16px] px-3 py-1 bg-green-700 rounded-md cursor-pointer transition-all ease-in duration-200 hover:bg-green-800" onClick={() => dispatch(userLogout())}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
