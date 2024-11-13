import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';

function generateSecretKey(length: number = 64): string {
  return randomBytes(length).toString('hex').slice(0, length);
}

const secretKey = generateSecretKey();
writeFileSync('secret-key.txt', `Generated Secret Key: ${secretKey}\n`);
console.log('Secret key saved to secret-key.txt');