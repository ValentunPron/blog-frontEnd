import React from "react";
import { useParams } from "react-router-dom";


import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.warn(error);
        alert('Помилка при полученні статі')
      })
  }, [])

  console.log(data);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        //https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
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
      >
        <Index />
      </CommentsBlock>
    </>
  );
};