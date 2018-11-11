package com.stackroute.DownstreamService.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.processing.Generated;
import javax.validation.constraints.NotNull;
import java.util.List;

@Document(collection="Employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    @NotNull
    private String userId;

    @NotNull
    private String email;

//    private String employeeName;
    @NotNull
    private String name;

    private List<Education> educations;

    private List<Skills> skills;

   /* String[] skills;
    String[] experience;
    String[] project;
    String[] locations;
    String[] qualifications;
*/}
