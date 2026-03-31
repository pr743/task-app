import { useEffect, useState } from "react";
import API from "../api/axios";
import { Activity } from "lucide-react";

function ProjectActivity({ projectId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const fetchActivity = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/activity/${projectId}`);
      setLogs(res.data.logs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchActivity();
    }
  }, [projectId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      
      
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity /> Activity Logs
      </h2>

      
      {loading && <p className="text-gray-500">Loading...</p>}

      
      {!loading && logs.length === 0 && (
        <p className="text-gray-500">No activity yet</p>
      )}

      
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log._id}
            className="border p-3 rounded-lg bg-gray-50"
          >
            <p className="text-sm">
              <strong>{log.user?.name || "Unknown"}</strong> - {log.action}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProjectActivity;