import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { EducationChicklets } from 'src/app/add-module/education-dialog/domain/educationchicklets';
import { EducationSection } from 'src/app/add-module/education-dialog/domain/educationsection';
import { DownstreamBackendService } from '../../downstream-backend.service';
import { SkillChicklets } from 'src/app/add-module/skill-dialog/domain/skillchicklets';
import { SkillSection } from 'src/app/add-module/skill-dialog/domain/skillsection';
import { ProjectChicklets } from 'src/app/add-module/project-dialog/domain/projectchicklets';
import { ProjectSection } from 'src/app/add-module/project-dialog/domain/projectsection';
import { CertificateChicklets } from 'src/app/add-module/certificate-dialog/domain/certificatechicklets';
import { CertificateSection } from 'src/app/add-module/certificate-dialog/domain/certificatesection';
import { ExperienceSection } from 'src/app/add-module/experience-dialog/domain/section';
import { Qualification } from 'src/app/add-module/education-dialog/domain/qualification';
import { Institution } from 'src/app/add-module/education-dialog/domain/institution';
import { Chicklets } from 'src/app/add-module/experience-dialog/domain/chicklets';
import { LocationChicklets } from 'src/app/add-module/location-dialog/domain/chicklets';
import { CurrentLocation } from 'src/app/add-module/location-dialog/domain/currentlocation';
import { LocationSection } from 'src/app/add-module/location-dialog/domain/section';
import { PastLocation } from 'src/app/add-module/location-dialog/domain/pastlocation';

@Component({
  selector: 'app-employee-dashboard-dummy',
  templateUrl: './employee-dashboard-dummy.component.html',
  styleUrls: ['./employee-dashboard-dummy.component.css'],
})
export class EmployeeDashboardDummyComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  cards;
  keys;
  basicLength = 0;
  isLoggedIn = false;
  basicInfo;
  public isCollapsed = false;
  constructor(private breakpointObserver: BreakpointObserver,
    private tokenstorageservice: TokenStorageService , private downstreamBackendService: DownstreamBackendService) {}


  ngOnInit() {
    if (this.tokenstorageservice.getToken()) {
      this.isLoggedIn = true;
    }
  }

  setEmployees(employees: any) {

    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(

      map(({ matches }) => {
        const cards = [];
        let educationInfo;
        let skillsInfo;
        let projectInfo;
        let locationInfo;
        let certificateInfo;
        let experienceInfo;
        let i = 0;
        console.log(employees);


        this.basicInfo = {'title': 'Basic Information', 'contents': {
          'employeeName': employees.name,
          'email': employees.email
        }};
        this.basicLength = 1;

        if (employees.educations != null && employees.educations.length !== 0) {
          let j = 0;
          educationInfo = {
            'title': 'Education',
            'contents': []
            };
            const contents = [];
          for (const education of employees.educations) {

            contents[j] = {
              'qualification': education.qualification.title,
              'summary': education.summary,
              'institution': education.institution.institutionName,
              'institutionId': education.institution.institutionId,
              'startDate': education.institution.startDate,
              'endDate': education.institution.endDate,
              'id': education.qualification.qualificationId
            };

            j++;
          }
        educationInfo.contents = contents;
        cards[i] = educationInfo;
        i++;
        }

        if (employees.skills != null && employees.skills.length !== 0) {
          let j = 0;
          skillsInfo = {
            'title': 'Skills',
            'contents': []
            };
            const contents = [];
          for (const skill of employees.skills) {

            contents[j] = {
              'skillName': skill.skillName,
              'skillLevel': skill.skillLevel,
              'skill': skill

            };

            j++;
          }
        skillsInfo.contents = contents;
        cards[i] = skillsInfo;
        i++;
        }
        if (employees.projects != null && employees.projects.length !== 0) {
          let j = 0;
          projectInfo = {
            'title': 'Project',
            'contents': []
            };
            const contents = [];
          for (const projects of employees.projects) {

            contents[j] = {
              'title': projects.title,
              'fromDate': projects.fromDate,
              'toDate' : projects.toDate,
              'projectUrl' : projects.projectUrl,
              'role' : projects.role,
              'technologiesUsed' : projects.technologiesUsed,
              'description' : projects.description,
              'project': projects
            };

            j++;
          }
        projectInfo.contents = contents;
        cards[i] = projectInfo;
        i++;
        }
        if (employees.location != null  && employees.location.length !== 0) {
          const j = 0;
          locationInfo = {
            'title': 'Location',
            'contents': [ {
              'currentLocationId': employees.location.currentLocation.currentLocationId,
              'currentCityName' : employees.location.currentLocation.cityName,
              'currentStateName' : employees.location.currentLocation.stateName,
              'currentPinCode' :  employees.location.currentLocation.pinCode,
              'pastLocation' : employees.location.pastLocation
            }]
            };
        cards[i] = locationInfo;
        i++;
        }
        if (employees.certificates != null  && employees.certificates.length !== 0) {
          let j = 0;
          certificateInfo = {
            'title': 'Certificate',
            'contents': []
            };
            const contents = [];
          for (const certificates of employees.certificates) {

            contents[j] = {
              'certificateName' : certificates.certificateName,
              'certificateAuthority' : certificates.certificateAuthority,
              'licenseNumber' : certificates.licenseNumber,
              'fromDate' : certificates.fromDate,
              'toDate' : certificates.toDate,
              'certificate': certificates
            };

            j++;
          }
        certificateInfo.contents = contents;
        cards[i] = certificateInfo;
        i++;
        console.log(cards[i]);
        }
        if (employees.experiences != null  && employees.experiences.length !== 0) {
          let j = 0;
          experienceInfo = {
            'title': 'Experience',
            'contents': []
            };
            const contents = [];
          for (const experiences of employees.experiences) {

            contents[j] = {
              'organisation' :  experiences.organisation,
              'role' : experiences.role,
              'fromDate' : experiences.fromDate,
              'toDate' : experiences.toDate,
              'fromMonth' : experiences.fromMonth,
              'toMonth' : experiences.toMonth,
              'fromYear' : experiences.fromYear,
              'toYear' : experiences.toYear ,
              'experience': experiences
            };

            j++;
          }
        experienceInfo.contents = contents;
        cards[i] = experienceInfo;
        i++;
        console.log(cards[i]);
        }
        if (matches) {
          for (const index in cards) {
            if (cards[index].title === 'Education') {
              console.log("education length " + cards[index].contents.length);
              if (cards[index].contents.length <= 2) {
                cards[index].rows = cards[index].contents.length * 3.8 ;
              } else {
                cards[index].rows = cards[index].contents.length * 3.2;
              }
              cards[index].cols = 2;
            }else if (cards[index].title  === 'Skills') {
              console.log("skill length " + cards[index].contents.length);
                cards[index].rows = cards[index].contents.length * 2.5;
                cards[index].cols = 2;
              } else if (cards[index].title  === 'Project') {
                cards[index].rows = cards[index].contents.length * 6.5;
                cards[index].cols = 2;
              } else if (cards[index].title  === 'Certificate') {
                console.log("certificate length " + cards[index].contents.length);
                cards[index].rows = cards[index].contents.length * 5.5 ;
                cards[index].cols = 2;
              } else if (cards[index].title  === 'Location') {
                console.log(cards[index].contents.length);
                cards[index].rows = cards[index].contents.length * 5.5 ;
                cards[index].cols = 2;
              }
          }
          return cards;
        }

        for (const index in cards) {
          if (cards[index].title === 'Education') {
            console.log("education length " + cards[index].contents.length);
            if (cards[index].contents.length <= 2) {
              cards[index].rows = cards[index].contents.length * 3.8 ;
            } else {
              cards[index].rows = cards[index].contents.length * 3.2;
            }
            cards[index].cols = 1;
          }else if (cards[index].title  === 'Skills') {
            console.log("skill length " + cards[index].contents.length);
              cards[index].rows = cards[index].contents.length * 2.5;
              cards[index].cols = 1;
            } else if (cards[index].title  === 'Project') {
              cards[index].rows = cards[index].contents.length * 6.5;
              cards[index].cols = 1;
            } else if (cards[index].title  === 'Certificate') {
              console.log("certificate length " + cards[index].contents.length);
              if (cards[index].contents.length === 1){
                cards[index].rows = cards[index].contents.length * 5.5 ;
              }
              cards[index].rows = cards[index].contents.length * 4.8 ;
              cards[index].cols = 1;
            } else if (cards[index].title  === 'Location') {
              console.log(cards[index].contents.length);
              cards[index].rows = cards[index].contents.length * 5.5 ;
              cards[index].cols = 1;
            }
        }
        return cards;
      })
    );
  }

  hasProp(o, name) {
    return o.hasOwnProperty(name);
  }

  isTitle(title, check) {

    return title === check;
  }

  logout() {
    this.tokenstorageservice.signOut();
    window.location.reload();
  }

  onDelete(content, title) {
    if (title === 'Education') {
      const qualification = new Qualification(content.id, content.qualification);
      const institution = new Institution(content.institutionId, content.institution,
        content.startDate, content.endDate) ;
      const  educationChicklets = new EducationChicklets(qualification, institution, content.summary);
      const chicklets = new Array<EducationChicklets>();
      chicklets.push(educationChicklets);
      const educationSection = new EducationSection('Education', this.tokenstorageservice.getEmail(), 'delete', chicklets);
      console.log(educationSection);
      this.downstreamBackendService.deleteEducationDetails(educationSection)
      .subscribe(
        (data) => {
          console.log(data);
        }
      );
    } else if (title === 'Skills') {
      const skillChicklet = new SkillChicklets(content.skill);
      const chicklets = [skillChicklet];
      const skillSection = new SkillSection('Skills', this.tokenstorageservice.getEmail(), 'delete', chicklets);
      this.downstreamBackendService.deleteSkillsDetails(skillSection)
      .subscribe(
        (data) => {
          console.log(data);
          location.reload();
        }
      );
    }    else if (title === 'Project') {
      const projectChicklet = new ProjectChicklets(content.project);
      const chicklets = [projectChicklet];
      const projectSection = new ProjectSection('Project', this.tokenstorageservice.getEmail(), 'delete', chicklets);
      this.downstreamBackendService.deleteProjectDetails(projectSection)
      .subscribe(
        (data) => {
          console.log(data);
          location.reload();
        }
      );
    }    else if (title === 'Certificate') {
      const certificateChicklet = new CertificateChicklets(content.certificate);
      const chicklets = [certificateChicklet];
      const certificateSection = new CertificateSection('Certificate', this.tokenstorageservice.getEmail(), 'delete', chicklets);
      this.downstreamBackendService.deleteCerificateDetails(certificateSection)
      .subscribe(
        (data) => {
          console.log(data);
          location.reload();
        }
      );
    }    else if (title === 'Experience') {
      const experienceChicklet = new Chicklets(content.experience);
      const chicklets = Array<Chicklets>();
      chicklets.push(experienceChicklet);

      const experienceSection = new ExperienceSection('Experience', this.tokenstorageservice.getEmail(), 'delete', chicklets);
      this.downstreamBackendService.deleteExperienceDetails(experienceSection)
      .subscribe(
        (data) => {
          console.log(data);
          location.reload();
        }
      );
    }
  }

  onDeleteCurrentLocation(content) {
    const currentLocation = new CurrentLocation(content.currentLocationId,
      content.currentcontent.currentCityName, content.currentStateName, content.currentPinCode);
    const locationChicklet = new LocationChicklets(currentLocation, null);
    const chicklets = Array<LocationChicklets>();
    chicklets.push(locationChicklet);

    const locationSection = new LocationSection('Location', this.tokenstorageservice.getEmail(), 'delete', chicklets);
    this.downstreamBackendService.deleteLocationDetails(locationSection)
    .subscribe(
      (data) => {
        console.log(data);
        location.reload();
      }
    );

  }

  onDeletePastLocation(pastLocation) {
   const deleteLocation = Array<PastLocation>();
   deleteLocation.push(pastLocation);
    const locationChicklet = new LocationChicklets(null, deleteLocation);
    const chicklets = Array<LocationChicklets>();
    chicklets.push(locationChicklet);

    const locationSection = new LocationSection('Location', this.tokenstorageservice.getEmail(), 'delete', chicklets);
    this.downstreamBackendService.deleteLocationDetails(locationSection)
    .subscribe(
      (data) => {
        console.log(data);
        location.reload();
      }
    );

  }
}
