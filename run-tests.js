const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

// Instantiate a Mocha instance.
const mocha = new Mocha();

const testDir = 'test';

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(file => {
    // Only add .js files
    return file.substr(-3) === '.js';
}).forEach(file => {
    mocha.addFile(
        path.join(testDir, file)
    );
});

// Run the tests.
mocha.run(failures => {
  process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there are failures
});
