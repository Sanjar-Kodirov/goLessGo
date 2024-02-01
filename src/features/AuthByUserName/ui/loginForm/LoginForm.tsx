import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as z from 'zod';

import { FC, memo, useCallback, useEffect } from 'react';

import { useDynamicModuleLoader } from '@/shared/hooks/useDynamicModuleLoader';
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
import { getLoginSuccess } from '../../model/selectors/getLoginSuccess/getLoginSuccess';
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
  onClose: any;
};

const LoginForm: FC<TPropsType> = memo((props) => {
  const { onClose } = props;
  const isLoading = useSelector(getLoginIsLoading);
  const success = useSelector(getLoginSuccess);
  const error = useSelector(getLoginError);
  const dispatch = useDispatch();

  useDynamicModuleLoader('loginForm', loginReducer, false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    if (success) {
      onClose();
      alert('Login went successfully');
    }
  }, [onClose, success]);

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      console.log(values);

      dispatch(
        // @ts-ignore
        loginByUsername({
          password: values.password,
          username: values.username,
        }),
      );
    },
    [dispatch],
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
                <Input placeholder="Введите парол" {...field} />
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
