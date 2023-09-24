import * as React from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ErrorPage } from "./error";
import { LoadingPage } from "./loading";
import type { snippetLoader } from "../api";

export function SnippetPage() {
  const { data } = useLoaderData() as Awaited<ReturnType<typeof snippetLoader>>;

  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Await resolve={data} errorElement={<ErrorPage />}>
        {(snippet) => (
          <div className="card shadow-xl w-4/5 lg:w-3/5">
            <div className="card-body">
              <h2 className="card-title">{snippet.title}</h2>
              {snippet?.description && <p>{snippet.description}</p>}
              <div className="divider" />
              <p style={{ whiteSpace: "pre-line" }}>{snippet.body}</p>
            </div>
          </div>
        )}
      </Await>
    </React.Suspense>
  );
}
