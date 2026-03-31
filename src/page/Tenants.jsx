import { useForm } from "react-hook-form";
import API from "../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import Sidebar from "../components/Sidebar";

function Tenants() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await API.post("/tenants", data);
            alert("Tenant Created");
            reset();
        } catch {
            alert("Error creating tenant");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">


            <Sidebar />


            <div className="flex-1 flex justify-center items-start p-4 md:p-10">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="
            w-full 
            max-w-xl 
            bg-white 
            shadow-xl 
            rounded-xl 
            p-5 
            md:p-8
          "
                >


                    <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                        <Building2 className="text-indigo-600" />
                        Create Workspace
                    </h2>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">


                        <div>
                            <label className="text-sm text-gray-600">
                                Workspace Name
                            </label>

                            <input
                                className="
                  w-full 
                  border 
                  p-3 
                  rounded-lg 
                  mt-1 
                  focus:ring-2 
                  focus:ring-indigo-500 
                  outline-none
                "
                                placeholder="My Company Workspace"
                                {...register("name", { required: "Workspace name required" })}
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">
                                Description
                            </label>

                            <textarea
                                className="
                  w-full 
                  border 
                  p-3 
                  rounded-lg 
                  mt-1 
                  focus:ring-2 
                  focus:ring-indigo-500 
                  outline-none
                "
                                placeholder="Workspace description"
                                {...register("description")}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 flex items-center gap-1">
                                <Users size={16} />
                                Invite Members (email)
                            </label>

                            <input
                                className="
                  w-full 
                  border 
                  p-3 
                  rounded-lg 
                  mt-1 
                  focus:ring-2 
                  focus:ring-indigo-500 
                  outline-none
                "
                                placeholder="member@email.com"
                                {...register("members")}
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="
                w-full 
                bg-indigo-600 
                text-white 
                py-3 
                rounded-lg 
                font-semibold 
                hover:bg-indigo-700 
                transition
              "
                        >
                            Create Workspace
                        </motion.button>

                    </form>

                </motion.div>

            </div>
        </div>
    );
}

export default Tenants;