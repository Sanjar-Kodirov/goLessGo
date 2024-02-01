import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useState } from 'react';

import { ModeToggle } from '@/app/providers/ThemeProvider/ModeToddle';
import { getUserAuthData, userActions } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUserName';
import { Button } from '@/shared/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/widgets/Avatar';

import classes from './Navbar.module.scss';

const Navbar = () => {
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <div className={classes.navbar}>
        <div className={classes.navbarNav}>
          <Avatar>
            <AvatarImage
              src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg"
              alt="shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <Button onClick={onLogout}>Выйти</Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarNav}>
        <Avatar>
          <AvatarImage
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
            alt="shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Button onClick={onShowModal}>Войти</Button>
          <LoginModal isOpen={isAuthModal} onClose={setIsAuthModal} />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
