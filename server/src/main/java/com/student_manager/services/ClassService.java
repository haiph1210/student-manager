package com.student_manager.services;

import com.student_manager.core.ApiException;
import com.student_manager.dtos.requests.ClassRequest;
import com.student_manager.entities.Class;

import java.util.List;

public interface ClassService {
    List<Class> findAll();

    Class findById(Long id) throws ApiException;

    Class create(ClassRequest request) throws ApiException;

    Class update(Long id, ClassRequest request) throws ApiException;

    boolean delete(Long id);
}
