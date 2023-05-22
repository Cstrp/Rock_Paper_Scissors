import crypto from 'crypto';

class KeyGen {
  public generateKey(length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex');
  }

  public calculateHMAC(key: string, data: string): string {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);

    return hmac.digest('hex');
  }
}

export const keyGen: KeyGen = new KeyGen();
