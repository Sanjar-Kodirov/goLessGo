import { Response, createServer } from 'miragejs';

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
        // Retrieve user information based on the token
        // For example:
        if (token === 'yourGeneratedTokenHere') {
          return {
            user: {
              id: 1,
              username: 'sanjar',
              email: 'sanjar@example.com',
            },
          };
        } else {
          return {
            user: null, // Return null or appropriate response for unauthorized access
          };
        }
      });

      this.get('/api/reminders', (schema, request) => {
        if (!request.requestHeaders.Authorization) {
          return new Response(401, {}, { message: 'Unauthorized' });
        }
        return {
          reminders: [
            { id: 1, text: 'Walk the dog' },
            { id: 2, text: 'Take out the trash' },
            { id: 3, text: 'Work out' },
          ],
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