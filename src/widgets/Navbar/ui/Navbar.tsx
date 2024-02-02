import { useDispatch, useSelector } from 'react-redux';

import { memo, useCallback, useState } from 'react';

import { ModeToggle } from '@/app/providers/ThemeProvider/ModeToddle';
import { getUserAuthData, userActions } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUserName';
import { Button } from '@/shared/ui/Button';
import { UserAvatar } from '@/widgets/Avatar';

import classes from './Navbar.module.scss';

const Navbar = memo(() => {
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
          <UserAvatar
            name="CN"
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg"
          />
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
        <UserAvatar
          name="CN"
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
        />
        <div className="flex gap-2">
          <Button onClick={onShowModal}>Войти</Button>
          <LoginModal isOpen={isAuthModal} closeModal={setIsAuthModal} />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
});

export default Navbar;
