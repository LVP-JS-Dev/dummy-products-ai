import { useEffect, useState } from "react";

const TaskSearch = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);
    setError(null);
    fetch(`/search?query=${encodeURIComponent(searchQuery)}`, {
      signal: abortController.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        setError(error.message);
        setLoading(false);
      });

    return () => abortController.abort();
  }, [searchQuery]); // Depend on searchQuery

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Task Search</h2>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        type="text"
        value={searchQuery}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskSearch;
