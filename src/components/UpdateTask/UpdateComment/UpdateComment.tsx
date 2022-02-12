import { FC } from 'react';

import style from './UpdateComment.module.scss';

import { TaskData } from 'api';
import { commentDate } from 'consts';
import { removeRepeatWordsTags } from 'consts/base';

type UpdateCommentProps = {
  task: TaskData;
};

export const UpdateComment: FC<UpdateCommentProps> = ({ task }) => (
  <div>
    {task.lifetimeItems.map(LfItem => (
      <div key={LfItem.id} className={style.containerComment}>
        {LfItem.comment && (
          <>
            <div className={style.commentBox}>
              <div className={style.avatar} />
              <div>
                <div className={style.name}>{task.initiatorName}</div>
                <span className={style.date}>{commentDate(LfItem)} прокомментировал</span>
              </div>
            </div>
            <div className={style.comment}>
              <span className={style.commentContent}>
                {removeRepeatWordsTags(LfItem.comment)}
              </span>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
);
