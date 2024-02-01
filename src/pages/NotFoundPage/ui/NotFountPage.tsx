import { Link } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig/routes';
import { Button } from '@/shared/ui/Button';

import classes from './NotFountPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={classes.notFountPage}>
      <img src={'https://i.ibb.co/BsKffJk/not-Fount-Image.png'} />
      <Button>
        <Link to={RoutePath.main}>Go to main page</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
