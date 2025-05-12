import { useNavigate } from 'react-router-dom';

interface DemoControlsProps {
  currentId: string | undefined;
}

const DemoControls: React.FC<DemoControlsProps> = ({ currentId }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-10 border-t pt-6">
      <div className="max-w-md mx-auto">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Demo Controls - Switch Dashboard</h3>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/dashboard/1')}
            className={`px-4 py-2 text-sm rounded ${currentId === '1' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Student
          </button>
          <button 
            onClick={() => navigate('/dashboard/2')}
            className={`px-4 py-2 text-sm rounded ${currentId === '2' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Company
          </button>
          <button 
            onClick={() => navigate('/dashboard/3')}
            className={`px-4 py-2 text-sm rounded ${currentId === '3' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            SCAD Office
          </button>
          <button 
            onClick={() => navigate('/dashboard/4')}
            className={`px-4 py-2 text-sm rounded ${currentId === '4' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Faculty
          </button>
          <button 
            onClick={() => navigate('/dashboard/5')}
            className={`px-4 py-2 text-sm rounded ${currentId === '5' ? 'bg-scad-red text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            PRO Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoControls;