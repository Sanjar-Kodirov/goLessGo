import { Link } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig/routes';

import classes from './NotFountPage.module.scss';
import { Button } from '@/shared/ui/Button';

const NotFoundPage = () => {
  return (
    <div className={classes.notFountPage}>
      <img src={'./notFountImage.png'} />
      <Button>
        <Link to={RoutePath.main}>Go to main page</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
