import { Link } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig/routes';
import { Button } from '@/widgets/Button';

import classes from './NotFountPage.module.scss';

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
