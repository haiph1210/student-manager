package com.student_manager.services;

import com.student_manager.core.ApiException;
import com.student_manager.dtos.requests.SubjectRequest;
import com.student_manager.entities.Subject;

import java.util.List;

public interface SubjectService {
    List<Subject> findAll();

    Subject findById(Long id) throws ApiException;

    Subject create(SubjectRequest request);

    Subject update(Long id, SubjectRequest request) throws ApiException;

    boolean delete(Long id);
}
