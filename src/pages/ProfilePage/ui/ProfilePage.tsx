import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { FC, useEffect } from 'react';

import { CurrenCySelect } from '@/entities/Currency';
import { getProfileData } from '@/entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from '@/entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '@/entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/Form/Form';
import { Input } from '@/shared/ui/Form/Input';
import Text from '@/shared/ui/Text/Text';

import classes from './ProfilePage.module.scss';

type FormSchema = {
  age: number;
  avatar: string;
  city: string;
  country: string;
  email: string;
  id: number;
  username: string;
};

const ProfilePage: FC = () => {
  const profileData = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  const dispatch = useAppDispatch();

  const form = useForm();

  console.log('user', profileData);

  useEffect(() => {
    if (profileData?.user) {
      form.reset(profileData.user);
    }
  }, [profileData]);

  const onSubmit = (values: FormSchema) => {
    console.log('form', values);
  };

  return (
    <main className={classes.profileMain}>
      <Form {...form}>
        {error && <Text.Error>{'Произошла ошибка'}</Text.Error>}
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Профиль</h2>

            <form
              // @ts-ignore
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className={classes.formItemsContainer}>
                <div className={classes.avatar}>
                  <img
                    className={classes.avatarPhoto}
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=htmlFormat&fit=crop&w=500&q=60"
                    alt="Bordered avatar"
                  />

                  <div className={classes.avatarInner}>
                    <Button size="lg">Change picture</Button>
                    <Button variant="outline" size="lg">
                      Delete picture
                    </Button>
                  </div>
                </div>

                <div className={classes.formItems}>
                  <div className={classes.formItem}>
                    <div className={classes.formItemInner}>
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Имя пользователя</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите имя пользователя"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className={classes.formItemInner}>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Почта пользователя</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите имя пользователя"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className={classes.formItem}>
                    <div className={classes.formItemInner}>
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Город</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите город проживания"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className={classes.formItemInner}>
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Страна</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите страну проживания"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className={classes.formItem}>
                    <div className={classes.formItemInner}>
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <CurrenCySelect
                              trigger="Select a currency to display"
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className={classes.formItemInner}>
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <CurrenCySelect
                              trigger="Select a currency to display"
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mb-4">
                    <Button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Сохранить
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Form>
    </main>
  );
};

export default ProfilePage;
