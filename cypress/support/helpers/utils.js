import {parseInt} from 'lodash';

export const parseInvitationLink = (link) => {
  const str = link;
  const splitted = str.split('.io/');
  link = splitted[1];
  return link;
};

export const generateRandomName = (base = 'Alex') => {
  const number = Math.floor(Math.random() * (1000000 - 87 + 1) + 87);
  return base + number.toString();
};

export const generateFutureDate = (date) => {
  const noOfDaysInFuture = parseInt(date.match(/\d+/));
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + noOfDaysInFuture);
  return futureDate;
};

export const generatePastDate = (date) => {
  const noOfDaysInPast = parseInt(date.match(/\d+/));
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - noOfDaysInPast);
  return pastDate;
};

export const generateCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  return currentDate;
};

export const advanceDateBy = (numberOfDays) => {
  const getDaysInMilliSeconds = Number(numberOfDays) * 1000 * 60 * 60 * 24;
  cy.clock(Date.now() + getDaysInMilliSeconds);
};

export const generateRandomDateByYears = (choicesFromYear, choicesToYear) => {
  const fromDate = new Date();
  fromDate.setFullYear(choicesFromYear, 0, 0);
  const toDate = new Date();
  toDate.setFullYear(choicesToYear, 0, 0);
  const date = new Date(+fromDate + Math.random() * (toDate - fromDate));
  return date;
};

/** *
 * @param size N size of array
 * @param startIndex N startingIndex of array
 *  @returns an array of size N=2 and startIndex = 0 ==> ['0', '1']
 */
export const getArrayofSizeNWithStringElement = (size, startIndex = 0) =>{
  if (size) {
    return Array(size).fill(null).map((_, i) =>{
      // eslint-disable-next-line prefer-const
      let count = i + startIndex;
      return count.toString();
    });
  }
};

export const getAnswerText = (answerText) => {
  const messageArray = [...answerText];
  const messageArrayLength = messageArray.length;
  const secondSlice = messageArrayLength - 4;
  const text = (answerText).slice(3, secondSlice);
  return text;
};

/**
 * Returns the text from a HTML string
 *
 * @param {html} String The html string
 */
export const stripHtml = (html) => {
  const temporalDivElement = document.createElement('div');
  temporalDivElement.innerHTML = html;
  return temporalDivElement.textContent || temporalDivElement.innerText || '';
};

export const attachScreenshotToFailedStep = () => {
  const screenshotsFolder = Cypress.config('screenshotsFolder');
  if (window.cucumberJson?.generate) {
    const testState = window.testState;
    const stepResult =
        testState.runTests[testState.currentScenario.name][testState.currentStep];
    if (stepResult?.status === 'failed') {
      const screenshotFileName =
      `${testState.feature.name} -- ${testState.currentScenario.name} (failed).png`;
      cy.readFile(
          `${screenshotsFolder}/${Cypress.spec.name}/${screenshotFileName}`,
          'base64')
          .then((imgData) => {
            stepResult.attachment = {
              data: imgData,
              media: {type: 'image/png'},
              index: testState.currentStep,
              testCase: testState.formatTestCase(testState.currentScenario),
            };
          });
    }
  }
};

export const randomFloatNumberFromInterval = (min, max, decimal) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimal);
  return parseFloat(str);
};

export const generateRoleName = () => {
  const newRoleName = 'CrExp'+randomNumberFromInterval(1111, 9999);
  Cypress.env('roleName', newRoleName);
};

export const generateRanodomCharacters = (length) => {
  // eslint-disable-next-line max-len
  const characters = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum purus risus, sodales accumsan justo viverra ac. Maecenas interdum ante diam, quis dictum odio consectetur eu. In pellentesque quam sit amet erat tincidunt dapibus et eget tellus. Nunc massa dolor, elementum eu nibh eleifend.';
  return characters.substring(0, length);
};

export const generateRandomNumberWithDecimals = (min, max, decimalPlaces) => {
  const rand = Math.random()*(max-min) + min;
  const power = Math.pow(10, decimalPlaces);
  const number = Math.floor(rand*power) / power;
  return number;
};

export const scrollDropdownUntilFindValue = (row, value) => {
  const recurse = (commandsFn, checkFn, limit = 3) => {
    if (limit < 0) {
      throw new Error('Recursion limit reached');
    }
    cy.log(`remaining attempts **${limit}**`);

    commandsFn().then(() => {
      if (checkFn()) {
        cy.log(`**Value ${value} is Found**`);
        return;
      }

      recurse(commandsFn, checkFn, limit - 1);
    });
  };

  recurse(
      () => row.last().scrollIntoView(),
      () => row.should('contain.text', value),
      30,
  );
};

export const clearBrowserStorage = () => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
  cy.log('Browser Storage is cleared.');
};

export const clearProductsData = () => {
  const data = {products: []};

  cy.readFile('cypress/fixtures/productsAdded.json').then(() => {
    cy.writeFile('./cypress/fixtures/productsAdded.json', data);
  });
  cy.log('Product Data JSON is cleared.');
};

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDateForAppointment(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    'T' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':') + 'Z'
  );
}

export function getDeploymentId(fullConfiguration, deploymentName) {
  for (const id in fullConfiguration.deployments) {
    if (fullConfiguration.deployments[id].name === deploymentName) {
      return fullConfiguration.deployments[id].deploymentId;
    }
  }
}
