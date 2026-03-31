import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { CheckCircle, Zap, Users, Kanban } from "lucide-react";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      
      <section className="text-center py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Manage Projects Faster
        </h1>

        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          Collaborate with your team, manage tasks, and track progress easily.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          
          {!user && (
            <>
              <Link
                to="/register"
                className="px-7 py-3 bg-white text-indigo-600 rounded-lg font-semibold"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="px-7 py-3 bg-indigo-800 rounded-lg font-semibold"
              >
                Login
              </Link>
            </>
          )}

          
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="px-7 py-3 bg-yellow-400 text-black rounded-lg font-semibold"
            >
              Admin Dashboard 
            </Link>
          )}

          
          {user && user.role !== "admin" && (
            <Link
              to="/dashboard"
              className="px-7 py-3 bg-indigo-800 rounded-lg font-semibold"
            >
              Go Dashboard
            </Link>
          )}

        </div>
      </section>

      
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-14">
          Why Use TaskFlow
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <Kanban className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p className="text-gray-600">
              Manage tasks, deadlines and projects easily.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <Users className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Work with your team in one platform.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <Zap className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Realtime Updates</h3>
            <p className="text-gray-600">
              Get instant updates and notifications.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-indigo-600 text-white">
        <h2 className="text-3xl font-bold mb-6">
          Start Managing Your Projects Today
        </h2>

        <Link
          to="/register"
          className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg"
        >
          Start Free
        </Link>
      </section>
    </div>
  );
}

export default Home;