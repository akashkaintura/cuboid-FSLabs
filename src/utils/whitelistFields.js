import { intersection } from './sets';

export default (whitelist = []) => (fields = []) =>
  intersection(whitelist, fields);
