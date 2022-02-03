import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './UpdateTask.module.scss';

import { TaskData } from 'api/taskDataAPI';
import { Button } from 'components/common/Button/Button';
import { HeaderTask } from 'components/common/HeaderTask/HeaderTask';
import { selectItem, selectStatuses } from 'selectors/selectors';
import { getTask, updateStatusData, updateTaskData } from 'store/applicationListReducer';

type PropsType = {
  setToggle: () => void;
};

export const UpdateTask: FC<PropsType> = ({ setToggle }) => {
  const dispatch = useDispatch();
  const item = useSelector(selectItem);
  const statuses = useSelector(selectStatuses);

  console.log(item);

  const date = new Date(item.resolutionDatePlan).toDateString();
  const statusName = statuses.map(m => m.name);

  const [select, setSelect] = useState<string>(statusName[0]);
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(getTask(item));
  }, [dispatch]);

  const onChangeSelectHandle = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelect(event.currentTarget.value);
    const { id } = statuses.filter(
      status => status.name === event.currentTarget.value,
    )[0];
    dispatch(updateStatusData({ ...item, statusId: id }));
  };

  const onChangeTextHandle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.currentTarget.value);
  };

  const onClickButtonHandle = (): void => {
    dispatch(updateTaskData({ ...item, comment: value }));
  };

  return (
    <div className={style.container}>
      <HeaderTask
        id={item.id}
        name={item.name}
        onClickHandle={() => dispatch(getTask({} as TaskData))}
      />
      <div className={style.content}>
        <div className={style.leftContent}>
          <span>Описание</span>
          <p>{item.description}</p>
          <span>Добавление коментариев</span>
          <textarea value={value} onChange={onChangeTextHandle} />
          <Button title="Сохранить" onClickHandle={onClickButtonHandle} />
          {item.lifetimeItems &&
            item.lifetimeItems.map(LfItem => (
              <div key={LfItem.id} className={style.containerComment}>
                {LfItem.comment && (
                  <>
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
                  </>
                )}
              </div>
            ))}
        </div>
        <div className={style.rightContent}>
          <div className={style.statusBox}>
            <div style={{ backgroundColor: item.statusRgb }} className={style.circle} />
            <span>{item.statusName}</span>
            <select value={select} onChange={onChangeSelectHandle}>
              {statuses.map(status => (
                <option key={status.id}>{status.name}</option>
              ))}
            </select>
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
