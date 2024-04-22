import classNames from 'classnames';

import { FC, HTMLAttributes, ReactNode } from 'react';

import cls from './Card.module.scss';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}
const Card: FC<TProps> = (props) => {
  const { className, children, ...otherProps } = props;
  return (
    <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
};

export default Card;
