export default function Sidebar() {
    
    return(
        <div className="col-span-2 hidden sm:block text-gray-800">
            <ul>
                <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Cuenta</li>
                <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Billetera</li>
                <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">Notificaciones</li>
            </ul>
        </div>
    );

}