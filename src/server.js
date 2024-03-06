import { Response, createServer } from 'miragejs';

const reminders = [
  { id: 1, text: 'Walk the dog' },
  { id: 2, text: 'Take out the trash' },
  { id: 3, text: 'Work out' },
];

export function makeServer() {
  createServer({
    routes() {
      this.post('/api/login', (schema, request) => {
        let requestBody = JSON.parse(request.requestBody);
        if (
          requestBody.username === 'sanjar' &&
          requestBody.password === 'sanjar'
        ) {
          return new Response(200, {}, { token: 'yourGeneratedTokenHere' });
        } else {
          return new Response(401, {}, { message: 'Invalid credentials' });
        }
      });

      this.get('/api/current_user', (schema, request) => {
        const token = request.requestHeaders.Authorization.split(' ')[1]; // Extract token from Authorization header
        if (token === 'yourGeneratedTokenHere') {
          return {
            user: {
              id: 1,
              email: 'sanjar@example.com',
              username: 'sanjar',
              age: 24,
              avatar: 'https://i.pravatar.cc/300',
              country: 'Uzbekistan',
              city: 'Tashkent',
              avatar:
                'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg',
            },
          };
        } else {
          return new Response(401, {}, { message: 'error' });
        }
      });

      this.get('/api/reminders', (schema, request) => {
        if (!request.requestHeaders.Authorization) {
          return new Response(401, {}, { message: 'Unauthorized' });
        }
        return {
          reminders,
        };
      });

      this.post('/api/reminders', (schema, request) => {
        if (!request.requestHeaders.Authorization) {
          return new Response(401, {}, { message: 'Unauthorized' });
        }
        let newId = 4;
        let attrs = JSON.parse(request.requestBody);
        attrs.id = newId++;
        return { reminder: attrs };
      });
    },
  });
}
