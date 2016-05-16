const spawn = require('child_process').spawnSync;
const _ = require('lodash');


function run(cli) {

  return new Promise(function(resolve, reject) {
    if(typeof(cli) === 'string') {
      cli = cli.split(' ');
    }

    console.log(`>> ${cli.join(' ')}
    `);

    var
      command = cli.shift(),
      child = spawn(command, cli, {
        stdio: [process.stdin, process.stdout, process.stderr]
      });

    if(child.error) reject(child);
    else resolve(child);
  });
}

_.assignIn(exports, {
  run: run
});
