import { LightningElement, track } from 'lwc';

export default class MainPage extends LightningElement {
    @track
    userLoginOK = false;
    handleValidation(event) {
        this.userLoginOK = event.detail.validation;
    }
}