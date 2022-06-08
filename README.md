# Mindful
## Overview
Mindful is a simple tool dedicated to the tracking of a user's defined metrics through timing and calendar based events. The application's goal is to remain simple, streamlined and focused on this objective.

<br>

## Releases
- The `Mindful` Web Application is hosted [here](https://se491-softwareengineeringstudio.github.io/Mindful).
- Downloadable Desktop releases of `Mindful` can be found [here](https://github.com/SE491-SoftwareEngineeringStudio/Mindful/releases).

<br>

## Functionality
<i>Designed, Developed, and Tested By:  Anthony Jarina, Alexander Sobieraj, Mitchell Ergen </i>

| Title  | Description | Priority |
| ------------- | ------------- | ------------- |
| User Authentication  | User is able to login and Create an Account  | Must Have  |
| Calendar Functionality  | Meditation Session Tracking  | Must Have  |
| Meditation Timer  | User can set a Timer for Meditation Session   | Should Have |
| User Preferences | Calendar display and features according to user preferences | Must Have |
| Calendar Month Overview | User can receive feedback on consistent or inconsistent session tracking | Should Have |

<br>

## Tools

| Tech Stack | Link 
| ----------- | ----------- 
| [Angular13](https://angular.io/docs) | component oriented JavaScript framework
| [ElectronJS](https://www.electronjs.org/) | Open Source framework for creating native applications using JavaScript, HTML, and CSS
| [Git](https://git-scm.com/doc) | Version Control
| [VS Code](https://code.visualstudio.com) | Recommended IDE 

<br>

## Getting Started with Local Development
The following is the step by step process for getting started running and developing against `Mindful` locally.
  1. `git clone https://github.com/SE491-SoftwareEngineeringStudio/Mindful.git`
  2. ensure your local development environment has `Node.JS` and `npm` installed (Recommended: `NodeJS` LTS v16.15.0 and `npm` v8.5.5)
  3. install the latest version of [VSCode](https://code.visualstudio.com/)
  4. open `VSCode` and open the ./ClientApp folder where you have cloned the repository from step 1.
  5. in the `VSCode` terminal run the following command: `npm install --verbose`

  Congratulations, you should now have the app fully installed for local development. From that same terminal, try running `npm run start:electron` or `ng serve -o` to ensure installation was completely succesful. all of `Mindful`'s development scripts can be found in the [`package.json`](./ClientApp/package.json) file like any project setup with `npm`.

  <br>

## VSCode extensions
| Extension | Used for 
| ----------- | ----------- 
| [ESLint](https://eslint.org/) | to enforce standard code styling standards across the repository.
| [YAML](https://yaml.org/) | YAML Language Support by Red Hat
| [Prettier](https://prettier.io/) | An opinionated Code Formatter
| [BetterComments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) | Comment Styling
| [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) | Angular Language Service for Visual Studio Code
| [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2) | Helpful Code Snippet shortcuts for Angular

<br>

## Contributing
- Currently `Mindful` is not accepting external contributions, but check back for possibilities in the future.
