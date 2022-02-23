import { LightningElement, track } from 'lwc';
import getQuestionSet from '@salesforce/apex/questionExplorerController.getQuestionSet';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QuestionExplorer extends LightningElement {
    
    @track questionSet = [];
    retryAuthentication = false;

    constructor(){
        super();
        if(this.questionSet.length == 0){
            this.getQuestionSets();
        }
    }

    getQuestionSets(){
        getQuestionSet().then((result) => {
            this.questionSet = result;
        }).catch((error) => {
            console.log(error);
        });
        /*getQuestionSet({url:""}).then((result) =>{
            if(result == "UNAUTHENTICATED"){
                return;
            }
            if(result == "EXPIRED_TOKEN" && !this.retryAuthentication){
                this.retryAuthentication == true;
                this.getQuestionSets();
            }
            else if(result){
                this.retryAuthentication = false;
                result = JSON.parse(JSON.parse(result));
                this.getQuestions(result.entries);
            }
        });*/
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
        getQuestionSet().then(result => {
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
