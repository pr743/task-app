import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../redux/slices/projectSlice";
import { useForm } from "react-hook-form";
import Sidebar from "../components/Sidebar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FolderPlus, Users, Pencil, Trash2 } from "lucide-react";
import ProjectMembers from "./ProjectMembers";
import ProjectActivity from "./ProjectActivity";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading } = useSelector((state) => state.projects);
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const [editId, setEditId] = useState(null);
  const [selectProject, setSelectedProject] = useState(null);

  const tenantId = watch("tenantId");

  useEffect(() => {
    if (!tenantId) return;
    dispatch(getProjects(tenantId));
  }, [tenantId, dispatch]);

  const onSubmit = (data) => {
    if (editId) {
      dispatch(updateProject({ projectId: editId, data }));
      setEditId(null);
    } else {
      dispatch(createProject({ ...data, tenantId }));
    }
    reset();
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setValue("name", project.name);
    setValue("description", project.description);
    setValue("tenantId", project.tenant);
  };

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  const openMembers = (project) => {
    setSelectedProject(project);
  };

  const openTasks = (project) => {
    navigate(`/tasks/${project._id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">


      <Sidebar />


      <div className="flex-1 p-4 md:p-10 overflow-y-auto">


        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Projects
        </h1>


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 md:p-6 rounded-xl shadow mb-8 w-full max-w-xl"
        >
          <h2 className="text-lg md:text-xl font-bold mb-4 flex gap-2 items-center">
            <FolderPlus className="text-indigo-600" />
            {editId ? "Update Project" : "Create Project"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <input
              placeholder="Tenant ID"
              className="w-full border p-3 rounded-lg"
              {...register("tenantId", { required: true })}
            />

            <input
              placeholder="Project Name"
              className="w-full border p-3 rounded-lg"
              {...register("name", { required: true })}
            />

            <textarea
              placeholder="Project Description"
              className="w-full border p-3 rounded-lg"
              {...register("description")}
            />

            <button className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
              {editId ? "Update" : "Create"}
            </button>

          </form>
        </motion.div>

        {loading && (
          <p className="text-gray-500 mb-4">Loading projects...</p>
        )}


        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6
        ">

          {projects?.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 md:p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              <h3 className="font-semibold text-base md:text-lg">
                {project.name}
              </h3>

              <p className="text-gray-500 text-sm mb-4">
                {project.description}
              </p>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <Users size={16} />
                {project.members?.length || 0} Members
              </div>


              <div className="flex flex-wrap gap-3 items-center">

                <button onClick={() => handleEdit(project)}>
                  <Pencil size={18} className="text-blue-500" />
                </button>

                <button onClick={() => handleDelete(project._id)}>
                  <Trash2 size={18} className="text-red-500" />
                </button>

                <button
                  onClick={() => openMembers(project)}
                  className="text-indigo-600 text-sm font-semibold"
                >
                  Members
                </button>

                <button
                  onClick={() => openTasks(project)}
                  className="text-green-600 text-sm font-semibold"
                >
                  Tasks
                </button>

              </div>

            </motion.div>
          ))}

        </div>


        {selectProject && (
          <div className="mt-10">
            <ProjectMembers projectId={selectProject._id} />
          </div>
        )}


        {selectProject && (
          <div className="mt-10">
            <ProjectActivity projectId={selectProject._id} />
          </div>
        )}

      </div>
    </div>
  );
}

export default Projects;