package com.student_manager.controllers;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.dtos.requests.SubjectRequest;
import com.student_manager.dtos.requests.UserRequest;
import com.student_manager.services.SubjectService;
import com.student_manager.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService subjectService;

    public UserController(UserService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping()
    public ResponseEntity<?> findAll() {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.findAll());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.findById(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody UserRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.create(request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UserRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.update(id, request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/addOrUpdateUserToClass/{classId}")
    public ResponseEntity<?> addOrUpdateUserToClass(@PathVariable Long classId) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.addOrUpdateUserToClass(classId).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/removeUserToClass")
    public ResponseEntity<?> removeUserToClass() throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.removeUserToClass().getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
