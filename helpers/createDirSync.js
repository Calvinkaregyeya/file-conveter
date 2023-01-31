import fs from 'fs';

const createMissingDirectories = (finalDirectory) => {
  if (
    !fs.existsSync('./assets') ||
    !fs.existsSync('./assets/private') ||
    !fs.existsSync(`./assets/private/${finalDirectory}`)
  ) {
    fs.mkdirSync(`./assets/private/${finalDirectory}`, {
      recursive: true,
    });
    return `./assets/private/${finalDirectory}`;
  }
  return `./assets/private/${finalDirectory}`;
};

export default createMissingDirectories;
