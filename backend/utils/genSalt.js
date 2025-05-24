import { randomBytes } from 'crypto';

export function createSalt(){
  const buf = randomBytes(32);
  return buf.toString('hex'); 
}
