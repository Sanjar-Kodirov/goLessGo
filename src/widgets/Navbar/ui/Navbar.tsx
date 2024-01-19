import { Avatar, AvatarFallback, AvatarImage } from "@/widgets/Avatar";
import classes from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarNav}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <ul className={classes.navLins}>
          <li>Home</li>
          <li>About</li>
          <li>Contacts</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
