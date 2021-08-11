import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getDirname = (url = import.meta.url) => dirname(fileURLToPath(url));
