public with sharing class MassDelete {
    public MassDelete() {

    }
    
   //delete multiple contact record in LWC
   @AuraEnabled(cacheable=true)
   public static List<Project__c> getProjectList(){
       return[
           SELECT Id, Name,Project_Type__c,Status__c,End_Date__c,Priority__c,Owner__c 
           FROM Project__c where Name!=null order by createdDate desc
       ];
   }
   @AuraEnabled
   public static Void deleteSelectedProjects(List<Id> selProjectIdList){

       List<Project__c> projectList = new   List<Project__c>();
       projectList = [select Id from Project__c Where Id IN:selProjectIdList];

      if(projectList!=null && projectList.size()>0){
       delete projectList;

      }

   }
}
