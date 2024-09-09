import login from "../fixtures/elements/login.json";
import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {
  get email() {
    return cy.get(login.emailTxt);
  }
  get password() {
    return cy.get(login.passwordTxt);
  }
  get submit() {
    return cy.get(login.loginBtn);
  }
}
