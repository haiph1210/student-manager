package com.student_manager.entities;

import com.student_manager.enums.Gender;
import com.student_manager.core.BaseEntities;
import com.student_manager.enums.Role;
import com.student_manager.utils.GenerateTracking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "TBL_USER",
        uniqueConstraints = {
                @UniqueConstraint(name = "UNQ_CODE", columnNames = "userCode"),
                @UniqueConstraint(name = "UNQ_USERNAME_EMAIL_PHONE", columnNames = {"username", "email", "phoneNumber"}),
        },
        indexes = {
                @Index(name = "IDX_CODE",columnList = "userCode"),
                @Index(name = "IDX_USERNAME",columnList = "username"),
                @Index(name = "IDX_USERNAME_EMAIL_PHONE", columnList = "username, email, phoneNumber"),

        })
public class User extends BaseEntities {
    private String userCode = GenerateTracking.generateRandomString(20);
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String nation;
    private String dateOfBirth;
    private String citizenId;
    private String religion;
    private String nationality;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Role role;


    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Student student;
}
