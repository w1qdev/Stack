import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LogIn from "@/components/LogIn/LogIn";
import SignUp from "@/components/SignUp/SignUp";

export interface AuthProps {
    handleChangeLoginStatus: () => void;
}

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true); // false - login, true - signup

    const handleChangeLoginStatus = () =>
        setIsLogin((prevIsLogin) => !prevIsLogin);

    return (
        <div className="w-[100%] h-[100vh] bg-[#222222] flex justify-center items-center">
            <AnimatePresence>
                {isLogin ? (
                    <SignUp handleChangeLoginStatus={handleChangeLoginStatus} />
                ) : (
                    <LogIn handleChangeLoginStatus={handleChangeLoginStatus} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AuthPage;
