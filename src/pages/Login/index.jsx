import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { AlertDialog } from "../../components";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const [dialogStatus, setDialogStatus] = React.useState(false);
  const [dialogText, setDialogText] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('Помилка');
  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));


    if (!data.payload) {
      setDialogStatus(true)
      setDialogText('Під час входу виникла помилка!')
    }

    if ('token' in data.payload) {
      setDialogStatus(true)
      setDialogTitle('Вітаємо на сайті!');
      setDialogText('Ви успішно зайшли в обліковий запис!')
      window.localStorage.setItem('token', data.payload.token);
      setTimeout(() => {
        window.location.href = '';
      }, 3333);
    }
  };

  if (isAuth) {
    setTimeout(() => {
      return <Navigate to="/" />
    }, 2222)
  }

  return (
    <>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вхід в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} >
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type="email"
            {...register('email', { required: 'Вкажіть почту' })}
            fullWidth
          />
          <TextField
            className={styles.field}
            label="Пароль"
            error={Boolean(errors.email?.message)}
            helperText={errors.password?.message}
            type="password"
            {...register('password', { required: 'Вкажіть пароль' })}
            fullWidth
          />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Війти
          </Button>
        </form>
      </Paper>
      <AlertDialog title={dialogTitle} status={dialogStatus} onCloseWindow={() => setDialogStatus(false)} text={dialogText} />
    </>
  );
};
