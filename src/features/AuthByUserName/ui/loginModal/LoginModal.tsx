import { Loader } from 'lucide-react';

import { FC, Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/Dialog/Dialog';

import { LoginFormAsync } from '../loginForm/LoginForm.async';

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
            <Suspense fallback={<Loader />}>
              <LoginFormAsync isOpen={isOpen} onClose={onClose} />
            </Suspense>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
