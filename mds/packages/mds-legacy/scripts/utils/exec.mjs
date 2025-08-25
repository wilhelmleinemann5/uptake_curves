import child_process from 'child_process';

export const execShellCommand = async (cmd) => {
  try {
    return await new Promise((resolve, reject) => {
      try {
        const exec = child_process.exec;
        exec(cmd, (err, stdout, stderr) => {
          if (err) {
            return reject(err);
          }
          if (stderr) {
            return resolve(stderr);
          }
          return resolve(stdout);
        });
      } catch (err) {
        return reject(err);
      }
    });
  } catch (err) {
    throw err;
  }
};
