import { ModeToggle } from '@/app/providers/ThemeProvider/ModeToddle';
import { Button } from '@/shared/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/widgets/Avatar';

import classes from './Navbar.module.scss';
import { LoginModal } from '@/features/AuthByUserName';

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes.navbarNav}>
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="shadcn.png"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                    <LoginModal>
                        <Button>Войти</Button>
                    </LoginModal>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
