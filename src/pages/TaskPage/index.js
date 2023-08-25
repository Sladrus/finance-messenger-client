import React from 'react';
import './TaskPage.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskPage = ({ tasks, setSelectedConversation }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

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
    navigate('/messenger');
    setSelectedConversation(Number(arg.event.id));
  };

  return (
    <div style={{ height: 'calc(100% - 66px)' }}>
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
          eventClick={handleDateClick}
        />
        {/* <div
          style={{
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
          }}
        >
          <span
            style={{
              fontSize: '26px',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            Список задач
          </span>
          <div>
            {tasks?.map((task) => (
              <div key={task._id}>
                <span>{task.text}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TaskPage;
