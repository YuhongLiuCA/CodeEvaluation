public without sharing class AuthenticationController {

    @AuraEnabled(cacheable=true)
    public static Boolean verifyUser(String code, string user) {
        return AuthUtil.userAuthenticated(code,user);
    }

    @AuraEnabled
    public static Boolean getDefaultUser(){
        return AuthUtil.getDefaultUser();
    }

    @AuraEnabled
    public static void setDefaultUser(){
        AuthUtil.setDefaultUser();
    }

    @AuraEnabled(cacheable=true)
    public static String SiteUrl() {
        ServerInfo__mdt server = [
            SELECT ServerUrl__c 
            FROM ServerInfo__mdt
            WHERE MasterLabel = 'Server' 
            LIMIT 1];
        return server.ServerUrl__c;
    }

    @AuraEnabled
    public static Boolean setSession(String code){
        AuthUtil.Authenticate(code);
        return true;
    }

    @AuraEnabled
    public static Boolean isAuthenticated(){
        return AuthUtil.isAuthenticated();
    }

    @AuraEnabled
    public static Boolean deAuthenticate(){
        AuthUtil.deauthenticate();
        return true;
    }
    @AuraEnabled
    public static Boolean expireToken(){
        AuthUtil.expireToken();
        return true;
    }
}
