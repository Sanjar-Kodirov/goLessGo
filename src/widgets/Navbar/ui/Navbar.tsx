import { useDispatch, useSelector } from 'react-redux';

import { memo, useCallback, useState } from 'react';

import { ModeToggle } from '@/app/providers/ThemeProvider/ModeToddle';
import { getProfileData } from '@/entities/Profile/model/selectors/getProfileData/getProfileData';
import { userActions } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUserName';
import { AvatarUI } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';

import classes from './Navbar.module.scss';
import { profileActions } from '@/entities/Profile';

const Navbar = memo(() => {
  const dispatch = useDispatch();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const profileData = useSelector(getProfileData);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(profileActions.logout());
  }, [dispatch]);

  console.log('profiledata', profileData);

  if (profileData) {
    return (
      <div className={classes.navbar}>
        <div className={classes.navbarNav}>
          <AvatarUI
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
        <AvatarUI
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
