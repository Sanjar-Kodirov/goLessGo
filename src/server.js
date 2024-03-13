import { Response, createServer } from 'miragejs';

import { articles } from './serverDb/articles';
import { comments } from './serverDb/common';

const usersP = [
  {
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
  {
    id: 2,
    email: '2@2.com',
    username: 's',
    age: 24,
    avatar: 'https://i.pravatar.cc/300',
    country: 'Uzbekistan',
    city: 'Tashkent',
    avatar:
      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg',
  },
  {
    id: 3,
    email: '3@3.com',
    username: 's',
    age: 24,
    avatar: 'https://i.pravatar.cc/300',
    country: 'Uzbekistan',
    city: 'Tashkent',
    avatar:
      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg',
  },
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
          return new Response(200, {}, { token: '1' });
        } else {
          return new Response(401, {}, { message: 'Invalid credentials' });
        }
      });

      this.get('/api/current_user', (schema, request) => {
        const token = request.requestHeaders.Authorization.split(' ')[1]; // Extract token from Authorization header

        const user = usersP.find((user) => user.id == Number(token));
        console.log('user', user);
        if (user) {
          return { user };
        } else {
          return new Response(401, {}, { message: 'error' });
        }
      });

      this.get('/api/articles', (schema, request) => {
        if (!request.requestHeaders.Authorization) {
          return new Response(401, {}, { message: 'Unauthorized' });
        }
        return articles;
      });

      this.get('/api/articles/:id', (schema, request) => {
        const articleId = request.params.id;
        const article = articles.find((item) => item.id == articleId);

        if (!request.requestHeaders.Authorization) {
          return new Response(401, {}, { message: 'Unauthorized' });
        }

        if (article) {
          return article;
        } else {
          return new Response(404, {}, { message: 'Article not found' });
        }
      });

      this.get('/api/comments', (schema, request) => {
        if (!request.requestHeaders.Authorization) {
          return new Response(401, {}, { message: 'Unauthorized' });
        }

        if (comments) {
          return comments;
        } else {
          return new Response(404, {}, { message: 'Comment not found' });
        }
      });

      this.get('/api/comments/:id', (schema, request) => {
        const commentId = request.params.id;
        const comment = comments.find((item) => item.id == articleId);

        if (!request.requestHeaders.Authorization) {
          return new Response(401, {}, { message: 'Unauthorized' });
        }

        if (article) {
          return comment;
        } else {
          return new Response(404, {}, { message: 'Comment not found' });
        }
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
