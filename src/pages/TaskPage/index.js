import React from 'react';
import './TaskPage.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import { useState } from 'react';
import { useEffect } from 'react';

const TaskPage = ({ tasks }) => {
  const [events, setEvents] = useState([]);
  console.log(tasks);
  useEffect(() => {
    setEvents(
      tasks.map((task) => ({
        id: task.conversation.chat_id,
        title: task.text,
        date: new Date(task.endAt).getTime(),
      }))
    );
  }, [tasks]);

  const handleDateClick = (arg) => {
    console.log(arg.event);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            omitZeroMinute: false,
            hour12: false,
          }}
          // dateClick={handleDateClick}
          eventClick={handleDateClick}
        />
      </div>
    </div>
  );
};

export default TaskPage;
