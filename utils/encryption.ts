import crypto from 'crypto';

// The encryption key should be stored in an environment variable
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-for-development-only';

// Ensure the key is the right length for AES-256 (32 bytes)
const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);

/**
 * Encrypt a string using AES-256-GCM
 * @param text The text to encrypt
 * @returns An object containing the encrypted text and IV
 */
export function encrypt(text: string): { encryptedData: string; iv: string } {
  // Generate a random initialization vector
  const iv = crypto.randomBytes(16);
  
  // Create a cipher using AES-256-GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  // Encrypt the text
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Get the authentication tag
  const authTag = cipher.getAuthTag().toString('hex');
  
  // Return the encrypted data and IV
  return {
    encryptedData: encrypted + ':' + authTag,
    iv: iv.toString('hex')
  };
}

/**
 * Decrypt a string that was encrypted using AES-256-GCM
 * @param encryptedData The encrypted data
 * @param iv The initialization vector used for encryption
 * @returns The decrypted text
 */
export function decrypt(encryptedData: string, iv: string): string {
  // Split the encrypted data and authentication tag
  const [encrypted, authTag] = encryptedData.split(':');
  
  // Convert the IV from hex to a Buffer
  const ivBuffer = Buffer.from(iv, 'hex');
  
  // Create a decipher using AES-256-GCM
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, ivBuffer);
  
  // Set the authentication tag
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  // Decrypt the text
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
