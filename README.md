# CodeLux (Group 20)
 
## Instructions
0. Navigate to the root directory of the application, run `npm install`
1. Run `npm run dev`
2. Await the localhost link printed in the console
3. Connect to the server in any popular web browser that is up to date. Google Chrome and Firefox are recommended.
4. To run the code analysis system, install Docker (version 23.0 recommended) from https://www.docker.com/ and simply open the Docker application before running the analysis. Only the code analysis system is dependent on Docker running, the rest of CodeLux operates fully without it.

## Additional guidance
- It is advised to create a project after signing up to access the various features of the application. A project can be added by pressing the 'add project' button in the navigation bar.
- After creating a project, you will be forwarded to the overview page for that project, displaying all the relevant information for the project. This is also the page where code analysis can be run and the project can be marked as complete. This page is accessible from the dashboard and the projects list page.
- Then, it is recommended that you navigate to the dashboard, which will display the project you have just added and any others you may have. Here, you will be able to view the number of projects at risk, overdue projects and those with upcoming deadlines, surveys and tasks. Only project managers will be able to see if a project is at risk, but all project members can take surveys and complete tasks for their projects.
- Surveys for projects can be taken from the dashboard. Project members are reminded to take surveys weekly. Tasks for projects include running code analysis for the project source code. Project members are encouraged to run code analysis weekly. Notifications of tasks and surveys will appear in the dashboard when due.
- Running Docker is necessary only for the code analysis system when running the application server locally. CodeLux will report 'Code analysis unsuccessful' in the popup otherwise.

## Testing
- We have used two different test runners - Jest and Cypress
- Jest was used for unit/component testing and Cypress for end-to-end/integration testing
### How to run Jest tests
1. Run `npm install` to make sure you have all the necessary packages
2. Run `npm test`
### How to run Cypress tests
1. Run `npm install` to make sure you have all the necessary packages
2. Run `npm run dev` so the Cypress tests can run
3. Run `npx cypress open` to get the debugging window
4. Choose e2e testing
5. Run on whichever browser you desire!
