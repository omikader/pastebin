import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status}: ${JSON.stringify(error.data)}`
    : null;

  return (
    <div className="card shadow-xl w-1/3">
      <div className="card-body">
        <h2 className="card-title">Oops!</h2>

        <p>Sorry, an error occurred</p>

        {message && (
          <p>
            <i className="text-error">{message}</i>
          </p>
        )}
      </div>
    </div>
  );
}
