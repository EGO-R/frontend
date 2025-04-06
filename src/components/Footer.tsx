export default function Footer() {
    return (
        <footer className="py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <span className="text-gray-600">&copy; Alexandrina, 2025</span>
                <ul className="flex flex-col md:flex-row md:space-x-6 text-sm text-gray-500 mt-4 md:mt-0">
                    <li>Имя: Трусов Егор Сергеевич</li>
                    <li>Группа: ИКБО-16-22</li>
                    <li>Email: <a href="mailto:egor_trusov00@mail.com" className="hover:text-blue-600">egor_trusov00@mail.com</a></li>
                    <li>Телефон: <a href="tel:+79258310755" className="hover:underline">+7 (925) 831-07-55</a></li>
                </ul>
            </div>
        </footer>
    );
}
