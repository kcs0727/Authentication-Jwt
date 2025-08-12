import { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


export default function Home({ setisauth }) {
    const [user, setuser] = useState("")
    const [email, setemail] = useState("")
    const [data, setdata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setuser(localStorage.getItem('name'))
        setemail(localStorage.getItem('email'))
        fetchdata();
    }, [])

    const fetchdata = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = "http://localhost:5000/products";
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const result = await response.json();
            setdata(result);
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    const handlelogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        toast.success("User logout successfully")
        setTimeout(() => {
            setisauth(false);
            navigate('/login');
        }, 2000);
    }

    return (
        <div className="flex flex-col justify-between border-2 border-gray-400 p-4 shadow-2xl shadow-blue-200">

            <h1 className="text-3xl bg-gray-400 p-1 text-center text-white my-4 font-bold rounded-md">Welcome {user}</h1>

            <h2 className="text-xl my-4">Your email is: {email}</h2>
            <div className="text-center m-6">
                {
                    data && data.map((item, index) => (
                        <ul key={index} className="text-xl">
                            {item.name}:{item.price}
                        </ul>
                    ))
                }
            </div>

            <div className="w-full flex justify-center">
                <button onClick={handlelogout} className="bg-red-400 text-white w-1/2 rounded-md text-xl py-1 my-4 border-2 border-transparent hover:border-blue-600 cursor-pointer">Logout</button>
            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}