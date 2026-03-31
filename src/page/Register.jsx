import { User, Mail, Lock } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import API from "../api/axios"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

function Register(){

const { register, handleSubmit, formState:{errors} } = useForm()

const [loading,setLoading] = useState(false)

const navigate = useNavigate()

const onSubmit = async(data)=>{

try{

setLoading(true)

await API.post("/auth/register",data)

navigate("/login")

}catch(err){

console.log(err)
alert("Register failed")

}

setLoading(false)

}

return(

<div className="min-h-screen flex bg-gradient-to-br from-indigo-500 to-purple-600">




<div className="hidden lg:flex w-1/2 text-white items-center justify-center">

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="max-w-md text-center space-y-6"
>

<h1 className="text-5xl font-bold">
Project SaaS
</h1>

<p className="text-lg opacity-90">
Create your workspace and manage projects with realtime collaboration.
</p>

</motion.div>

</div>




<div className="flex w-full lg:w-1/2 items-center justify-center">

<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
transition={{duration:0.6}}
className="w-full max-w-md bg-white/90 backdrop-blur p-10 rounded-2xl shadow-2xl"
>

<h2 className="text-3xl font-bold text-gray-800 mb-8">
Create Account
</h2>

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">




<div>

<label className="text-sm text-gray-600">
Full Name
</label>

<div className="flex items-center border rounded-lg px-3 py-3 mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

<User className="w-5 h-5 text-gray-400"/>

<input
type="text"
placeholder="Enter your name"
className="ml-2 w-full outline-none bg-transparent"
{...register("name",{required:true})}
/>

</div>

{errors.name && (
<p className="text-red-500 text-sm mt-1">
Name is required
</p>
)}

</div>


<div>

<label className="text-sm text-gray-600">
Email
</label>

<div className="flex items-center border rounded-lg px-3 py-3 mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

<Mail className="w-5 h-5 text-gray-400"/>

<input
type="email"
placeholder="Enter email"
className="ml-2 w-full outline-none bg-transparent"
{...register("email",{required:true})}
/>

</div>

{errors.email && (
<p className="text-red-500 text-sm mt-1">
Email required
</p>
)}

</div>



<div>

<label className="text-sm text-gray-600">
Password
</label>

<div className="flex items-center border rounded-lg px-3 py-3 mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

<Lock className="w-5 h-5 text-gray-400"/>

<input
type="password"
placeholder="Enter password"
className="ml-2 w-full outline-none bg-transparent"
{...register("password",{required:true,minLength:6})}
/>

</div>

{errors.password && (
<p className="text-red-500 text-sm mt-1">
Password minimum 6 characters
</p>
)}

</div>



<motion.button
whileHover={{scale:1.03}}
whileTap={{scale:0.95}}
type="submit"
disabled={loading}
className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
>

{loading ? "Creating..." : "Create Account"}

</motion.button>

</form>

<p className="text-sm text-gray-500 mt-6 text-center">
Already have an account?{" "}
<Link to="/login" className="text-indigo-600 font-semibold">
Login
</Link>
</p>

</motion.div>

</div>

</div>

)

}

export default Register