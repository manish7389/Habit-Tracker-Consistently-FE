import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Header from '../components/Header';
import HabitCard from '../components/HabitCard';

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editHabitId, setEditHabitId] = useState(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get('/habits/all_habits');
      if (res?.status == 200) {
        setHabits(res.data?.habits);
      }
    } catch (err) {
      console.log('error', err);
      if (err?.response?.data?.error) {
        return alert(err?.response?.data?.error);
      }
    }
  };

  const handleCreateHabit = async () => {
    if (!habitName.trim()) return;
    try {
      let payload = {
        habit: {
          name: habitName,
          description: description
        }
      }
      const data = await axios.post('/habits/create_habit', payload);
      if (data?.status == 201) {
        setHabitName('');
        setDescription('');
        setShowModal(false);
        fetchHabits(); // refresh the list
      }
    } catch (err) {
      console.log('error', err);
      if (err?.response?.data?.error) {
        return alert(err?.response?.data?.error);
      }
    }
  };

  const handleUpdateHabit = async () => {
    try {
      const payload = {
        habit: {
          name: habitName,
          description: description,
        },
      };
      const res = await axios.patch(`/habits/update_habit?id=${editHabitId}`, payload);
      if (res?.status === 200) {
        closeModal();
        fetchHabits();
      }
    } catch (err) {
      console.log('error', err);
      alert(err?.response?.data?.error || 'Failed to update habit');
    }
  };


  const handleDeleteHabit = async (id) => {
    if (!window.confirm('Are you sure you want to delete this habit?')) return;
    try {
      const res = await axios.delete(`/habits/delete_habit?id=${id}`);
      if (res?.status === 200) {
        fetchHabits();
      }
    } catch (err) {
      console.log('error', err);
      alert(err?.response?.data?.error || 'Failed to delete habit');
    }
  };

  const openEditModal = (habit) => {
    setHabitName(habit.name);
    setDescription(habit.description);
    setEditHabitId(habit.id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setHabitName('');
    setDescription('');
    setEditHabitId(null);
    setIsEditMode(false);
    setShowModal(false);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Habits</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-400  px-4 py-2 rounded-lg shadow text-white"
          >
            + Create Habit
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} openEditModal={openEditModal} handleDeleteHabit={handleDeleteHabit} />
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-black">Create New Habit</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mb-4 text-black"
              placeholder="Habit name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              required
            />

            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mb-4 text-black"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={editHabitId ? handleUpdateHabit : handleCreateHabit}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                {editHabitId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
