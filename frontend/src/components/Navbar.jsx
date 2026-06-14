import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">Mantis</h1>

      <div className="space-x-4">
        <Link to="/">Products</Link>
        <Link to="/upload">Upload</Link>
      </div>
    </nav>
  );
}