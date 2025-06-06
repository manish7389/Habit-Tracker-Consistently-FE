import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Header from '../components/Header';
import CalendarGrid from '../components/Calender';

export default function HabitDetail() {
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    fetchHabitDetail();
  }, []);

  const fetchHabitDetail = async () => {
    try {
      const res = await axios.get(`/habits/show_habit?id=${id}`);
      if (res?.status == 200) {
        setHabit(res.data?.habit);
      }
    } catch (err) {
      console.log('error', err);
      if (err?.response?.data?.error) {
        return alert(err?.response?.data?.error);
      }
    }
  };


  if (!habit) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{habit.name}</h1>
          <p className="text-gray-600 mb-4">{habit.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 text-blue-900 p-4 rounded-xl">
              <p className="text-sm font-medium">Current Streak</p>
              <p className="text-xl font-bold">{habit.current_streak || 0} days</p>
            </div>
            <div className="bg-green-100 text-green-900 p-4 rounded-xl">
              <p className="text-sm font-medium">Longest Streak</p>
              <p className="text-xl font-bold">{habit.longest_streak || 0} days</p>
            </div>
            <div className="bg-yellow-100 text-yellow-900 p-4 rounded-xl">
              <p className="text-sm font-medium">Consistency</p>
              <p className="text-xl font-bold">
                {habit.consistency_percentage ? `${habit.consistency_percentage}%` : '0%'}
              </p>
            </div>
            <div className="bg-purple-100 text-purple-900 p-4 rounded-xl">
              <p className="text-sm font-medium">Total Completions</p>
              <p className="text-xl font-bold">{habit.total_completions || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Completion Calendar</h2>
          <CalendarGrid habitId={habit?.id} />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-block text-blue-600 hover:underline text-sm"
        >
          ← Back to Dashboard
        </button>
      </main>
    </div>
  );
}
