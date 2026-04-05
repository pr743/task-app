import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Folder, CheckSquare, Users, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import API from "../api/axios";

function Dashboard() {
    const { user } = useSelector((state) => state.auth);

    const [stats, setStats] = useState({
        projects: 0,
        tasks: 0,
        members: 0,
        notifications: 0,
        recentProjects: [],
    });

    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            const res = await API.get("/dashboard/stats");

            setStats({
                projects: res.data.project,
                tasks: res.data.task,
                members: res.data.member,
                notifications: res.data.notifications,
                recentProjects: res.data.recentProjects || [],
            });

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchDashboard();
        const interval = setInterval(fetchDashboard, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="p-6 text-lg">Loading dashboard...</div>;
    }

    return (
        <div className="flex h-dvh overflow-hidden bg-gray-100">

            <Sidebar />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">

                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Welcome, {user?.name?.split(" ")[0]} 👋
                </h1>

                <p className="text-gray-500 mb-6">
                    Here is your project overview
                </p>

                <div className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-4 
                    gap-4 
                    mb-6
                ">
                    <StatCard title="Projects" value={stats.projects} icon={<Folder />} color="indigo" />
                    <StatCard title="Tasks" value={stats.tasks} icon={<CheckSquare />} color="green" />
                    <StatCard title="Alerts" value={stats.notifications} icon={<Bell />} color="red" />
                </div>

                <div className="bg-white rounded-xl shadow p-4 mb-6">

                    <h2 className="text-lg font-bold mb-4">
                        Recent Projects
                    </h2>

                    <div className="grid gap-4 md:hidden">
                        {stats.recentProjects.map((p, i) => (
                            <div key={i} className="border rounded-xl p-4 bg-gray-50">
                                <h3 className="font-semibold">{p.name}</h3>

                                <div className="flex justify-between text-sm mt-2 text-gray-600">
                                    <span>Status</span>
                                    <span className="capitalize">{p.status}</span>
                                </div>

                            </div>
                        ))}
                    </div>


                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="text-left text-gray-500 border-b">
                                    <th className="py-2">Project</th>
                                    <th>Status</th>
                                    <th>Team</th>
                                </tr>
                            </thead>

                            <tbody>
                                {stats.recentProjects.map((p, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50">
                                        <td className="py-3 font-medium">{p.name}</td>
                                        <td className="capitalize">{p.status}</td>
                                        <td>{p.team} Members</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>


                <div className="bg-white rounded-xl shadow p-4">
                    <h2 className="text-lg font-bold mb-4">Recent Activity</h2>

                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>📌 New project created</li>
                        <li>✅ Task completed</li>
                        <li>👥 Member added</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

const StatCard = ({ title, value, icon, color }) => {
    const colors = {
        indigo: "bg-indigo-100 text-indigo-600",
        green: "bg-green-100 text-green-600",
        blue: "bg-blue-100 text-blue-600",
        red: "bg-red-100 text-red-600",
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <div className={`p-2 rounded-lg ${colors[color]}`}>
                {icon}
            </div>

            <div>
                <p className="text-xs text-gray-500">{title}</p>
                <h2 className="text-lg font-bold">{value}</h2>
            </div>
        </div>
    );
};

export default Dashboard;