import fs from 'fs-extra';
import path from 'path';

const storeLocation = path.resolve(process.cwd(), 'store.json');

const set = async (updater) => {
  const file = await fs.readJSON(storeLocation);
  const newFile = updater(file);
  await fs.writeJSON(storeLocation, newFile);
};

const get = async () => await fs.readJSON(storeLocation);

export default {
  set,
  get,
};
