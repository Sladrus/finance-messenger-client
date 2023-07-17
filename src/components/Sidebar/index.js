import React, { useState } from 'react';
import SidebarButton from '../SidebarButton';
import './Sidebar.css';
import {
  faDoorOpen,
  faMessage,
  faListCheck,
  faDiagramPredecessor,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { BOARD_ROUTE, MESSENGER_ROUTE, TASKS_ROUTE } from '../../utils/consts';
import { useEffect } from 'react';

const Sidebar = ({ logout }) => {
  const buttons = [
    { id: 0, text: 'Мессенджер', icon: faMessage, route: MESSENGER_ROUTE },
    {
      id: 1,
      text: 'Доска',
      icon: faDiagramPredecessor,
      route: BOARD_ROUTE,
    },
    // { id: 2, text: 'Задачи', icon: faListCheck, route: TASKS_ROUTE },
  ];
  const navigate = useNavigate();

  const location = buttons.find((o) => o.route === window.location.pathname);
  const [selectedButton, setSelectedButton] = useState(location?.id);

  useEffect(() => {
    const location = buttons.find((o) => o.route === window.location.pathname);
    setSelectedButton(location?.id);
  }, [window.location.pathname]);

  const handleSideButtonClick = (id) => {
    setSelectedButton(id);
    navigate(buttons[id].route);
  };
  return (
    <div
      className="sidebar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {buttons.map((button, index) => (
          <SidebarButton
            key={index}
            id={button.id}
            text={button.text}
            icon={button.icon}
            selectedButton={selectedButton}
            handleSideButtonClick={handleSideButtonClick}
          />
        ))}
      </div>
      <div className="sidebar-button" onClick={() => navigate('/auth')}>
        <div className="sidebar-container">
          <FontAwesomeIcon
            className={`sidebar-icon`}
            icon={faDoorOpen}
            onClick={() => logout()}
          />
        </div>
        <span>Выйти</span>
      </div>
    </div>
  );
};

export default Sidebar;
