import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/api/incidents/all")
      .then((res) => {
        setIncidents(res.data.content || res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load incidents.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading incidents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Incident Timeline Visualiser
      </h1>

      {incidents.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No incidents found.</p>
          <p className="text-gray-300 text-sm mt-2">
            Create your first incident to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Severity</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Reported By</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident, index) => (
                <tr
                  key={incident.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3">{incident.id}</td>
                  <td className="px-4 py-3">{incident.title}</td>
                  <td className="px-4 py-3">{incident.incidentType}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium
                      ${incident.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        incident.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        incident.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium
                      ${incident.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
                        incident.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                        incident.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{incident.reportedBy}</td>
                  <td className="px-4 py-3">
                    {new Date(incident.incidentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}