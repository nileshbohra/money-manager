import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import router from "./routes.jsx";

createRoot(document.getElementById("root")).render(
	<>
		<Toaster richColors />
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<Provider store={store}>
				<RouterProvider router={router}></RouterProvider>
			</Provider>
		</GoogleOAuthProvider>
	</>
);
