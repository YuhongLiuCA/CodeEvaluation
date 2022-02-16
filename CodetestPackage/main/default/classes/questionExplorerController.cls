public with sharing class questionExplorerController {
    @AuraEnabled
    public static List<Question__c> getQuestionSet(){
        QuestionSet__c questionSet;
        List<Question__c> questionList = new List<Question__c>();
        try {
            questionSet = [SELECT Name, (SELECT QuestionSet__c,Question__c FROM QuestionSetEntries__r) FROM QuestionSet__c LIMIT 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        System.debug(questionSet);
        questionList = [SELECT Name,QuestionTopic__c,PlaceHolder__c,Prompt__c,TestClassText__c FROM Question__c ];//WHERE Id IN :questionSet.QuestionSetEntries__r];
        return questionList;
    }
}
