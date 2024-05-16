import classNames from 'classnames';

import { MutableRefObject, ReactNode, useRef } from 'react';

import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll';

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

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  const onScroll = (e: any) => {
    console.log('working scrool', e);
  };

  return (
    <section
      ref={wrapperRef}
      onScroll={onScroll}
      className={classNames(cls.Content, className)}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
};

ContentUI.Header = Header;

export { ContentUI };
