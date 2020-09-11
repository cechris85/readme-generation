const inquirer = require('inquirer');
const fs =  require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

// function that creates the array of questions for user
function promptUser() {
    return inquirer.prompt([
        {
            type:"input",
            message: "what is the name of your project?",
            name:"title"

        },
        {
            type:"input",
            message: "what is a description of your project?",
            name:"description"
        },
        {
            type:"input",
            message: "what is are the installation instructions for this project?",
            name:"installation"
        },
        {
            type:"input",
            message: "How would you like your application used?",
            name:"usage"
        },
        {
            type:"input",
            message: "Who contributed on this project?",
            name:"contribution"
        },
        {
            type:"input",
            message: "What are the test instructions?",
            name:"test"
        },
        {
            type:"checkbox",
            message: "Please select a license",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPLv3",
            ],
            name: "license"
        
        },
        {
            type:"input",
            message: "What is your github username?",
            name:"user"
        },
        {
            type:"input",
            message: "What is your email address?",
            name:"email"
        },
    ]);
}
 

function generateMarkdown(response) {
return `
# ${response.title}

#Table of Contents

-[Description](#description)
-[Installation](#installation)
-[Usage](#usage)
-[Contribution](#contribution)
-[Test](#test)
-[License](#license)
-[Questions](#questions)


## Description:
  ${response.description}
## Installation:
  ${response.installation}
## Usage:
  ${response.usage}
## Contribution
  ${response.contribution}
## Test 
  ${response.test} 
## License
  ${response.license}
## Questions:
- [GitHub Profile](https://gitub.com/${response.user})

For additional questions please email me at: ${response.email}.
`;



}
// function to initialize program
async function init() {
  try {
      const response = await promptUser();

      const readMe = generateMarkdown(response);

      await writeFileAsync("README.md", readMe);
      console.log("Successully wrote to Readme!");
  }  catch(err) {
      console.log (err);
  }

  }

  


// function call to initialize program
init();