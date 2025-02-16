import { defineRoute } from './frourio.server';

export const { GET, POST } = defineRoute({
  get: async () => ({ status: 200, body: 'ok' }),
  post: async ({ body }) => ({ status: 200, body: { cc: body.bb } }),
});
