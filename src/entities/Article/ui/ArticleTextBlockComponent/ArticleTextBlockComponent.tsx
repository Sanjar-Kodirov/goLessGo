import classNames from 'classnames';

import { memo } from 'react';

import Text, { TextType } from '@/shared/ui/Text/Text';

import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        <Text type={TextType.H3} text="Articke text block" />
        {block.title && <Text title={block.title} className={cls.title} />}
        {block.paragraphs.map((paragraph, index) => (
          <Text key={paragraph} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    );
  },
);
