import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col bg-[#222222] text-[#fff]">
            <div className="text-lg">Ой, Страница не найдена...</div>
            <Link
                to="/"
                className="mt-7 px-6 py-3 bg-white rounded-md text-[#343434] font-medium"
            >
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFoundPage;
