package com.student_manager.controllers;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.dtos.requests.UserRequest;
import com.student_manager.dtos.responses.UserResponse;
import com.student_manager.entities.User;
import com.student_manager.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService subjectService, ModelMapper modelMapper) {
        this.userService = subjectService;
        this.modelMapper = modelMapper;
    }

    @GetMapping()
    public ResponseEntity<?> findAll() {
        List<User> users = userService.findAll();
        List<UserResponse> userResponses = users
                .stream()
                .map(item -> modelMapper.map(item, UserResponse.class))
                .collect(Collectors.toList());
        BaseResponse<?> baseResponse = new BaseResponse<>(userResponses);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws ApiException {
        User user = userService.findById(id);
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
        BaseResponse<?> baseResponse = new BaseResponse<>(userResponse);
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody UserRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(userService.create(request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UserRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(userService.update(id, request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/addOrUpdateUserToClass/user/{userId}/class/{classId}")
    public ResponseEntity<?> addOrUpdateUserToClass(@PathVariable Long userId, @PathVariable Long classId) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(userService.addOrUpdateUserToClass(userId, classId).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/removeUserToClass/user/{userId}")
    public ResponseEntity<?> removeUserToClass(@PathVariable Long userId) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(userService.removeUserToClass(userId).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
    @PostMapping("/resetPassword/{userId}")
        public ResponseEntity<?> resetPassword(@PathVariable Long userId) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(userService.resetPassword(userId));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
