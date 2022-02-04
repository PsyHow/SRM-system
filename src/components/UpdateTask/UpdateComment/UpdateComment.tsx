import { FC } from 'react';

import style from './UpdateComment.module.scss';

import { TaskData } from 'api/tasksData/types';
import { commentDate } from 'constants/base';

type UpdateCommentProps = {
  task: TaskData;
};

export const UpdateComment: FC<UpdateCommentProps> = ({ task }) => (
  <div className={style.container}>
    {task.lifetimeItems &&
      task.lifetimeItems.map(LfItem => (
        <div key={LfItem.id} className={style.containerComment}>
          {LfItem.comment && (
            <>
              <div className={style.commentBox}>
                <div className={style.avatar} />
                <div>
                  <div className={style.name}>{task.initiatorName}</div>
                  <span className={style.date}>
                    {commentDate(LfItem)} прокомментировал
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
);
