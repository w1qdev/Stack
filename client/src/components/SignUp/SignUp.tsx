import { useState } from "react";
import { motion } from "framer-motion";
import { AuthProps } from "@/pages/auth-page/AuthPage";
import Input from "../Form/Input/Input";
import { UserService } from "@/service/user.service";
import toast from "react-hot-toast";

const SignUp = ({ handleChangeLoginStatus }: AuthProps) => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        isSaveDeviceAuth: false,
    });
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const handleChangeFormValues = (e) => {
        const { type, value, id } = e.target;

        if (type === "checkbox") {
            setFormValues((prev) => ({
                ...formValues,
                isSaveDeviceAuth: !prev.isSaveDeviceAuth,
            }));

            return;
        }

        setFormValues((prev) => ({
            ...formValues,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setIsFetching(true);
            const response = await UserService.signUp(formValues);

            if (response.data.userData) {
                UserService.saveToken(response.data.userData.token);

                return toast.success("Вы успешно зарегистрировались!");
            }

            return toast.error(response.data.message);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: 0.3 }}
            exit={{ scale: 0.95, opacity: 0, transition: 0.2 }}
            transition={{ duration: 0.4 }}
            className="w-[462px] h-auto text-[#fff] p-[10px] flex flex-col"
        >
            <div className="w-[100%] text-4xl font-thin text-center mb-[30px]">
                Войти в <span className="font-bold">Stack</span>
            </div>
            <div className="w-[100%] text-lg font-thin text-center flex justify-center mb-[30px]">
                <div className="w-[70%] text-center leading-6">
                    Для входа в аккаунт введите вашу почту
                </div>
            </div>

            <div className="w-[100%] text-lg font-normal text-center flex justify-start items-start flex-col mb-[20px]">
                <label className="mb-[6px] ml-[10px]" htmlFor="email">
                    Email
                </label>
                <Input
                    type="email"
                    placeholder="example@email.com"
                    id="email"
                    value={formValues.email}
                    onChange={handleChangeFormValues}
                />
            </div>

            <div className="w-[100%] text-lg font-normal text-center flex justify-start items-start flex-col mb-[20px]">
                <label className="mb-[6px] ml-[10px]" htmlFor="password">
                    Пароль
                </label>
                <input
                    className="w-[100%] rounded-[6px] bg-transparent border-[1px] border-[#FFFFFF]/[0.36] outline-none py-[8px] px-[16px] transition duration-300 placeholder:text-[#FFFFFF]/[0.33] focus:border-[#ffffff]"
                    type="password"
                    placeholder="*********"
                    id="password"
                    value={formValues.password}
                    onChange={handleChangeFormValues}
                />
            </div>

            <div className="w-[100%] flex items-center space-x-2 ml-3 mt-2 mb-[30px]">
                <input
                    type="checkbox"
                    className="w-[15px] h-[15px] bg-slate-50 mr-2 cursor-pointer"
                    id="isSaveDeviceAuth"
                    checked={formValues.isSaveDeviceAuth}
                    onChange={handleChangeFormValues}
                />
                <label
                    htmlFor="isSaveDeviceAuth"
                    className="text-base font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                    Сохранить вход на этом устройстве
                </label>
            </div>

            <div className="w-[100%] flex items-center space-x-2">
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-[100%] h-[50px] bg-[#ffffff] rounded-[6px] text-black text-xl transition duration-300 hover:bg-purple-500 hover:text-white"
                >
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
        </motion.form>
    );
};

export default SignUp;
