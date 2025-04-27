import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-dark p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          SCAD System
        </Link>
        <ul className="flex space-x-6">
          <li><Link to="/company">Company Dashboard</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
        </ul>
      </div>
    </nav>
  );
}
