import { useEffect, useState } from "react";
import API from "../api/axios";
import { Users, UserPlus, Trash2 } from "lucide-react";

function ProjectMembers({ projectId }) {

  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("developer");
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    try {
      const res = await API.get(`/projects/${projectId}/members`);
      setMembers(res.data.members);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [projectId]);

  const handleAddMember = async () => {
    if (!userId) return alert("Enter User ID");

    try {
      setLoading(true);

      await API.post(`/projects/${projectId}/members`, {
        userId,
        role
      });

      setUserId("");
      fetchMembers();

    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await API.delete(`/projects/${projectId}/members/${id}`);
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow">

      {/* TITLE */}
      <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
        <Users size={20} /> Project Members
      </h2>

      {/* ================= ADD MEMBER ================= */}
      <div className="
                flex 
                flex-col 
                sm:flex-row 
                gap-3 
                mb-6
            ">

        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="
                        border 
                        p-2 
                        rounded-lg 
                        w-full 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-indigo-200
                    "
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="
                        border 
                        p-2 
                        rounded-lg 
                        w-full 
                        sm:w-auto
                    "
        >
          <option value="developer">Developer</option>
          <option value="manager">Manager</option>
          <option value="tester">Tester</option>
        </select>

        <button
          onClick={handleAddMember}
          disabled={loading}
          className="
                        bg-indigo-600 
                        text-white 
                        px-4 
                        py-2 
                        rounded-lg 
                        flex 
                        items-center 
                        justify-center 
                        gap-2 
                        w-full 
                        sm:w-auto 
                        hover:bg-indigo-700 
                        transition
                    "
        >
          <UserPlus size={16} />
          {loading ? "Adding..." : "Add"}
        </button>

      </div>

      {/* ================= MEMBERS LIST ================= */}
      <div className="space-y-3">

        {members.length === 0 && (
          <p className="text-gray-500 text-sm">
            No members yet
          </p>
        )}

        {members.map((m) => (
          <div
            key={m.user._id}
            className="
                            flex 
                            flex-col 
                            sm:flex-row 
                            sm:justify-between 
                            sm:items-center 
                            gap-3 
                            bg-gray-50 
                            p-3 
                            rounded-lg
                        "
          >

            {/* USER INFO */}
            <div>
              <p className="font-semibold text-sm md:text-base">
                {m.user.name}
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                {m.user.email}
              </p>
            </div>


            <div className="flex items-center justify-between sm:justify-end gap-3">

              <span className="
                                text-xs 
                                bg-indigo-100 
                                text-indigo-600 
                                px-2 
                                py-1 
                                rounded
                            ">
                {m.role}
              </span>

              <button
                onClick={() => handleRemove(m.user._id)}
                className="p-2 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProjectMembers;