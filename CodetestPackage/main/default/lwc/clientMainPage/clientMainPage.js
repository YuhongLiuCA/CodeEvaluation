import { LightningElement, track } from 'lwc';
import getAccessKey from "@salesforce/apex/AuthenticationController.getAccessKey"

export default class ClientMainPage extends LightningElement {
    @track
    authCode = '';

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
}