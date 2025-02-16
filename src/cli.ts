import minimist from 'minimist';
import build from './buildTemplate';
import getConfig from './getConfig';
import watch from './watchInputDir';
import write from './writeRouteFile';

export const run = async (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'watch', 'enableStatic', 'output'],
    alias: { v: 'version', w: 'watch', s: 'enableStatic', o: 'output' },
  });

  if (argv.version !== undefined) {
    console.log(`v${require('../package.json').version}`);
    return;
  }

  if (argv.watch !== undefined) {
    await (async () => {
      const config = await getConfig(argv.enableStatic !== undefined, argv.output);

      write(build(config));

      if (config.input) watch(config.input, () => write(build(config, 'pages')));
      if (config.appDir) watch(config.appDir.input, () => write(build(config, 'pages')));
      if (config.staticDir) watch(config.staticDir, () => write(build(config, 'static')));
    })();
  } else {
    write(build(await getConfig(argv.enableStatic !== undefined, argv.output)));
  }
};
