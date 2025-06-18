import { GoogleLogin } from "@react-oauth/google";
import { googleOAuthLoginApi } from "../../api/auth";
import { setUser } from "../../features/user/userSlice";
import { setIsAuthenticated } from "../../features/authToken/authTokenSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogin = async (credentialResponse) => {
		try {
			const data = await googleOAuthLoginApi(
				credentialResponse.credential
			);
			toast.success("Login successful!");
			dispatch(setIsAuthenticated(true));
			navigate("/");
		} catch (err) {
			console.error("Google login error:", err.message);
			toast.error("Login failed. Please try again.");
		}
	};

	return (
		<GoogleLogin
			width={400}
			onSuccess={handleLogin}
			onError={() => alert("Google login error")}
			useOneTap
		/>
	);
}
