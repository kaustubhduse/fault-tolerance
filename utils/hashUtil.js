import crypto from 'crypto'

export function generateHash(obj) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(obj))
    .digest('hex')
}
