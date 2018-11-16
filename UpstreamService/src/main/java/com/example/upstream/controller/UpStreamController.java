package com.example.upstream.controller;

import com.example.upstream.domain.certificate.Certificate;
import com.example.upstream.domain.education.Education;
import com.example.upstream.domain.experience.Experience;
import com.example.upstream.domain.location.Location;
import com.example.upstream.domain.project.Section;
import org.apache.kafka.common.KafkaException;
import org.apache.kafka.common.errors.TimeoutException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@CrossOrigin
@RestController
@RequestMapping("${controller.base}")
public class UpStreamController {
private KafkaTemplate<String,Education> kafkaTemplateEducation;
private KafkaTemplate<String, com.example.upstream.domain.skills.Section> kafkaTemplateSkills;
private KafkaTemplate<String, Location>kafkaTemplateLocation;
private KafkaTemplate<String, Section>kafkaTemplateProject;
private KafkaTemplate<String, Experience>kafkaTemplateExperience;
private KafkaTemplate<String,Certificate>kafkaTemplateCertificate;

    @Autowired
    public UpStreamController(KafkaTemplate<String, Education> kafkaTemplateEducation, KafkaTemplate<String, com.example.upstream.domain.skills.Section> kafkaTemplateSkills, KafkaTemplate<String, Location> kafkaTemplateLocation, KafkaTemplate<String, Section> kafkaTemplateProject, KafkaTemplate<String, Experience> kafkaTemplateExperience, KafkaTemplate<String, Certificate> kafkaTemplateCertificate) {
        this.kafkaTemplateEducation = kafkaTemplateEducation;
        this.kafkaTemplateSkills = kafkaTemplateSkills;
        this.kafkaTemplateLocation = kafkaTemplateLocation;
        this.kafkaTemplateProject = kafkaTemplateProject;
        this.kafkaTemplateExperience = kafkaTemplateExperience;
        this.kafkaTemplateCertificate = kafkaTemplateCertificate;
    }

//Creating topics
private static final String  TOPIC ="education";
private static final String TOPIC1 = "skills";
private static final String TOPIC2 = "location";
private static final String TOPIC3 = "project";
private static final String TOPIC4 = "experience";
private static final String TOPIC5 = "certificate";

    @PostMapping("${controller.education}")
    public ResponseEntity<?> newEducation(@RequestBody Education education){
        ResponseEntity responseEntity = null;
        try {
            education.setOperationType("add");
            responseEntity = new ResponseEntity(education, HttpStatus.OK);
            kafkaTemplateEducation.send(TOPIC, education).get();

        }
        catch (TimeoutException e){
            responseEntity = new ResponseEntity(education,HttpStatus.BAD_REQUEST);
        }
        catch (KafkaException e){
            responseEntity = new ResponseEntity(education,HttpStatus.BAD_REQUEST);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return responseEntity;
    }
    @PutMapping("${controller.education}")
    public ResponseEntity<?> updateEducation(@RequestBody Education education){
        education.setOperationType("update");
        ResponseEntity responseEntity = new ResponseEntity(education,HttpStatus.OK);
        kafkaTemplateEducation.send(TOPIC,education);
        return responseEntity;
    }
    @DeleteMapping("${controller.education}")
    public ResponseEntity<?> deleteEducation(@RequestBody Education education){
        education.setOperationType("delete");
        ResponseEntity responseEntity = new ResponseEntity(education,HttpStatus.OK);
        kafkaTemplateEducation.send(TOPIC,education);
        return responseEntity;
    }
    @PostMapping("${controller.location}")
    public ResponseEntity<?> newLocation(@RequestBody Location location)
    {
        location.setOperationType("add");
        ResponseEntity responseEntity = new ResponseEntity(location,HttpStatus.OK);
        kafkaTemplateLocation.send(TOPIC2,location);
        return responseEntity;

    }
    @PutMapping("${controller.location}")
    public ResponseEntity<?> updateLocation(@RequestBody Location location){
        location.setOperationType("update");
        ResponseEntity responseEntity = new ResponseEntity(location,HttpStatus.OK);
        kafkaTemplateLocation.send(TOPIC2,location);
        return responseEntity;
    }
    @DeleteMapping("${controller.location}")
    public ResponseEntity<?> deleteLocation(@RequestBody Location location){
        location.setOperationType("delete");
        ResponseEntity responseEntity = new ResponseEntity(location,HttpStatus.OK);
        kafkaTemplateLocation.send(TOPIC2,location);
        return responseEntity;
    }

    @PostMapping("${controller.skills}")
    public ResponseEntity<?> newSkills(@RequestBody com.example.upstream.domain.skills.Section section)
    {

        section.setOperationType("add");
        ResponseEntity responseEntity = new ResponseEntity(section,HttpStatus.OK);
        kafkaTemplateSkills.send(TOPIC1,section);
        return responseEntity;

    }
    @PutMapping("${controller.skills}")
    public ResponseEntity<?> updateSkills(@RequestBody com.example.upstream.domain.skills.Section section)
    {
        section.setOperationType("update");
        ResponseEntity responseEntity = new ResponseEntity(section,HttpStatus.OK);
        kafkaTemplateSkills.send(TOPIC1,section);
        return responseEntity;

    }
    @DeleteMapping("${controller.skills}")
    public ResponseEntity<?> deleteSkills(@RequestBody com.example.upstream.domain.skills.Section section)
    {
        section.setOperationType("delete");

        ResponseEntity responseEntity = new ResponseEntity(section,HttpStatus.OK);
        kafkaTemplateSkills.send(TOPIC1,section);
        return responseEntity;

    }
    @PostMapping("${controller.project}")
    public ResponseEntity<?> newProject(@RequestBody Section section)
    {
        section.setOperationType("add");
        ResponseEntity responseEntity = new ResponseEntity(section,HttpStatus.OK);
        kafkaTemplateProject.send(TOPIC3, section);
        return responseEntity;

    }
    @PutMapping("${controller.project}")
    public ResponseEntity<?> updateProject(@RequestBody Section section)
    {
        section.setOperationType("update");
        ResponseEntity responseEntity = new ResponseEntity(section,HttpStatus.OK);
        kafkaTemplateProject.send(TOPIC3, section);
        return responseEntity;

    }
    @DeleteMapping("${controller.project}")
    public ResponseEntity<?> deleteProject(@RequestBody Section section)
    {
        section.setOperationType("delete");
        ResponseEntity responseEntity = new ResponseEntity(section,HttpStatus.OK);
        kafkaTemplateProject.send(TOPIC3, section);
        return responseEntity;

    }
    @PostMapping("${controller.experience}")
    public ResponseEntity<?> newExperience(@RequestBody Experience experience)
    {
        experience.setOperationType("add");
        ResponseEntity responseEntity = new ResponseEntity(experience,HttpStatus.OK);
        kafkaTemplateExperience.send(TOPIC4,experience);
        return responseEntity;

    }
    @PutMapping("${controller.experience}")
    public ResponseEntity<?> updateExperience(@RequestBody Experience experience)
    {
        experience.setOperationType("update");
        ResponseEntity responseEntity = new ResponseEntity(experience,HttpStatus.OK);
        kafkaTemplateExperience.send(TOPIC4,experience);
        return responseEntity;

    }
    @DeleteMapping("${controller.experience}")
    public ResponseEntity<?> deleteExperience(@RequestBody Experience experience)
    {
        experience.setOperationType("delete");
        ResponseEntity responseEntity = new ResponseEntity(experience,HttpStatus.OK);
        kafkaTemplateExperience.send(TOPIC4,experience);
        return responseEntity;

    }
    @PostMapping("${controller.certificate}")
    public ResponseEntity<?> newCertificate(@RequestBody Certificate certificate)
    {
        certificate.setOperationType("add");
        ResponseEntity responseEntity = new ResponseEntity(certificate,HttpStatus.OK);
        kafkaTemplateCertificate.send(TOPIC5,certificate);
        return responseEntity;

    }
    @PutMapping("${controller.certificate}")
    public ResponseEntity<?> updateCertificate(@RequestBody Certificate certificate)
    {
        certificate.setOperationType("update");
        ResponseEntity responseEntity = new ResponseEntity(certificate,HttpStatus.OK);
        kafkaTemplateCertificate.send(TOPIC5,certificate);
        return responseEntity;

    }
    @DeleteMapping("${controller.certificate}")
    public ResponseEntity<?> deleteCertificate(@RequestBody Certificate certificate)
    {
        certificate.setOperationType("delete");
        ResponseEntity responseEntity = new ResponseEntity(certificate,HttpStatus.OK);
        kafkaTemplateCertificate.send(TOPIC5,certificate);
        return responseEntity;

    }
}
