import { FC } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/Dialog/Dialog';

import { LoginForm } from '../loginForm/LoginForm';

type TPropsType = {
  isOpen: boolean;
  onClose: any;
};

export const LoginModal: FC<TPropsType> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Вход</DialogTitle>
          <DialogDescription>
            <LoginForm isOpen={isOpen} onClose={onClose} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
