import { createServer } from 'miragejs';
import { dndCats, dndResults, dndNoTerm } from './routes';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = '/api';
      this.timing = 500;

      this.get('/dnd', dndCats);
      this.get('/dnd/:category', dndNoTerm);
      this.get('/dnd/:category/:formattedTerm', dndResults);

      this.passthrough('https://www.dnd5eapi.co/**');
    },
  });

  return server;
}
