import { LightningElement, track, api} from 'lwc';

export default class TestCenter extends LightningElement {


    @track
    questionList; 

    @api
    username = '';
    
    handleSelect(event){
        this.questionList = event.detail;
    }

    handleSetFinish(){
        this.questionList = null;
    }

}