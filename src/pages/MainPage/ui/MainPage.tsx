import { useEffect } from 'react';

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
    </div>
  );
};

export default MainPage;
