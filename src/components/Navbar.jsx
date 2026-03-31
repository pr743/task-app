import { Menu, Bell, Search } from "lucide-react"
import { Menu as HeadlessMenu } from "@headlessui/react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/slices/authSlice"
import Sidebar from "./Sidebar"

function Navbar(){

const dispatch = useDispatch()

const user = useSelector((state)=>state.auth?.user)
const projects = useSelector((state)=>state.projects?.list || [])


return(
   
<motion.div
initial={{ y:-40, opacity:0 }}
animate={{ y:0, opacity:1 }}
transition={{ duration:0.4 }}
className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm sticky top-0 z-50"
>



<div className="flex items-center gap-4">

<button className="lg:hidden">
<Menu className="w-6 h-6 text-gray-600"/>
</button>

<h1 className="text-xl font-bold text-indigo-600">
TaskFlow
</h1>

</div>




<div className="hidden lg:flex items-center gap-2">

<select className="border px-3 py-2 rounded-lg text-sm">

<option>All Projects</option>

{projects.map((p)=>(
<option key={p._id}>
{p.name}
</option>
))}

</select>

</div>




<div className="hidden md:flex items-center w-80 bg-gray-100 rounded-lg px-3 py-2">

<Search className="w-4 h-4 text-gray-400"/>

<input
type="text"
placeholder="Search tasks..."
className="bg-transparent outline-none ml-2 w-full text-sm"
/>

</div>





<div className="flex items-center gap-6">




<button className="relative">

<Bell className="w-6 h-6 text-gray-600"/>

<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
3
</span>

</button>





<HeadlessMenu as="div" className="relative">

<HeadlessMenu.Button className="flex items-center gap-2">

<img
src={user?.avatar || "https://i.pravatar.cc/40"}
className="w-9 h-9 rounded-full"
/>

<span className="hidden md:block text-sm font-medium text-gray-700">
{user?.name}
</span>

</HeadlessMenu.Button>



<HeadlessMenu.Items className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-lg py-2">

<HeadlessMenu.Item>
{({active})=>(
<button className={`w-full text-left px-4 py-2 text-sm ${active?"bg-gray-100":""}`}>
Profile
</button>
)}
</HeadlessMenu.Item>


<HeadlessMenu.Item>
{({active})=>(
<button className={`w-full text-left px-4 py-2 text-sm ${active?"bg-gray-100":""}`}>
My Projects
</button>
)}
</HeadlessMenu.Item>


<HeadlessMenu.Item>
{({active})=>(
<button
onClick={()=>dispatch(logout())}
className={`w-full text-left px-4 py-2 text-sm text-red-500 ${active?"bg-gray-100":""}`}
>
Logout
</button>
)}
</HeadlessMenu.Item>

</HeadlessMenu.Items>

</HeadlessMenu>

</div>

</motion.div>
);  
};

export default  Navbar;