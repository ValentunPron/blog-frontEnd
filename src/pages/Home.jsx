import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPost, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const [filter, setFilter] = React.useState('new');
  const [filterBase, setFilterBase] = React.useState([]);

  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.stasus === 'loading';

  React.useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchTags());

  }, []);

  React.useEffect(() => {
    setFilterBase(posts.items.slice().sort((a, b) => b.createdAt - a.createdAt).reverse());
  }, [posts.items])

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
      setFilterBase(posts.items.slice().sort((a, b) => b.viewsCount - a.viewsCount));
    }
    if (filter === 'new') {
      setFilterBase(posts.items.slice().sort((a, b) => b.createdAt - a.createdAt).reverse());
    }
  }, [filter])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={filter === 'new' ? 0 : 1} aria-label="basic tabs example">
        <Tab label="Нові" onClick={() => setFilter('new')} />
        <Tab label="Популярне" onClick={() => setFilter('popular')} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
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
                    commentsCount={3}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                ))
            : ''
          }
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Андрій Петрович',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Хз, що писати',
              },
              {
                user: {
                  fullName: 'Аніман Страган',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
