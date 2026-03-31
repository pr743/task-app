import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markAsRead } from "../redux/slices/notificationSlice";
import Sidebar from "../components/Sidebar";

function Notifications() {
    const dispatch = useDispatch();

    const { list, loading } = useSelector(
        (state) => state.notifications || { list: [] }
    );

    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch]);

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">

                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    Notifications 🔔
                </h1>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <div className="space-y-3 md:space-y-4">

                        {list.length === 0 && (
                            <div className="bg-white p-4 rounded-xl shadow text-gray-500 text-center">
                                No notifications
                            </div>
                        )}

                        {list.map((n) => (
                            <div
                                key={n._id}
                                className={`
                                    bg-white 
                                    p-4 
                                    rounded-xl 
                                    shadow 
                                    flex 
                                    flex-col 
                                    sm:flex-row 
                                    sm:items-center 
                                    sm:justify-between 
                                    gap-3
                                    ${!n.read ? "border-l-4 border-indigo-500" : ""}
                                `}
                            >

                                <div className="w-full">
                                    <p className="font-medium text-sm md:text-base">
                                        {n.message}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                {!n.read && (
                                    <button
                                        onClick={() => dispatch(markAsRead(n._id))}
                                        className="
                                            w-full 
                                            sm:w-auto 
                                            px-3 
                                            py-1.5 
                                            text-sm 
                                            text-indigo-600 
                                            border 
                                            border-indigo-200 
                                            rounded-lg 
                                            hover:bg-indigo-50 
                                            transition
                                        "
                                    >
                                        Mark Read
                                    </button>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Notifications;