import { Mail, Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import API from "../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      dispatch(loginSuccess(res.data));

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="hidden lg:flex w-1/2 text-white items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center space-y-6"
        >
          <h1 className="text-5xl font-bold">Project SaaS</h1>

          <p className="text-lg opacity-90">
            Manage projects, tasks and teams with powerful realtime
            collaboration.
          </p>
        </motion.div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/90 backdrop-blur p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-sm text-gray-600">Email</label>

              <div className="flex items-center border rounded-lg px-3 py-3 mt-1 focus-within:ring-2 focus-within:ring-indigo-500">
                <Mail className="w-5 h-5 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter email"
                  className="ml-2 w-full outline-none bg-transparent"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>

              <div className="flex items-center border rounded-lg px-3 py-3 mt-1 focus-within:ring-2 focus-within:ring-indigo-500">
                <Lock className="w-5 h-5 text-gray-400" />

                <input
                  type="password"
                  placeholder="Enter password"
                  className="ml-2 w-full outline-none bg-transparent"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
