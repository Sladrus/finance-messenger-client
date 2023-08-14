import React from 'react';
import './TopBar.css';

import FilterMultiSelect from '../FilterMultiSelect';
import FilterSingleSelect from '../FilterSingleSelect';
import { DateRange, DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // Add this line to import the required styles for DateRange
import 'react-date-range/dist/theme/default.css'; // Add this line to import the default theme for DateRange
import { range } from 'mathjs';

const TopBar = ({
  filter,
  setFilter,
  user,
  stages,
  managers,
  setSelectedConversation,
  dateRange,
  setDateRange,
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

  const handleSelectChangeTask = (data) => {
    // console.log(data);
    setFilter((prev) => ({ ...prev, task: data.value }));
    setSelectedConversation(0);
  };

  const managersOptions = [
    { value: '', label: 'Все менеджеры' },
    { value: null, label: 'Нет менеджера' },
    ...managers.map((manager) => ({
      value: manager._id,
      label: manager.username,
    })),
  ];

  const [showDateRange, setShowDateRange] = useState(false);

  const handleToggleDateRange = () => {
    setShowDateRange(!showDateRange);
  };

  const handleSelectRange = (ranges) => {
    setDateRange([ranges.selection]);
    setSelectedConversation(0);
  };

  const staticRanges = [
    {
      label: 'За все время',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(new Date().getFullYear() - 20),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          23,
          59,
          59
        ),
      }),
      isSelected() {
        const startDate = new Date(new Date().getFullYear() - 20);
        const endDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          23,
          59,
          59
        );

        const startDateString = dateRange[0].startDate
          .toISOString()
          .substring(0, 10);
        const endDateString = dateRange[0].endDate
          .toISOString()
          .substring(0, 10);

        const thisStartDate = startDate.toISOString().substring(0, 10);
        const thisEndDate = endDate.toISOString().substring(0, 10);
        return (
          startDateString === thisStartDate && endDateString === thisEndDate
        );
      },
    },
    {
      label: 'Вчера',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1,
          0,
          0,
          0
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1,
          23,
          59,
          59
        ),
      }),
      isSelected() {
        const startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1,
          0,
          0,
          0
        );
        const endDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1,
          23,
          59,
          59
        );

        const startDateString = dateRange[0].startDate
          .toISOString()
          .substring(0, 10);
        const endDateString = dateRange[0].endDate
          .toISOString()
          .substring(0, 10);

        const thisStartDate = startDate.toISOString().substring(0, 10);
        const thisEndDate = endDate.toISOString().substring(0, 10);
        return (
          startDateString === thisStartDate && endDateString === thisEndDate
        );
      },
    },
    {
      label: 'Сегодня',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(new Date().setHours(0, 0, 0)), // 00:00 текущего дня
        endDate: new Date(new Date().setHours(23, 59, 59)), // 23:59 текущего дня
      }),
      isSelected() {
        const startDate = new Date(new Date().setHours(0, 0, 0));
        const endDate = new Date(new Date().setHours(23, 59, 59));

        const startDateString = dateRange[0].startDate
          .toISOString()
          .substring(0, 10);
        const endDateString = dateRange[0].endDate
          .toISOString()
          .substring(0, 10);

        const thisStartDate = startDate.toISOString().substring(0, 10);
        const thisEndDate = endDate.toISOString().substring(0, 10);

        return (
          startDateString === thisStartDate && endDateString === thisEndDate
        );
      },
    },
    {
      label: 'Прошлая неделя',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - new Date().getDay() - 7
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - new Date().getDay() - 1
        ),
      }),
      isSelected() {
        const startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - new Date().getDay() - 7
        );
        const endDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - new Date().getDay() - 1
        );

        const startDateString = dateRange[0].startDate
          .toISOString()
          .substring(0, 10);
        const endDateString = dateRange[0].endDate
          .toISOString()
          .substring(0, 10);

        const thisStartDate = startDate.toISOString().substring(0, 10);
        const thisEndDate = endDate.toISOString().substring(0, 10);

        return (
          startDateString === thisStartDate && endDateString === thisEndDate
        );
      },
    },
    {
      label: 'Текущая неделя',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - new Date().getDay()
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + (6 - new Date().getDay())
        ),
      }),
      isSelected() {
        const startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - new Date().getDay()
        );
        const endDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + (6 - new Date().getDay())
        );

        const startDateString = dateRange[0].startDate
          .toISOString()
          .substring(0, 10);
        const endDateString = dateRange[0].endDate
          .toISOString()
          .substring(0, 10);

        const thisStartDate = startDate.toISOString().substring(0, 10);
        const thisEndDate = endDate.toISOString().substring(0, 10);

        return (
          startDateString === thisStartDate && endDateString === thisEndDate
        );
      },
    },
    {
      label: 'Прошлый месяц',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          1
        ),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      }),
      isSelected() {
        const startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          1
        );
        const endDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          0
        );

        const startDateString = dateRange[0].startDate
          .toISOString()
          .substring(0, 10);
        const endDateString = dateRange[0].endDate
          .toISOString()
          .substring(0, 10);

        const thisStartDate = startDate.toISOString().substring(0, 10);
        const thisEndDate = endDate.toISOString().substring(0, 10);

        return (
          startDateString === thisStartDate && endDateString === thisEndDate
        );
      },
    },
    {
      label: 'Текущий месяц',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth()),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1),
      }),
      isSelected() {
        const startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth()
        );
        const endDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1
        );

        const startDateString = dateRange[0].startDate
          .toISOString()
          .substring(0, 10);
        const endDateString = dateRange[0].endDate
          .toISOString()
          .substring(0, 10);

        const thisStartDate = startDate.toISOString().substring(0, 10);
        const thisEndDate = endDate.toISOString().substring(0, 10);

        return (
          startDateString === thisStartDate && endDateString === thisEndDate
        );
      },
    },
  ];

  const renderStaticRanges = (ranges) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{ color: !ranges.isSelected() && 'black' }}
          className="rdrStaticRangeButton"
        >
          {ranges.label}
        </span>
      </div>
    );
  };

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
        options={[]}
      />
      <FilterSingleSelect
        onChange={handleSelectChangeTask}
        label={'Задачи'}
        options={[
          { value: '', label: 'Все задачи', color: 'white' },
          { value: null, label: 'Без задачи', color: 'black' },
          { value: 'tomorrow', label: 'Завтра', color: '#FFC784' },
          { value: 'today', label: 'Сегодня', color: '#7AB476' },
          { value: 'late', label: 'Просроченная', color: '#FF1700' },
          { value: 'done', label: 'Выполненная', color: 'grey' },
        ]}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: 'rgb(153, 153, 153)',
            padding: '0 10px',
          }}
        >
          Дата и время
        </span>
        {dateRange?.map((date, index) => {
          const formattedStartDate = date.startDate.toLocaleDateString(
            'ru-RU',
            {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            }
          );
          const formattedEndDate = date.endDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          });

          return (
            <span
              key={index}
              onClick={handleToggleDateRange}
              style={{
                fontSize: '14px',
                color: 'white',
                padding: '10px 10px 10px 10px',
                cursor: 'pointer',
              }}
            >
              {formattedStartDate} - {formattedEndDate}
            </span>
          );
        })}
      </div>

      {showDateRange && (
        <div className="date-range-container">
          <div className="date-range-wrapper">
            <DateRangePicker
              ranges={dateRange}
              onChange={handleSelectRange}
              renderStaticRangeLabel={(ranges) => renderStaticRanges(ranges)}
              editableDateInputs={true}
              staticRanges={staticRanges}
            />
          </div>
        </div>
      )}
      {/* <FilterMultiSelect /> */}
    </div>
  );
};

export default TopBar;
