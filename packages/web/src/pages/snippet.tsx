import { useLoaderData } from "react-router-dom";

interface Snippet {
  title: string;
  description?: string;
  body: string;
}

export function SnippetPage() {
  const data = useLoaderData() as Snippet;

  return (
    <div className="card shadow-xl w-3/4">
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>

        {data?.description && <p>{data.description}</p>}

        <div className="divider" />

        <p style={{ whiteSpace: "pre-line" }}>{data.body}</p>
      </div>
    </div>
  );
}
