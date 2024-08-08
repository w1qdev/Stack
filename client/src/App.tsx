import AuthPage from "./pages/auth-page/AuthPage";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
    return (
        <div className="app">
            <AuthPage />
            <Toaster />
        </div>
    );
}

export default App;
