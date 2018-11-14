import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-employee-dashboard-dummy',
  templateUrl: './employee-dashboard-dummy.component.html',
  styleUrls: ['./employee-dashboard-dummy.component.css'],
})
export class EmployeeDashboardDummyComponent {
  /** Based on the screen size, switch from standard to one column per row */
  
  cards;
  keys;
  constructor(private breakpointObserver: BreakpointObserver) {}

  setEmployees(employees:any){
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    
      map(({ matches }) => {
        var cards=[];
        var basicInfo;
        var educationInfo;
        var skillsInfo;
        var i=0;
        console.log(employees);
        
        basicInfo={"title":"Basic Information","contents":{
          "employeeName":employees.name,
          "email":employees.email
        }};
        cards[i]=basicInfo;
        
        if(employees.educations !=null){
          let j=0;
          educationInfo={
            "title":"Education",
            "contents":[]
            };
            var contents=[];
          for(let education of employees.educations){
          
            contents[j]={
              "qualification":education.qualification.title,
              "summary":education.summary,
              "institution":education.institution.institutionName,
              "startDate":education.institution.startDate,
              "endDate":education.institution.endDate
            };
            
            j++;
          }
        educationInfo.contents=contents;
        i++;
        cards[i]=educationInfo;
        }

        if(employees.skills!=null){
          let j=0;
          skillsInfo={
            "title":"Skills",
            "contents":[]
            };
            var contents=[];
          for(let skill of employees.skills){
          
            contents[j]={
              "skillName":skill.skillName,
              "skillLevel":skill.skillLevel

            };
            
            j++;
          }
        skillsInfo.contents=contents;
        i++;
        cards[i]=skillsInfo;
        }
    
        
        if (matches) {       
          for(let index in cards){
            cards[index].cols=2;
            if(index!='0'){
            cards[index].rows=cards[index].contents.length;
          }else{
            cards[index].rows=1;
          }
        }
          return cards;
        }
  
        for(let index in cards){
          if(index=='0')
          {cards[index].cols=2;
            cards[index].rows=1;
          }else{
            console.log(cards[index].contents.length);
            cards[index].rows=cards[index].contents.length/2;
            cards[index].cols=1;
          }
         
        }
  
        
  
        return cards;
      })
    );
  }

  hasProp(o, name) {
    return o.hasOwnProperty(name);
  }

  isTitle(title,check){

    return title==check;
  }
}
