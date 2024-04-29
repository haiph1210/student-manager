package com.student_manager.services;

import com.student_manager.core.ApiException;
import com.student_manager.dtos.requests.UserRequest;
import com.student_manager.entities.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findById(Long id) throws ApiException;

    User findByUserCode(String userCode) throws ApiException;

    User findByUsername(String username) throws ApiException;

    User findByUsernameAndEmailAndPhoneNumber(String username, String email, String phoneNumber) throws ApiException;

    User create(UserRequest request) throws ApiException;

    User createAdmin(UserRequest request) throws ApiException;

    User update(Long id, UserRequest request) throws ApiException;
}
