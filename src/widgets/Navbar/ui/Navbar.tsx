import { Button } from '@/shared/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/widgets/Avatar';

import classes from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarNav}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
