import { LightningElement, track } from 'lwc';
import getAccessKey from "@salesforce/apex/AuthenticationController.getAccessKey";
import sendEmailToUser from '@salesforce/apex/AuthenticationController.sendEmailToUser';

export default class ClientMainPage extends LightningElement {
    @track
    authCode = '';

    @track
    username = '';

    generateButtonText = 'AuthCode Generate';

    handleAuthcodeGenerate(event) {
        getAccessKey({len: 8}).then(result => {
            this.authCode = result;
            if(this.authCode !== '') {
                this.generateButtonText = 'AuthCode Refresh';
            } else {
                this.generateButtonText = 'AuthCode Generate';
            }
        }).catch(error => {
            console.log(error);
        });
    }

    usernameChange(event) {
        this.username = event.target.value;
        console.log(this.username);
        let questionSetCreator = this.template.querySelector('c-question-set-creator');
        questionSetCreator.setUsername(this.username);
    }

    handleSubmit(event) {
        console.log("send email");
        /*sendEmailToUser(this.username, this.authCode,"www.google.com").then(result => {
            console.log("Email success");
        }).catch(error => {
            console.log("Email error");
            console.log(error);
        });*/
    }
}