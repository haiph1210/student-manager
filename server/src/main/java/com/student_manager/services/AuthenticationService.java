package com.student_manager.services;

import com.student_manager.core.ApiException;
import com.student_manager.dtos.requests.LoginRequest;
import com.student_manager.dtos.requests.UserRequest;
import com.student_manager.dtos.responses.AuthenticationResponse;
import com.student_manager.entities.User;

public interface AuthenticationService {
    AuthenticationResponse login(LoginRequest request);

    User register(UserRequest request, boolean isAdmin) throws ApiException;
}
