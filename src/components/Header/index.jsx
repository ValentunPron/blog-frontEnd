import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Ви точно хочете вийти з аккаунту?')) {
      dispatch(logout())
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">

        <div className={styles.inner}>
          <div className={styles.inner__links}>
            <Link className={styles.logo} to="/">
              <div>KEP BLOG</div>
            </Link>
            <a href='https://kep.nung.edu.ua/' className={styles.logoLink}>
              <img src="https://kep.nung.edu.ua/static/img/fullLogo.svg" alt="Kep" width={80} />
            </a>
          </div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-posts">
                  <Button variant="contained">Написати статю</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Увійти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Створити аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
