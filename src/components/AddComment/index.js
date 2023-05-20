import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";

export const AddComment = ({id}) => {
  const [comments, setComments] = React.useState('');

  const onSubmit = async () => {
    try {
      const fields = { comments }

      await axios.post(`/posts/comments/${id}`, fields);
      alert('Коментар добавлено! Сторінку зараз обновиться')
      window.location.reload()

    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
        />
        <div className={styles.form}>
          <TextField
            label="Написати комментарій"
            variant="outlined"
            maxRows={10}
            multiline
            onChange={(event) => setComments(event.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={onSubmit}>Відправити</Button>
        </div>
      </div>
    </>
  );
};