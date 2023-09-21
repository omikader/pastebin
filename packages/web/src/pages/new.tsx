import { Form } from "react-router-dom";

export function NewPage() {
  return (
    <div className="card shadow-xl w-4/5 lg:w-3/5">
      <div className="card-body">
        <Form method="post" className="join join-vertical gap-5">
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
            <button className="btn btn-accent text-white">Create</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
