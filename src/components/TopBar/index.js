import React from 'react';
import './TopBar.css';
import TopBarButton from '../TopBarButton';

const TopBar = () => {
  return (
    <div className="top-bar">
      {/* Все/Непрочитанные/Прочитанные */}
      <TopBarButton>Все</TopBarButton>
      {/* Все/Мои чаты/Юзер 1/Юзер 2 */}
      <TopBarButton>Статус</TopBarButton>
      {/* Свободные/Необработанные/В работе/... */}
      <TopBarButton>Мои чаты</TopBarButton>
      {/* Все/Telegram */}
      <TopBarButton>Источник</TopBarButton>
      {/* Сначала новые/Сначала старые */}
      <TopBarButton>Дата и время</TopBarButton>
    </div>
  );
};

export default TopBar;
