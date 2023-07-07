import React from 'react';
import './TopBar.css';
import TopBarButton from '../TopBarButton';
import { useEffect } from 'react';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const TopBar = ({ filter, setFilter, user, statuses }) => {
  useEffect(() => {
    // console.log(user);
  }, []);

  const handleSelectChangeUser = (e) => {
    setFilter((prev) => ({ ...prev, user: e.target?.value }));
  };

  const handleSelectChangeStatus = (e) => {
    setFilter((prev) => ({ ...prev, stage: e.target?.value }));
  };
  return (
    <div className="top-bar">
      {/* Все/Непрочитанные/Прочитанные */}
      <TopBarButton className="top-bar-button">
        <select onChange={handleSelectChangeUser}>
          <option value={''}>Все чаты</option>
          <option value={user?._id}>Мои чаты</option>
        </select>
        <FontAwesomeIcon className="top-bar-button-icon" icon={faCaretDown} />
      </TopBarButton>
      {/* Все/Мои чаты/Юзер 1/Юзер 2 */}
      <TopBarButton>
        <select onChange={handleSelectChangeStatus}>
          <option value={''}>Все статусы</option>

          {statuses.map((status, index) => (
            <option key={index} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <FontAwesomeIcon className="top-bar-button-icon" icon={faCaretDown} />
      </TopBarButton>
      {/* Свободные/Необработанные/В работе/...
      <TopBarButton>Мои чаты</TopBarButton>
      {/* Все/Telegram */}
      {/* <TopBarButton>Источник</TopBarButton> */}
      {/* Сначала новые/Сначала старые */}
      {/* <TopBarButton>Дата и время</TopBarButton> */}
    </div>
  );
};

export default TopBar;
