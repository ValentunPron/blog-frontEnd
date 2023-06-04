import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { fetchPost, fetchTags } from '../redux/slices/posts';
import { useParams } from 'react-router-dom';
import { fetchLike } from '../redux/slices/like';
import { AlertDialog } from '../components';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags, like, authMe } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      tags: state.posts.tags,
      like: state.like,
      authMe: state.auth,
    }
  });

  const { tag } = useParams();
  const userData = useSelector(state => state.auth.data);
  const [filter, setFilter] = React.useState('new');
  const [filterBase, setFilterBase] = React.useState([]);
  const [dialogStatus, setDialogStatus] = React.useState(false);

  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.stasus === 'loading';

  React.useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchTags());
  }, []);

  React.useEffect(() => {
    dispatch(fetchPost());
  }, [like])

  const toggleLike = (id) => {
    authMe.data ? dispatch(fetchLike(id)) : setDialogStatus(true);
  }

  React.useEffect(() => {
    if (tag) {
      const array = []
      posts.items.map((item) => item.tags.includes(tag) ? array.push(item) : '');
      if (array.length > 0) {
        setFilterBase(array);
      }
    } else {
      setFilterBase(posts.items.slice().sort((a, b) => b.createdAt - a.createdAt).reverse());
    }
  }, [posts.items, tag])

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  React.useEffect(() => {
    if (filter === 'popular') {
      if (tag) {
        setFilterBase(filterBase.slice().sort((a, b) => b.viewsCount - a.viewsCount));
      } else {
        setFilterBase(posts.items.slice().sort((a, b) => b.viewsCount - a.viewsCount));
      }
    }
    if (filter === 'new') {
      if (tag) {
        setFilterBase(filterBase.slice().sort((a, b) => b.createdAt - a.createdAt).reverse());
      } else {
        setFilterBase(posts.items.slice().sort((a, b) => b.createdAt - a.createdAt).reverse());
      }
    }
  }, [filter])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={filter === 'new' ? 0 : 1} aria-label="basic tabs example">
        <Tab label="Нові" onClick={() => setFilter('new')} />
        <Tab label="Популярне" onClick={() => setFilter('popular')} />
      </Tabs>
      <div className='home-body'>
        <div className='home-body__posts'>
          {filterBase
            ? (isPostLoading ? [...Array(5)] : filterBase).map((obj, index) =>
              isPostLoading ?
                (<Post key={index} isLoading={true} />)
                : (
                  <Post
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl}
                    user={obj.user}
                    createdAt={formatDate(obj.createdAt)}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.comments.length}
                    likes={obj.likes}
                    userMe={authMe.data}
                    tags={obj.tags}
                    onToggleLike={toggleLike}
                    isEditable={userData?._id === obj.user._id}
                  />
                ))
            : ''
          }
        </div>
        <div className='home-body__tags'>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </div>
      </div>
      <AlertDialog status={dialogStatus} onCloseWindow={() => setDialogStatus(false)} text={'Будь ласка, увійдіть до свого облікового запису'} />
    </>
  );
};
