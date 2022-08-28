/* eslint-disable prefer-const */
let reporter = require('cucumber-html-reporter');

// process.argv[2] is commandline argument for pipeline usage
// For local : jsonDir: report/JSON
// For Pipeline: jsonDir: ./etc/usr/artifacts/

let options = {
  theme: 'hierarchy',
  brandTitle: 'Test Report',
  jsonDir: process.argv[2] ? process.argv[2] : 'report/JSON',
  output: process.argv[2] ?
    process.argv[2]+'/cucumber_report.html' :
    'report/HTML/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  columnLayout: 1,
};

reporter.generate(options);
