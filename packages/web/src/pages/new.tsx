import { Form } from "react-router-dom";
import { useState } from "react";

export function NewPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="card shadow-xl w-4/5 lg:w-3/5">
      <div className="card-body">
        <Form
          method="post"
          className="join join-vertical gap-5"
          onSubmit={() => setIsLoading(true)}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Title*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Your title"
              className="input input-accent text-sm"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Description</span>
            </label>
            <input
              type="text"
              name="description"
              placeholder="Your description"
              className="input input-accent text-sm"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Snippet*</span>
            </label>
            <textarea
              name="body"
              className="textarea textarea-accent"
              placeholder="Your masterpiece!"
              required
            />
          </div>

          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn btn-accent text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
