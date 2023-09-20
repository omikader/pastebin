import { Link, Outlet } from "react-router-dom";

export function Root() {
  return (
    <div className="flex flex-col place-items-center">
      <div className="navbar bg-accent">
        <Link className="btn btn-ghost normal-case text-xl text-white" to="/">
          Pastebin
        </Link>
      </div>
      <div className="py-12 w-11/12 flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
}
