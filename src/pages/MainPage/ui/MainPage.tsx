import { useEffect } from 'react';

import { Button } from '@/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Dialog/Dialog';
import { DialogClose } from '@radix-ui/react-dialog';

const DialogUI = ({ children }: any) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Delete</Button>
          </DialogClose>
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MainPage = () => {
  const getReminders = async () => {
    const credentials = {
      username: 'dfdf',
      password: 'sanjar',
    };

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('response', await response.json());
  };

  useEffect(() => {
    getReminders();
  }, []);
  return (
    <div>
      <h2>Main page</h2>

      <DialogUI>
        <Button>Open modal</Button>
      </DialogUI>
    </div>
  );
};

export default MainPage;
