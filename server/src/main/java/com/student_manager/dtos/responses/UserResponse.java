package com.student_manager.dtos.responses;

import com.student_manager.entities.Class;
import com.student_manager.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
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
    private Gender gender;
    private Class aClass;

    private Long id;
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
    private String updatedBy;
}
