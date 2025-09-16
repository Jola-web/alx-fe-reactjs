import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await fetchUserData(username);
      setResults([data]);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

    const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await fetchAdvancedUsers(username, location, minRepos);
      setResults(data.items || []);
    } catch {
      setError("No users found for given criteria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* Basic Search */}
      <form onSubmit={handleBasicSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* Advanced Search */}
      <form onSubmit={handleAdvancedSearch} className="space-y-2">
        <input
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Min repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Advanced Search
        </button>
      </form>

      {/* Results */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4 space-y-4">
        {results.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow flex items-center gap-4">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="font-bold">{user.name || user.login}</h2>
              {user.location && <p>📍 {user.location}</p>}
              {user.public_repos !== undefined && <p>Repos: {user.public_repos}</p>}
              <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                Visit Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
