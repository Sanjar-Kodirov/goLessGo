import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as z from 'zod';

import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';
import { Button } from '@/shared/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/Form/Form';
import { Input } from '@/shared/ui/Form/Input';
import Text from '@/shared/ui/Text/Text';
import { zodResolver } from '@hookform/resolvers/zod';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginReducer } from '../../model/slice/loginSlice';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Имя пользователя должно содержать как минимум 2 символа.',
  }),
  password: z
    .string()
    .min(2, { message: 'Пароль должен содержать как минимум 2 символа.' }),
});

type TPropsType = {
  isOpen: boolean;
  onSuccess: any;
};

const LoginForm: FC<TPropsType> = memo((props) => {
  const { onSuccess } = props;
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const dispatch = useAppDispatch();

  useDynamicModuleLoader('loginForm', loginReducer, true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const result = await dispatch(
        loginByUsername({
          password: values.password,
          username: values.username,
        }),
      );

      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
      }
    },
    [dispatch, onSuccess],
  );

  return (
    <Form {...form}>
      {error && <Text.Error>{'Произошла ошибка'}</Text.Error>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="Введите имя пользователя" {...field} />
              </FormControl>
              <FormDescription>
                Это ваше отображаемое публичное имя.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Введите парол" {...field} />
              </FormControl>
              <FormDescription>
                Это ваше отображаемое публичное имя.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
});
export default LoginForm;
