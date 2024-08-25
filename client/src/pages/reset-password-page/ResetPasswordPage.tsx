import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Form/Input/Input";
import { UserService } from "../../service/user.service";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState<string>("");

    const handleChangeEmailValue = (e) => {
        setEmail((prev) => e.target.value);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const response = await UserService.resetPassword(email);

            toast.success(response.data?.message);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="w-[100%] h-[100vh] bg-[#222222] flex justify-center items-center">
            <motion.form
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: 0.3 }}
                exit={{ scale: 0.95, opacity: 0, transition: 0.2 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="w-[462px] h-auto text-[#fff] p-[10px] flex flex-col"
            >
                <div className="w-[100%] text-4xl font-thin text-center mb-[30px]">
                    Сброс пароля в <span className="font-bold">Stack</span>
                </div>

                <div className="w-[100%] text-md font-thin text-center flex justify-center mb-[30px]">
                    <div className="w-[70%] text-center leading-6">
                        Мы отправим вам на почту код, который надо будет ввести
                        для подтверждения
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
                        value={email}
                        onChange={handleChangeEmailValue}
                    />
                </div>

                <div className="w-[100%] flex items-center space-x-2">
                    <button
                        type="submit"
                        className="w-[100%] h-[50px] bg-[#ffffff] rounded-[6px] text-black text-xl transition duration-300 hover:bg-purple-500 hover:text-white"
                    >
                        Продолжить
                    </button>
                </div>

                <div className="w-[100%] flex items-center space-x-2 mt-[10px]">
                    <Link
                        to={"/auth"}
                        className="w-[100%] h-[50px] bg-transparent rounded-[6px] text-white text-base transition flex items-center justify-center duration-300 hover:bg-[#fff]/[0.06]"
                    >
                        Вернуться
                    </Link>
                </div>
            </motion.form>
        </div>
    );
};

export default ResetPasswordPage;
