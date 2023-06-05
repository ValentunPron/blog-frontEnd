import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removePost } from '../../redux/slices/posts';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  likes,
  tags,
  children,
  isFullPost,
  isLoading,
  userMe,
  onToggleLike,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Ви точно хочете видалити статю?')) {
      dispatch(removePost(id));
    }
  };

  const checkLike = userMe ? likes.includes(userMe._id) : false;

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <Link to={`/posts/${id}`}>
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={
              imageUrl === 'https://kept.com.ua/core/cache/plugins/imageviewer/93360/cdf91db35b1ea3f773d6957daa5829ff4630c1e368cb0b905046065c427391db/1100x1100_cropped.jpg'
                ? imageUrl
                : `${process.env.REACT_APP_API_URL}${imageUrl}`
            }
            alt={title}
          />
        </Link>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {
            tags.length > 0 && tags[0] !== ""
              ? <ul className={styles.tags}>
                {tags ? tags.map((name) => (
                  <li key={name}>
                    <Link to={`/tags/${name}`}>#{name}</Link>
                  </li>
                )) : ''}
              </ul>
              : ''
          }
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li className={`${styles.likes} ${checkLike ? styles.active : ''}`}>
              <button onClick={() => onToggleLike(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 78.995 70.28">
                  <path id="heart" d="M72.729,6.878A21.242,21.242,0,0,0,56.929,0,19.873,19.873,0,0,0,44.516,4.284,25.394,25.394,0,0,0,39.5,9.524a25.38,25.38,0,0,0-5.019-5.24A19.87,19.87,0,0,0,22.068,0a21.243,21.243,0,0,0-15.8,6.878A24.692,24.692,0,0,0,0,23.74c0,6.681,2.49,12.8,7.835,19.246,4.782,5.769,11.654,11.626,19.613,18.408,2.718,2.316,5.8,4.941,9,7.738a4.638,4.638,0,0,0,6.106,0c3.2-2.8,6.281-5.424,9-7.741,7.957-6.781,14.83-12.637,19.611-18.407C76.507,36.537,79,30.421,79,23.74A24.689,24.689,0,0,0,72.729,6.878Zm0,0" transform="translate(0)" />
                </svg>
              </button>
              {
                likes ?
                  <span>{likes.length}</span>
                  : ''
              }
            </li>
            <li>
              <div>
                <CommentIcon />
                <span>{commentsCount}</span>
              </div>
              <div>
                <EyeIcon />
                <span>{viewsCount}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
};
