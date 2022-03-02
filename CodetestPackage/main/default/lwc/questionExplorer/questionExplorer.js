import { LightningElement, track, api } from 'lwc';
import getQuestionSet from '@salesforce/apex/questionExplorerController.getQuestionSet';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QuestionExplorer extends LightningElement {
    
    @track questionSet = [];

    @api username = '';

    retryAuthentication = false;

    connectedCallback(){
        if(this.questionSet.length == 0){
            this.getQuestionSets();
        }
    }

    getQuestionSets(){
        console.log("username="+this.username);
        getQuestionSet({username: this.username}).then((result) => {
            this.questionSet = result;
        }).catch((error) => {
            console.log("Explorer error");
            console.log(error);
        });
    }

    getQuestions(sets){
        sets.forEach(element => {
            getQuestionSet().then((questions) =>{
                if(questions){
                    this.questionSet = result;
                    //questions = JSON.parse(JSON.parse(questions));
                    //this.questionSet.push(questions);
                }
            });
        });
    }

    retryGetList() {
        getQuestionSet({username: this.username}).then(result => {
            this.questionSet = result;
        })
        .catch(error => {this.showErrorToast(error)});
    }

    handleSelect(event) {
        let selectevent = new CustomEvent('questionselect',{
            detail: event.detail
        });
        this.dispatchEvent(selectevent);
    }

    showErrorToast(error){
        const event = new ShowToastEvent({
            title: 'ERROR',
            variant: 'error',
            message: error
        });
        this.dispatchEvent(event);
    }
}
