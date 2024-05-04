package com.student_manager.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.student_manager.core.BaseEntities;
import com.student_manager.utils.GenerateTracking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "TBL_STUDENT"
//        ,
//        uniqueConstraints = {
//                @UniqueConstraint(name = "UNQ_CODE",columnNames = {"userCode"})
//        },
//        indexes = {
//                @Index(name = "IDX_CODE",columnList = "userCode")
//        }
)
public class Student extends BaseEntities {
//    private String userCode = GenerateTracking.generateRandomString(20);

    private Date yearOfAdmission;

    private Date graduationYear;

//    @OneToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    @JsonIgnoreProperties("student")
//    private User user;

//    @ManyToOne
//    @JoinColumn(name = "class_id")
//    @JsonIgnoreProperties("students")
//    private Class aClass;
}
