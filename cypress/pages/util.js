export default class util {
    generateSimpleEmail(domain) {
       // Get the username from the environment variables
       const username = Cypress.env('USERNAME');
       const randomNumber = Math.floor(Math.random() *1000);
       return `${username}+${randomNumber}@${domain}`;
   }

   
   generateRandomName(minLength, maxLength) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const nameLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let randomName = '';
    for (let i = 0; i < nameLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters[randomIndex];
    }
    return randomName;
}

}

