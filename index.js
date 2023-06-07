const core = require('@actions/core');
const github = require('@actions/github');

const sanitize = (val) => {
    if (!val) {
      return;
    }
    const sanitized = val.toLowerCase().replace(/\//g, '-').replace(/\./g, '-').replace(/[^a-z0-9\n-]/gi, '');
    const properLength = sanitized.substring(0, 42)
    const withoutDash = properLength[properLength.length-1] === "-" ?
      properLength.substring(0, properLength.length-1) :
      properLength;
    return withoutDash;
  };
  

try {
  // `who-to-greet` input defined in action metadata file
  const input = core.getInput('input');
  console.log(`Input is ${input}!`);
  const output = sanitize(input);
  core.setOutput("output", output);
  console.log(`The output: ${output}`);
} catch (error) {
  core.setFailed(error.message);
}
