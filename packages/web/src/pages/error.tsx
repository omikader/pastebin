import { ErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className="card shadow-xl w-1/4">
      <div className="card-body">
        <h2 className="card-title">Oops!</h2>
        <p>Sorry, an error has occurred.</p>
        <p>
          <i className="text-error">
            {error.status}: {error.data}
          </i>
        </p>
      </div>
    </div>
  );
}
