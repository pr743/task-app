import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../redux/slices/taskSlice";

import Sidebar from "../components/Sidebar";
import { PlusCircle, Trash2, MessageCircle } from "lucide-react";
import API from "../api/axios";
import TaskComments from "./TaskComments.jsx";

function Tasks() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const { tasks, loading } = useSelector((state) => state.tasks);

  const [members, setMembers] = useState([]);
  const [showComments, setShowComments] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedUserId: "",
    priority: "medium",
  });

  useEffect(() => {
    dispatch(getTasks(projectId));
  }, [projectId, dispatch]);

  useEffect(() => {
    if (!projectId) return;

    const fetchMembers = async () => {
      try {
        const res = await API.get(`/projects/${projectId}/members`);
        setMembers(res.data.members || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMembers();
  }, [projectId]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTask({ ...form, projectId }));

    setForm({
      title: "",
      description: "",
      assignedUserId: "",
      priority: "medium",
    });
  };

  const handleStatus = (taskId, status) => {
    dispatch(updateTask({ taskId, status }));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">


      <Sidebar />


      <div className="flex-1 p-4 md:p-10 overflow-y-auto">


        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Tasks
        </h1>

        {projectId && (
          <div className="bg-white p-4 md:p-6 rounded-xl shadow mb-8 max-w-xl">

            <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
              <PlusCircle className="text-indigo-600" />
              Create Task
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">

              <input
                placeholder="Title"
                className="w-full border p-3 rounded-lg"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="w-full border p-3 rounded-lg"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <select
                className="w-full border p-3 rounded-lg"
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <select
                className="w-full border p-3 rounded-lg"
                value={form.assignedUserId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    assignedUserId: e.target.value,
                  })
                }
                required
              >
                <option value="">Assign User</option>

                {members.map((m) => (
                  <option key={m.user._id} value={m.user._id}>
                    {m.user.name}
                  </option>
                ))}
              </select>

              <button className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg">
                Create Task
              </button>

            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading tasks...
          </div>
        ) : (
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6
          ">

            {tasks.length === 0 && (
              <p className="text-gray-500">No tasks found</p>
            )}

            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 md:p-5 rounded-xl shadow"
              >

                <h3 className="font-bold text-base md:text-lg">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {task.description}
                </p>

                <p className="text-xs mt-2">
                  Assigned: {task.assignedTo?.name}
                </p>

                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatus(task._id, e.target.value)
                  }
                  className="mt-3 border p-2 rounded w-full"
                >
                  <option value="todo">Todo</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <div className="flex justify-between mt-4">

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 flex items-center gap-1 text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      setShowComments(
                        showComments === task._id ? null : task._id
                      )
                    }
                    className="text-indigo-600 flex items-center gap-1 text-sm"
                  >
                    <MessageCircle size={16} />
                    Comments
                  </button>

                </div>

                {/* COMMENTS */}
                {showComments === task._id && (
                  <div className="mt-4">
                    <TaskComments taskId={task._id} />
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Tasks;