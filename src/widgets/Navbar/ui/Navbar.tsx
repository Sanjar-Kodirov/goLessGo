import { useDispatch, useSelector } from 'react-redux';

import { memo, useCallback, useState } from 'react';

import { ModeToggle } from '@/app/providers/ThemeProvider/ModeToddle';
import { profileActions } from '@/entities/Profile';
import { getProfileData } from '@/entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '@/entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { LoginModal } from '@/features/AuthByUserName';
import { AvatarUI } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';

import classes from './Navbar.module.scss';

const Navbar = memo(() => {
  const dispatch = useDispatch();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const profileData = useSelector(getProfileData);
  const isProfileLoading = useSelector(getProfileIsLoading);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(profileActions.logout());
  }, [dispatch]);

  const onButtonClick = () => {
    if (profileData?.user) {
      onLogout();
    } else {
      onShowModal();
    }
  };

  console.log('profileData?.user,', profileData);

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarNav}>
        <AvatarUI
          name="CN"
          src={
            profileData?.user.avatar
              ? profileData?.user.avatar
              : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
          }
        />
        <div className="flex gap-2">
          <Button loading={isProfileLoading} onClick={onButtonClick}>
            {profileData?.user ? 'Выйти' : 'Войти'}
          </Button>

          <LoginModal isOpen={isAuthModal} closeModal={setIsAuthModal} />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
});

export default Navbar;
