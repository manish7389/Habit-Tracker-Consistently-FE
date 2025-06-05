import { useNavigate } from 'react-router-dom';
import { Pencil, Trash } from 'lucide-react'; // Use any icon lib or svg

import CalendarGrid from './Calender';

export default function HabitCard({ habit, openEditModal, handleDeleteHabit }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 bg-white shadow-sm border rounded-lg p-5 hover:shadow-md transition">
      
     
      <div className='flex justify-between items-center'>
         <h2 className="text-lg font-semibold text-gray-800 hover:underline" onClick={()=>{
       navigate("/detail", { state : { id : habit?.id } });
    }} >{habit.name}</h2>
             <div
                className="flex gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => openEditModal(habit)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDeleteHabit(habit.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash size={18} />
                </button>
              </div>
      </div>
      <p className="text-sm text-gray-500 mb-3">{habit.description}</p>
      <CalendarGrid habitId={habit.id} />

    
    </div>
  );
}
