export function notFound() {
  return (
    <div>
      <p>Not Project Found</p>
      <Link to="/projects">
        <button className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-400">
          Back to Projects
        </button>
      </Link>
    </div>
  );
}
