import process from "process";
import { fileURLToPath } from 'url';

export const isModuleRun = () =>
  process.argv[1] === fileURLToPath(import.meta.url);
