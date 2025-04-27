import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">{children}</div>
    </div>
  );
}
