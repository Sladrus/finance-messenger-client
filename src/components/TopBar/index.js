import React from 'react';
import './TopBar.css';
import TopBarButton from '../TopBarButton';
import { useEffect } from 'react';
import Select from 'react-select';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterSelect from '../FilterMultiSelect';
import FilterMultiSelect from '../FilterMultiSelect';
import FilterSingleSelect from '../FilterSingleSelect';

// const readTypes = [
//   { value: '', label: 'Все' },
//   { value: 'kate', label: 'Катя | Moneyport' },
//   { value: 'ul', label: 'Ульяна | Moneyport' },
//   { value: 'misha', label: 'Миша | Moneyport' },
// ];

const TopBar = ({
  filter,
  setFilter,
  user,
  stages,
  managers,
  setSelectedConversation,
}) => {
  const handleSelectChangeUser = (data) => {
    setFilter((prev) => ({ ...prev, user: data.value }));
    setSelectedConversation(0);
  };

  const handleSelectChangeStatus = (data) => {
    setFilter((prev) => ({ ...prev, stage: data.value }));
    setSelectedConversation(0);
  };

  const handleSelectChangeUnread = (data) => {
    setFilter((prev) => ({ ...prev, unread: data.value }));
    setSelectedConversation(0);
  };

  const handleSelectChangeTags = (data) => {
    // console.log(data);
    setFilter((prev) => ({ ...prev, tags: data }));
    setSelectedConversation(0);
  };

  const managersOptions = [
    { value: '', label: 'Все менеджеры' },
    ...managers.map((manager) => ({
      value: manager._id,
      label: manager.username,
    })),
  ];

  return (
    <div className="top-bar">
      <FilterSingleSelect
        onChange={handleSelectChangeUnread}
        label={'Прочитанные/Непрочитанные'}
        options={[
          { value: '', label: 'Все', color: 'white' },
          { value: false, label: 'Прочитанные', color: 'white' },
          { value: true, label: 'Непрочитанные', color: 'white' },
        ]}
      />
      <FilterSingleSelect
        onChange={handleSelectChangeUser}
        label={'Менеджер'}
        options={managersOptions}
      />
      <FilterSingleSelect
        onChange={handleSelectChangeStatus}
        label={'Статус чата'}
        options={[
          { value: '', label: 'Все статусы', color: 'white' },
          ...stages,
        ]}
      />
      <FilterMultiSelect
        onChange={handleSelectChangeTags}
        label={'Тэги'}
        placeholder={'Выберите теги из списка...'}
        options={[
          { value: 'kasklfnklas', label: 'Наличка Европа' },
          { value: 'asdfasfasf', label: 'Наличка РФ' },
          { value: 'asdfasfasf1', label: 'Наличка РФ2' },
          { value: 'asdfasfasf2', label: 'Наличка РФ3' },
          { value: 'asdfasfasf3', label: 'Наличка РФ4' },
          { value: 'asdfasfas123f', label: 'Наличка РФ' },
          { value: 'asdfasf4123asf1', label: 'Наличка РФ2' },
          { value: 'asdfasfa21sf2', label: 'Наличка РФ3' },
          { value: 'asdfasf123asf3', label: 'Наличка РФ4' },
        ]}
      />
      <FilterSingleSelect
        // onChange={handleSelectChangeStatus}
        label={'Задачи'}
        options={[
          { value: '', label: 'Все задачи', color: 'white' },
          { value: 'tomorrow', label: 'Завтра', color: 'orange' },
          { value: 'today', label: 'Сегодня', color: 'green' },
          { value: 'late', label: 'Просроченная', color: 'red' },
          { value: 'done', label: 'Выполненная', color: 'grey' },
        ]}
      />
      {/* <FilterMultiSelect /> */}
    </div>
  );
};

export default TopBar;
