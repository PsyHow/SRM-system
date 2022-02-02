import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './UpdateTask.module.scss';

import { TaskData } from 'api/taskDataAPI';
import { getTaskById, updateTaskData } from 'store/applicationListReducer';
import { AppRootState } from 'store/store';

type PropsType = {
  setToggle: (value: boolean) => void;
};

export const UpdateTask: FC<PropsType> = ({ setToggle }) => {
  const dispatch = useDispatch();
  const item = useSelector<AppRootState, TaskData>(
    state => state.applicationListReducer.item,
  );
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(getTaskById(item.id));
  }, [dispatch, item.id]);

  const date = new Date(item.resolutionDatePlan).toDateString();

  const onChangeTextHandle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.currentTarget.value);
  };

  const onClickButtonHandle = (): void => {
    dispatch(updateTaskData(item, value));
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>№ {item.id}</span>
        <span className={style.itemName}>{item.name}</span>
        <button
          type="button"
          className={style.closeButton}
          onClick={() => setToggle(false)}
        >
          X
        </button>
      </div>
      <div className={style.content}>
        <div className={style.leftContent}>
          <span>Описание</span>
          <p>{item.description}</p>
          <span>Добавление коментариев</span>
          <textarea
            value={value}
            onChange={onChangeTextHandle}
          />
          <button type="button" onClick={onClickButtonHandle}>
            Сохранить
          </button>
          {item.lifetimeItems &&
            item.lifetimeItems.map(LfItem => (
              <div key={LfItem.id} className={style.containerComment}>
                <div className={style.commentBox}>
                  <div className={style.avatar} />
                  <div>
                    <div className={style.name}>{item.initiatorName}</div>
                    <span className={style.date}>
                      {new Date(LfItem.createdAt).toLocaleString('ru', {
                        day: 'numeric',
                        month: 'long',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}{' '}
                      прокомментировал
                    </span>
                  </div>
                </div>
                <div>
                  <p className={style.comment}>{LfItem.comment}</p>
                </div>
              </div>
            ))}
        </div>
        <div className={style.rightContent}>
          <div className={style.statusBox}>
            <div style={{ backgroundColor: item.statusRgb }} className={style.circle} />
            <span>{item.statusName}</span>
          </div>
          <span>Заявитель</span>
          <span>{item.initiatorName}</span>
          <span>Исполнитель</span>
          <span>{item.executorName}</span>
          <span>Приоритет</span>
          <span>{item.priorityName}</span>
          <span>Срок</span>
          <span>{date}</span>
          <span>Теги</span>
          {item.tags.map(tag => (
            <div className={style.tags} key={tag.id}>
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
