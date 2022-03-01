import { LightningElement, track } from 'lwc';
import getDefaultUser from '@salesforce/apex/AuthenticationController.getDefaultUser';
import setDefaultUser from '@salesforce/apex/AuthenticationController.setDefaultUser';

export default class MainPage extends LightningElement {
    @track
    userLoginOK = false;

    @track
    username = '';

    handleValidation(event) {
        console.log(event.detail.userLoginOK);
        console.log(event.detail.username);
        this.userLoginOK = event.detail.userLoginOK;
        this.username = event.detail.username;
    }

    connectedCallback() {
        console.log("Main connected");
        getDefaultUser().then((result) => {
            console.log('result='+result);
            if(result === false) {
                setDefaultUser();
            }
        }).catch(error => {
            console.log("Main connected error");
            console.log(error);
        });
    }
}