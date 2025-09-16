import axios from "../apis/axiosApi";
import { authAction } from "./authSlice";

export const userLogout = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/auth/logout", {}, { withCredentials: true });
            if (response.status === 200) {
                dispatch(authAction.logout());
            }
        } catch (error) {
            console.log("user logout error", error);
        }
    }
};
