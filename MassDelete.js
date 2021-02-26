import { LightningElement, wire,api, track } from 'lwc';
import getProjectList from '@salesforce/apex/MassDelete.getProjectList';
import deleteSelectedProjects from '@salesforce/apex/MassDelete.deleteSelectedProjects';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
 
 
export default class MassDelete_LWC extends LightningElement {
    @wire(getProjectList) Projects;
    @track selectedProjectIdList = [];
    @track  columns =[
        { label: 'Project Name', fieldName: 'Name', type:'text'},
        { label: 'Project Type', fieldName: 'Project_Type__c',type:'Picklist' },
        { label: 'Status', fieldName: 'Status__c', type:'Picklist'}, 
        { label: 'End Date', fieldName: 'End_Date__c', type:'Date'}, 
        { label: 'Priority', fieldName: 'Priority__c', type:'Picklist'}, 
        { label: 'Owner', fieldName: 'Owner__c', type:'Picklist'}, 
    ];
   
    deleteSelRecords(){
        deleteSelectedProjects ({selProjectIdList:this.selectedProjectIdList})
        .then( result =>{
            this.dispatchEvent(
 
            new ShowToastEvent({
                title:'Success!',
                message:'Record deleted successfully',
                variant:'success',
              }),
        );
              
        this.template.querySelector('lightning-datatable').selectedRows=[];
              
            return refreshApex(this.Projects);
        })
        .catch(error =>{
            this.message =undefined;
            this.error = error;
            this.dispatchEvent(
 
                new ShowToastEvent({
                    title:'Success!',
                    message:'Record deleted successfully',
                    variant:'success',
                  }),
            );
            console.log('error' + JSON.stringify(this.error));
        });
    }
 prepareSelectedRows(event){
     const selectedRows=event.detail.selectedRows;
     this.selectedProjectIdList =[];
     for(let i = 0;i< selectedRows.length;i++){
         this.selectedProjectIdList.push(selectedRows[i].Id);

     }
     console.log(this.selectedProjectIdList);
 }
}
