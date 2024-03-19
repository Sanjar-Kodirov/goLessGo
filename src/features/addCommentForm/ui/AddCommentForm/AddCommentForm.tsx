import classNames from 'classnames';

import { memo, useCallback, useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Form/Input';

import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;

  const [text, setText] = useState<string>('');

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    // setText('');
  }, [onSendComment, text]);

  const onCommentTextChange = useCallback((value: string) => {
    setText(value);
  }, []);

  return (
    <div className={classNames(cls.AddCommentForm, {}, [className])}>
      <Input
        className={cls.input}
        onChange={(event) => onCommentTextChange(event.target.value)}
        value={text}
        placeholder="Введите текст комментария"
      />
      <Button className={cls.button} onClick={onSendHandler}>
        Отправить
      </Button>
    </div>
  );
});

export default AddCommentForm;
