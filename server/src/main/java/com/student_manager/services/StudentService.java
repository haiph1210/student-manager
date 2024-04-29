package com.student_manager.services;

import com.student_manager.core.ApiException;
import com.student_manager.dtos.requests.StudentRequest;
import com.student_manager.entities.Student;

public interface StudentService {
    Student findById(Long id) throws ApiException;

    Student addToClass(StudentRequest request) throws ApiException;

    Student changeClass(Long id, StudentRequest request) throws ApiException;
}
