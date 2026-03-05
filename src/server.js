import { Model, Response, RestSerializer, createServer } from 'miragejs';

import { articles } from './serverDb/articles';
import { comments } from './serverDb/common';
import { usersP } from './serverDb/users';

export function makeServer() {
  createServer({
    serializers: {
      application: RestSerializer,
      comments: RestSerializer.extend({
        include: ['user', 'article'],
        embed: true,
      }),
    },
    models: {
      user: Model,
      article: Model,
      articles: Model,
      comment: Model,
    },

    seeds(server) {
      articles.forEach((article) => server.create('article', article));
      comments.map((comment) => server.create('comment', comment));
      usersP.forEach((user) => server.create('user', user));
    },
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
        if (user) {
          return { user };
        } else {
          return new Response(401, {}, { message: 'error' });
        }
      });

      this.get('/api/articles', (schema, request) => {
        checkAuth(schema, request);

        const { _page = 1, _limit = 5 } = request.queryParams;

        const articles = schema.articles
          .all()
          .slice((_page - 1) * _limit, _page * _limit);
        return {
          articles,
          pagination: {
            total: schema.articles.all().length,
            page: parseInt(_page, 10),
            limit: parseInt(_limit, 10),
          },
        };

        // return schema.articles.all();
        // return articles;
      });

      this.get('/api/articles/:id', (schema, request) => {
        checkAuth(schema, request);
        const articleId = request.params.id;

        const article = schema.articles.find(articleId);

        if (article) {
          return article;
        } else {
          return new Response(404, {}, { message: 'Article not found' });
        }
      });

      this.get('/api/articles/recommendations', (schema, request) => {
        checkAuth(schema, request);

        const articles = schema.articles.all().slice(0, 4);
        return articles;
      });

      this.get('/api/comments', (schema, request) => {
        checkAuth(schema, request);

        return schema.comments.all();
      });

      this.post('/api/comments', (schema, request) => {
        checkAuth(schema, request);

        let attrs = JSON.parse(request.requestBody);
        const user = schema.users.find(attrs.user);

        return schema.comments.create({ ...attrs, user: user.attrs });
      });

      this.get('/api/comments/:id', (schema, request) => {
        checkAuth(schema, request);

        const articleId = request.params.id;
        const comment = schema.comments.find({ articleId });

        if (comment) {
          return comment;
        } else {
          return new Response(404, {}, { message: 'Comment not found' });
        }
      });

      this.post('/api/reminders', (schema, request) => {
        checkAuth(schema, request);

        let newId = 4;
        let attrs = JSON.parse(request.requestBody);
        attrs.id = newId++;
        return { reminder: attrs };
      });
    },
  });
}

const checkAuth = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(401, {}, { message: 'Unauthorized' });
  }
};
