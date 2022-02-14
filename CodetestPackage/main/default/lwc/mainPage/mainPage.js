import { LightningElement, track } from 'lwc';
import getDefaultUser from '@salesforce/apex/AuthenticationController.getDefaultUser';
import setDefaultUser from '@salesforce/apex/AuthenticationController.setDefaultUser';

export default class MainPage extends LightningElement {
    @track
    userLoginOK = false;

    handleValidation(event) {
        this.userLoginOK = event.detail;
    }

    connectedCallback() {
        getDefaultUser().then((result) => {
            if(result === false) {
                setDefaultUser();
            }
        });
    }
}