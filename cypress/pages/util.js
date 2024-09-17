export default class Util {
    generateSimpleEmail(domain) {
       // Get the username from the environment variables
       const username = Cypress.env('USERNAME');
       const randomNumber = Math.floor(Math.random() *1000);
       return `${username}+${randomNumber}@${domain}`;
   }

}