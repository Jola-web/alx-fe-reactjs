import { useState } from "react";
import { fetchUserData, fetchAdvancedUsers } from "../services/githubService";

function Search() {
  // Form states
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  // Results & API states
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // Handle advanced search
  const handleAdvancedSearch = async (e, resetPage = true) => {
    e.preventDefault();
    if (resetPage) setPage(1);

    setLoading(true);
    setError("");
    if (resetPage) setResults([]);

    try {
      const data = await fetchAdvancedUsers(
        username,
        location,
        minRepos,
        resetPage ? 1 : page
      );
      setResults((prev) => (resetPage ? data.items : [...prev, ...data.items]));
    } catch {
      setError("No users found for given criteria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h1>

      {/* Advanced Search Form */}
      <form
        onSubmit={(e) => handleAdvancedSearch(e, true)}
        className="space-y-3 bg-gray-100 p-4 rounded-xl shadow"
      >
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
          placeholder="Min repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
        >
          Advanced Search
        </button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {/* Results */}
      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="font-bold text-lg">{user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (Load More) */}
      {results.length > 0 && !loading && (
        <div className="mt-6 text-center">
          <button
            onClick={(e) => {
              setPage((prev) => prev + 1);
              handleAdvancedSearch(e, false);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
