// import { FC } from "react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface AuthProps {
    handleChangeLoginStatus: () => void;
}

const SignUp = ({ handleChangeLoginStatus }: AuthProps) => {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: 0.3 }}
            exit={{ scale: 0.95, opacity: 0, transition: 0.2 }}
            transition={{ duration: 0.4 }}
            className="w-[462px] h-auto text-[#fff] p-[10px] flex flex-col"
        >
            <div className="w-[100%] text-4xl font-thin text-center mb-[30px]">
                Вход в <span className="font-bold">Stack</span>
            </div>
            <div className="w-[100%] text-lg font-thin text-center flex justify-center mb-[30px]">
                <div className="w-[70%] text-center leading-6">
                    Для входа аккаунта введите вашу почту
                </div>
            </div>

            <div className="w-[100%] text-lg font-normal text-center flex justify-start items-start flex-col mb-[20px]">
                <label className="mb-[6px] ml-[10px]" htmlFor="email-input">
                    Email
                </label>
                <input
                    className="w-[100%] rounded-[6px] bg-transparent border-[1px] border-[#FFFFFF]/[0.36] outline-none py-[8px] px-[16px] transition duration-300 placeholder:text-[#FFFFFF]/[0.33] focus:border-[#ffffff]"
                    type="email"
                    placeholder="example@email.com"
                    id="email-input"
                />
            </div>

            <div className="w-[100%] text-lg font-normal text-center flex justify-start items-start flex-col mb-[20px]">
                <label className="mb-[6px] ml-[10px]" htmlFor="password-input">
                    Пароль
                </label>
                <input
                    className="w-[100%] rounded-[6px] bg-transparent border-[1px] border-[#FFFFFF]/[0.36] outline-none py-[8px] px-[16px] transition duration-300 placeholder:text-[#FFFFFF]/[0.33] focus:border-[#ffffff]"
                    type="password"
                    placeholder="*********"
                    id="password-input"
                />
            </div>

            <div className="w-[100%] flex items-center space-x-2 ml-3 mt-2 mb-[30px]">
                <Checkbox className="bg-slate-50 mr-2" id="terms" />
                <label
                    htmlFor="terms"
                    className="text-base font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                    Сохранить вход на этом устройстве
                </label>
            </div>

            <div className="w-[100%] flex items-center space-x-2">
                <button className="w-[100%] h-[50px] bg-[#ffffff] rounded-[6px] text-black text-xl transition duration-300 hover:bg-purple-500 hover:text-white">
                    Продолжить
                </button>
            </div>

            <div className="w-[100%] flex items-center space-x-2 mt-[10px]">
                <button
                    onClick={handleChangeLoginStatus}
                    className="w-[100%] h-[50px] bg-transparent rounded-[6px] text-white text-base transition duration-300 hover:bg-[#fff]/[0.06]"
                >
                    Регистрация
                </button>
            </div>
        </motion.div>
    );
};

const LogIn = ({ handleChangeLoginStatus }: AuthProps) => {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: 0.3 }}
            exit={{ scale: 0.95, opacity: 0, transition: 0.2 }}
            transition={{ duration: 0.4 }}
            className="w-[462px] h-auto text-[#fff] p-[10px] flex flex-col"
        >
            <div className="w-[100%] text-4xl font-thin text-center mb-[30px]">
                Регистрация в <span className="font-bold">Stack</span>
            </div>
            <div className="w-[100%] text-lg font-thin text-center flex justify-center mb-[30px]">
                <div className="w-[70%] text-center leading-6">
                    Для подтверждения аккаунта введите вашу почту
                </div>
            </div>

            <div className="w-[100%] text-lg font-normal text-center flex justify-start items-start flex-col mb-[20px]">
                <label className="mb-[6px] ml-[10px]" htmlFor="email-input">
                    Email
                </label>
                <input
                    className="w-[100%] rounded-[6px] bg-transparent border-[1px] border-[#FFFFFF]/[0.36] outline-none py-[8px] px-[16px] transition duration-300 placeholder:text-[#FFFFFF]/[0.33] focus:border-[#ffffff]"
                    type="email"
                    placeholder="example@email.com"
                    id="email-input"
                />
            </div>

            <div className="w-[100%] text-lg font-normal text-center flex justify-start items-start flex-col mb-[20px]">
                <label className="mb-[6px] ml-[10px]" htmlFor="password-input">
                    Пароль
                </label>
                <input
                    className="w-[100%] rounded-[6px] bg-transparent border-[1px] border-[#FFFFFF]/[0.36] outline-none py-[8px] px-[16px] transition duration-300 placeholder:text-[#FFFFFF]/[0.33] focus:border-[#ffffff]"
                    type="password"
                    placeholder="*********"
                    id="password-input"
                />
            </div>

            <div className="w-[100%] flex items-center space-x-2 ml-3 mt-2 mb-[30px]">
                <Checkbox className="bg-slate-50 mr-2" id="terms" />
                <label
                    htmlFor="terms"
                    className="text-base font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                    Сохранить вход на этом устройстве
                </label>
            </div>

            <div className="w-[100%] flex items-center space-x-2">
                <button className="w-[100%] h-[50px] bg-[#ffffff] rounded-[6px] text-black text-xl transition duration-300 hover:bg-purple-500 hover:text-white">
                    Продолжить
                </button>
            </div>

            <div className="w-[100%] flex items-center space-x-2 mt-[10px]">
                <button
                    onClick={handleChangeLoginStatus}
                    className="w-[100%] h-[50px] bg-transparent rounded-[6px] text-white text-base transition duration-300 hover:bg-[#fff]/[0.06]"
                >
                    Войти
                </button>
            </div>
        </motion.div>
    );
};

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
