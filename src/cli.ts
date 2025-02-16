import minimist from 'minimist';
import build from './buildTemplate';
import getConfig from './getConfig';
import watch from './watchInputDir';
import write from './writeRouteFile';

export const run = async (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'watch', 'output'],
    alias: { v: 'version', w: 'watch', o: 'output' },
  });

  if (argv.version !== undefined) {
    console.log(`v${require('../package.json').version}`);
    return;
  }

  if (argv.watch !== undefined) {
    await (async () => {
      const config = await getConfig(argv.output);

      write(build(config));

      if (config.appDir) watch(config.appDir.input, () => write(build(config)));
    })();
  } else {
    await getConfig(argv.output).then(build).then(write);
  }
};
