// import { FC } from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SignUp from "@/components/SignUp/SignUp";
import LogIn from "@/components/LogIn/LogIn";

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
                    <LogIn handleChangeLoginStatus={handleChangeLoginStatus} />
                ) : (
                    <SignUp handleChangeLoginStatus={handleChangeLoginStatus} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AuthPage;
