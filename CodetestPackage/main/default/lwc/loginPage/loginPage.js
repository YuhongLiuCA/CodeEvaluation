import { LightningElement,wire,track } from 'lwc';
import verifyUser from '@salesforce/apex/AuthenticationController.verifyUser';

export default class LoginPage extends LightningElement {
    @track
    authCode = "";

    @track
    username = "";

    @track
    showError = false;

    @track
    errorText = "";

    authCodeChange(event)
    {
        this.authCode = event.target.value;
        this.showError = false;
    }

    usernameChange(event)
    {        
        this.username = event.target.value;
        this.showError = false;
    }

    handleLogin(){
        //check auth code not blank
        if (this.authCode === "")
        {
            this.showError = true;
            this.errorText = "Please enter the authorization code";
            return;
        }

        let validation = false;
        console.log(this.authCode);

        //Call the apex controller method to verify User login
        verifyUser({ code: this.authCode, user: this.username })
        .then((result) => {
            if (result) {
                validation = true;
                this.dispatchEvent(new CustomEvent('uservalidated',  {detail: { userLoginOK: validation, username: this.username }}));
            } else {
                this.showError = true;
                this.errorText =  "User info or auth code not valid, please input again";                
            }
        })
        .catch((error) => {
            this.showError = true;
            this.errorText = "Could not connect with server.";
            console.log(error);
        });
    }
}