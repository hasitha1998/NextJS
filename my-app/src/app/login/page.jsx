"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios"; 
import React, {useEffect} from "react";
import { toast } from "react-hot-toast"


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        
        })

            const [buttonDisabled, setButtonDisabled]= React.useState(false);
            const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>{

        try {
            setLoading(true);
            const response = await axios.post("api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile")
        } catch (error) {
            console.log("Login failed", error.message);
            toast.error(error.message);    
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    }, [user]);
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr/>
            

                <label htmlFor="email" className="p-2">email</label>
                            <input
                                id="email"
                                type="text"
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                placeholder="email"
                                className="p-2 border border-black rounded-lg text-black"
                            />

                <label htmlFor="password" className="p-2">password</label>
                            <input
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                placeholder="password"
                                className="p-2 mb-2 border border-black rounded-lg"
                            />

            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none">Login here</button>

            <Link href="/signup">new user? visit signup</Link>
        </div>
    );
 }