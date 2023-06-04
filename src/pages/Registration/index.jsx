import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { AlertDialog } from '../../components';

export const Registration = () => {
  const [dialogStatus, setDialogStatus] = React.useState(false);
  const [dialogText, setDialogText] = React.useState('');
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      fullName: "",
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      setDialogStatus(true)
      setDialogText('Під час реєстрація виникла помилка!')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      setDialogStatus(true)
      setDialogText('Реєстрація пройшла успішно!')
      setTimeout(() => {
        window.location.href = '';
      }, 3333);
    }
  };

  return (
    <>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Створити аккаунт
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="Повне имя"
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            type="text"
            {...register('fullName', { required: "Вкажіть ім'я" })}
            fullWidth />
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type="email"
            {...register('email', { required: 'Вкажіть електронний адрес' })}
            fullWidth />
          <TextField
            className={styles.field}
            label="Пароль"
            error={Boolean(errors.password?.message)}
            inputProps={{ minLength: 5 }}
            helperText={errors.password?.message}
            type="password"
            {...register('password', { required: 'Вкажіть пароль' })}
            fullWidth />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Зареєструватися
          </Button>
        </form>
      </Paper>
      <AlertDialog status={dialogStatus} onCloseWindow={() => setDialogStatus(false)} text={dialogText} />
    </>
  );
};
