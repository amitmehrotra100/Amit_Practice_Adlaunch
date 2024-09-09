import Signup from "../fixtures/elements/Signup.json";
import { BasePage } from "./BasePage";
export default class SignupPage extends BasePage {
  get Signup() {
    return cy.get(Signup.Signuptxt);
  }

  get EmailAddress(){
     return cy.get(Signup.Emailaddress);
  }
  get plan(){
    return cy.get(Signup.Selectplan);
  }
}