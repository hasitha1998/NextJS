"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios"; 
import React, { useEffect } from "react";
import { toast } from "react-hot-toast"


export default function SignUpPage(){

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
        })

    const [buttonDisabled, setButtonDisabled]= React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () =>{

        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login")

        } catch (error) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        }finally{
            setLoading(false)
        }
 
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length >0 && user.username.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    }, [user]);
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>{loading ? "Processing" : "signUp"}</h1>
            <hr/>
            <label htmlFor="username" className="p-2">username</label>
            <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                className="p-2 border border-black rounded-lg text-black"
            />

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
                className="p-2 mb-2 border border-black rounded-lg text-black"
            />

            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none">{buttonDisabled ? "No signup":"signup"}</button>

            <Link href="/login">visit login</Link>
        </div>
    );
 }