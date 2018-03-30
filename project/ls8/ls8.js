const RAM = require('./ram');
const CPU = require('./cpu');
const fs = require('fs');

/**
  * Process a loaded file
  */
function processFile(content, cpu, onComplete) {
  let curAddr = 0;

  const lines = content.split('\n');

  for (let line of lines) {

    if (line.includes('#'))
      line = line.replace(/#.+/gi, '');

    line.trim();

    if (line === '')
      continue;

    const value = parseInt(line, 2);

    cpu.poke(curAddr, value);

    curAddr++;
  }

  onComplete(cpu);
}

/**
* Load the instructions into the CPU from stdin
*/
function loadFileFromStdin(cpu, onComplete) {
  let content = '';

  // Read everything from standard input, stolen from:
  // https://stackoverflow.com/questions/13410960/how-to-read-an-entire-text-stream-in-node-js
  process.stdin.resume();
  process.stdin.on('data', function (buf) { content += buf.toString(); });
  process.stdin.on('end', () => { processFile(content, cpu, onComplete); });
}

/**
* Load the instructions into the CPU from a file
*/
function loadFile(filename, cpu, onComplete) {
  const content = fs.readFileSync(filename, 'utf-8');
  processFile(content, cpu, onComplete);
}

/**
* On File Loaded
* 
* CPU is set up, start it running
*/
function onFileLoaded(cpu) {
  cpu.startClock();
}

/**
* Main
*/

let ram = new RAM(256);
let cpu = new CPU(ram);

// Get remaining command line arguments
const argv = process.argv.slice(2);

if (argv.length === 0) {
  loadFileFromStdin(cpu, onFileLoaded);
} else if (argv.length == 1) {
  loadFile(argv[0], cpu, onFileLoaded);
} else {
  console.error('usage: ls8 [machinecodefile]');
  process.exit(1);
}