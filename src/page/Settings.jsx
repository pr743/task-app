import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { updateProfile, changePassword } from "../redux/slices/userSlice";

function Settings() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [name, setName] = useState(user?.name || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleProfile = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ name }));
    };

    const handlePassword = (e) => {
        e.preventDefault();
        dispatch(changePassword({ oldPassword, newPassword }));

        setOldPassword("");
        setNewPassword("");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-10">
                <h1 className="text-3xl font-bold mb-8">Settings ⚙️</h1>


                <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-xl">
                    <h2 className="text-xl font-bold mb-4">Update Profile</h2>

                    <form onSubmit={handleProfile} className="space-y-4">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-3 rounded-lg"
                        />

                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                            Update
                        </button>
                    </form>
                </div>

                {/* PASSWORD */}
                <div className="bg-white p-6 rounded-xl shadow max-w-xl">
                    <h2 className="text-xl font-bold mb-4">Change Password</h2>

                    <form onSubmit={handlePassword} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full border p-3 rounded-lg"
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border p-3 rounded-lg"
                        />

                        <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Settings;