package com.student_manager.services;

import com.student_manager.core.ApiException;
import com.student_manager.dtos.requests.FacultyRequest;
import com.student_manager.entities.Faculty;

import java.util.List;

public interface FacultyService {
    List<Faculty> findAll();

    Faculty findById(Long id) throws ApiException;

    Faculty create(FacultyRequest request);

    Faculty update(Long id, FacultyRequest request) throws ApiException;

    Boolean delete(Long id);
}
