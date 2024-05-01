import { Config } from '..';
import { restLayer } from './rest';

function start(config: Config) {
  restLayer(config);
}

export { start };
