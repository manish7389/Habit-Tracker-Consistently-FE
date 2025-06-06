import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { format, subDays, eachDayOfInterval, isToday } from 'date-fns';

export default function CalendarGrid({ habitId , onCheckinChange}) {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    axios.get(`/habit_checkins/all_habit_checkins?habit_id=${habitId}`).then((res) => {
      setCheckins(res?.data?.checkins?.map((c) => c.date))
    });
  }, [habitId]);

  const toggleCheckin = async (date) => {
    const exists = checkins.includes(date);
    let payload = {
      habit_id: habitId,
      date: date
    }
    try{
      if (exists) {
        const res = await axios.post(`/habit_checkins/create_habit_checkins`, payload);
        if (res.status == 201 || 200) {
          setCheckins(checkins.filter((d) => d !== date));
          if (typeof onCheckinChange === 'function') {
            onCheckinChange();
          }
        }
      } else {
        const res = await axios.post(`/habit_checkins/create_habit_checkins`, payload);
        if (res.status == 201 || 200) {
          setCheckins([...checkins, date]);
        }
        if (typeof onCheckinChange === 'function') {
          onCheckinChange();
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Something went wrong. Please try again.");
      }
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
        const dateStrs = dateStr?.trim();
        const dateObj = new Date(dateStrs);
        const dayname = dateObj.getDate();

        return (
          <div
            key={dateStr}
            onClick={() => toggleCheckin(dateStr)}
            className={`w-6 h-6 rounded-md border transition cursor-pointer
              ${isCurrentDay ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
              ${isChecked
                ? 'bg-green-500 border-green-600'
                : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
              }`}
            title={dateStr}
          >
            <p className='text-black text-center text-sm'>{dayname}</p>
          </div>
        );
      })}
    </div>
  );
}
