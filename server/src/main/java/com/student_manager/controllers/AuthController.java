package com.student_manager.controllers;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.dtos.requests.LoginRequest;
import com.student_manager.dtos.requests.UserRequest;
import com.student_manager.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) throws ApiException {
        BaseResponse<?> response = new BaseResponse<>(authenticationService.login(request));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequest request) throws ApiException {
        BaseResponse<?> response = new BaseResponse<>(authenticationService.register(request, false));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody UserRequest request) throws ApiException {
        BaseResponse<?> response = new BaseResponse<>(authenticationService.register(request, true));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
