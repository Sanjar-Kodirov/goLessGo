import classNames from 'classnames';
import { useSelector } from 'react-redux';

import {
  MutableRefObject,
  ReactNode,
  UIEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import { getSaveScrollByPath, saveScrollActions } from '@/features/SaveScrool';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';

import cls from './ContentUI.module.scss';

type HtmlElementPropsType = {
  className?: string;
  children?: ReactNode;
};

type HeaderPropsType = {
  className?: string;
  children?: ReactNode;
};

export const Header: React.FC<HeaderPropsType> = (props) => {
  return <h1>Header</h1>;
};

type ContentPropsType = HtmlElementPropsType & {
  children?: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
};

type ContentUIType = React.FC<ContentPropsType> & {
  Header: typeof Header;
};
const ContentUI: ContentUIType = (props) => {
  const { className = '', onScrollEnd, children } = props;

  const { pathname } = useLocation();

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const dispatch = useAppDispatch();

  const scrollPosition = useSelector((state: StateSchema) => {
    return getSaveScrollByPath(state, pathname);
  });

  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, [scrollPosition]);

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      saveScrollActions.setScrollPosition({
        path: pathname,
        position: e.currentTarget.scrollTop,
      }),
    );
  }, 500);

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.Content, className)}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
    </section>
  );
};

ContentUI.Header = Header;

export { ContentUI };
