import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Lets image slots degrade to a placeholder while the asset set is still being
 * produced. Drop the file into /public at the expected path and the real image
 * renders on the next build — no flag to flip, no code to touch.
 */
export function publicFileExists(publicPath: string): boolean {
  try {
    return existsSync(path.join(process.cwd(), 'public', publicPath));
  } catch {
    return false;
  }
}
