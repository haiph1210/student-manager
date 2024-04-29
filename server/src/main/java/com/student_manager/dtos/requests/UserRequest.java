package com.student_manager.dtos.requests;

import com.student_manager.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
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
    private Gender gender;
    private Date yearOfAdmission;

}
