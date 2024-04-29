package com.student_manager.services;

import com.student_manager.core.ApiException;
import com.student_manager.dtos.requests.MajorRequest;
import com.student_manager.entities.Major;

import java.util.List;

public interface MajorService {
    List<Major> findAll();

    Major findById(Long id) throws ApiException;

    Major create(MajorRequest request) throws ApiException;

    Major update(Long id, MajorRequest request) throws ApiException;

    boolean delete(Long id);
}
