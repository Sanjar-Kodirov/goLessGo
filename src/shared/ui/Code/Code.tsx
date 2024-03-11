import classNames from 'classnames';

import { memo, useCallback } from 'react';

import { CopyIcon } from '@radix-ui/react-icons';

import { Button } from '../Button';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-gray-900 text-white p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Code:</span>
            <Button
              onClick={onCopy}
              className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
              data-clipboard-target="#code"
            >
              <CopyIcon />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <pre id="code" className="text-gray-300">
              <code>
                <code>{text}</code>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </pre>
  );
});
