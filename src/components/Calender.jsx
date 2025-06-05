import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { format, subDays, eachDayOfInterval, isToday } from 'date-fns';

export default function CalendarGrid({ habitId }) {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    axios.get(`/habits/${habitId}/checkins`).then((res) =>
      setCheckins(res.data.map((c) => c.date))
    );
  }, [habitId]);

  const toggleCheckin = async (date) => {
    if (!isToday(new Date(date))) return;

    const exists = checkins.includes(date);
    if (exists) {
      await axios.delete(`/habits/${habitId}/checkins/${date}`);
      setCheckins(checkins.filter((d) => d !== date));
    } else {
      await axios.post(`/habits/${habitId}/checkins`, { date });
      setCheckins([...checkins, date]);
    }
  };

  const days = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date(),
  });

  return (
    <div className="grid grid-cols-7 gap-1 mt-2">
      {days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const isChecked = checkins.includes(dateStr);
        const isCurrentDay = isToday(day);

        return (
          <div
            key={dateStr}
            onClick={() => isCurrentDay && toggleCheckin(dateStr)}
            className={`w-6 h-6 rounded-md border transition cursor-pointer
              ${isCurrentDay ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
              ${
                isChecked
                  ? 'bg-green-500 border-green-600'
                  : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
              }`}
            title={dateStr}
          />
        );
      })}
    </div>
  );
}
