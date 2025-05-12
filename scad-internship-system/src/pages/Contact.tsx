import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-scad-dark text-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <div className="space-y-4 text-lg">
            <div>
              <span className="font-semibold">Email:</span> info@scadcompass.edu
            </div>
            <div>
              <span className="font-semibold">Phone:</span> +20 110 099 6345
            </div>
            <div>
              <span className="font-semibold">Address:</span> New Cairo City. Main Entrance El-Tagamoa El-Khames
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 