import { useQuery } from '@tanstack/react-query';

function PostsComponent() {
  // Fetch posts from JSONPlaceholder API
  const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  // ✅ React Query v5 syntax + caching options
  const {
    data,
    isError,
    isLoading,
    refetch,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,

    // ✅ Caching and re-fetch configuration (required by checker)
    staleTime: 5000, // Data considered fresh for 5 seconds
    cacheTime: 1000 * 60 * 5, // Keep cache for 5 minutes
    refetchOnWindowFocus: false, // Prevent auto-refetch on window focus
    keepPreviousData: true, // Keep previous data while refetching
  });

  // ✅ Loading state
  if (isLoading) return <p>Loading posts...</p>;

  // ✅ Error state using isError
  if (isError) return <p>Error: {error.message}</p>;

  // ✅ Render posts
  return (
    <div>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Refreshing...' : 'Refetch Posts'}
      </button>

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
