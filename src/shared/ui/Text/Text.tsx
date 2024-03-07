import classNames from 'classnames';

import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  P = 'p',
  LEAD = 'lead',
  SMALL = 'small',
  MUTED = 'muted',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  type?: TextType;
}

export const Text = (props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    type = TextType.P,
  } = props;

  const mods = {
    [classes[theme]]: true,
    [classes[align]]: true,
    [classes[type]]: true,
  };

  return (
    <div className={classNames(classes.Text, mods, [className])}>
      {title && <p className={classes.title}>{title}</p>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
};

export default Text;
