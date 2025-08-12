import { useState } from "react"
import { Link, useNavigate,  } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL


export default function Signup(){

    const [formData, setFormData] = useState({
          name: "", 
          email: "", 
          password: ""
        }
    );
    const navigate= useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlesubmit= async(e)=>{
        e.preventDefault();

        try{
            const url=`${apiUrl}/signup`;
            const response= await fetch(url,{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const result= await response.json();
            const {message, success, error}= result;
            
            if(success){
                toast.success(message+"moving to login page");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
            else if(error){
                toast.error(error?.details[0].message);
            }
            else toast.error(message);
        }
        catch(err){
            toast.error(err.TypeError);
        }
    }

    return(
        <div className="flex flex-col h-[450px] w-[350px] justify-between border-2 border-gray-400 p-4 shadow-2xl shadow-blue-200">

            <h1 className="text-3xl bg-gray-400 p-1 text-center text-white font-bold rounded-md">Signup</h1>

            <form onSubmit={handlesubmit} className="flex flex-col justify-between h-[300px]">
                <div>
                <label>
                    Name:
                    <input type="text" name="name" autoFocus placeholder="enter name" value={formData.name} onChange={handleChange} />
                </label>
                </div>

                <div>
                <label>
                    Email:
                    <input type="email" name="email" placeholder="enter email" value={formData.email} onChange={handleChange} />
                </label>
                </div>

                <div>
                <label>
                    Password:
                    <input type="password" name="password"  placeholder="enter password" value={formData.password} onChange={handleChange} />
                </label>
                </div>

                <div className="flex flex-col gap-1">
                    <button type="submit" className="bg-blue-300 rounded-md text-xl py-1 border-2 border-transparent hover:border-blue-600 cursor-pointer">Signup</button>
                    <span>Already have a account? 
                        <Link to="/login" className="text-blue-600 underline">Login</Link>
                    </span>
                </div>
            </form>

            <ToastContainer position="top-right" autoClose={2000}/>
        </div>
    )
}
