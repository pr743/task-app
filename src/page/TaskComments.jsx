import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    addComment,
    deleteComment,
} from "../redux/slices/commentSlice";

import { Send, Trash2 } from "lucide-react";
import socket from "../socket/socket";

function TaskComments({ taskId }) {

    const dispatch = useDispatch();

    const { comments = [], loading } = useSelector(
        (state) => state.comments || {}
    );

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!taskId) return;

        dispatch(getComments(taskId));

        socket.emit("joinTask", taskId);

        socket.on("newComment", (newComment) => {
            dispatch({
                type: "comments/addComment/fulfilled",
                payload: newComment,
            });
        });

        return () => {
            socket.off("newComment");
        };

    }, [taskId, dispatch]);

    const handleAdd = () => {
        if (!message.trim()) return;
        dispatch(addComment({ taskId, message }));
        setMessage("");
    };

    return (
        <div className="
            bg-white 
            h-full 
            flex 
            flex-col 
            rounded-xl 
            shadow 
            overflow-hidden
        ">


            <div className="p-3 border-b">
                <h2 className="font-bold text-base md:text-lg">
                    💬 Comments
                </h2>
            </div>


            <div className="
                flex-1 
                overflow-y-auto 
                p-3 
                space-y-3
                bg-gray-50
            ">

                {loading && (
                    <p className="text-sm text-gray-500">
                        Loading...
                    </p>
                )}

                {comments.map((c) => (
                    <div
                        key={c._id}
                        className="
                            bg-white 
                            p-3 
                            rounded-lg 
                            shadow-sm
                            border
                        "
                    >


                        <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold text-xs md:text-sm">
                                {c.user?.name}
                            </p>

                            <button
                                onClick={() => dispatch(deleteComment(c._id))}
                                className="
                                    text-red-500 
                                    p-1 
                                    rounded 
                                    hover:bg-red-50
                                "
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>


                        <p className="text-sm text-gray-700">
                            {c.message}
                        </p>

                    </div>
                ))}
            </div>


            <div className="
                flex 
                gap-2 
                p-3 
                border-t 
                bg-white
            ">

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="
                        flex-1 
                        border 
                        p-2.5 
                        rounded-lg 
                        text-sm 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-indigo-500
                    "
                    placeholder="Write a comment..."
                />

                <button
                    onClick={handleAdd}
                    className="
                        bg-indigo-600 
                        text-white 
                        px-3 
                        md:px-4 
                        rounded-lg 
                        flex 
                        items-center 
                        justify-center
                        hover:bg-indigo-700
                        active:scale-95
                        transition
                    "
                >
                    <Send size={16} />
                </button>

            </div>
        </div>
    );
}

export default TaskComments;