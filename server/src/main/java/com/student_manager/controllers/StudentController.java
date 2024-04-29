package com.student_manager.controllers;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.dtos.requests.StudentRequest;
import com.student_manager.dtos.requests.SubjectRequest;
import com.student_manager.services.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
//
//    @GetMapping()
//    public ResponseEntity<?> findAll() {
//        BaseResponse<?> baseResponse = new BaseResponse<>(studentService.findAll());
//        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(studentService.findById(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
//    @GetMapping("/{code}")
//    public ResponseEntity<?> findByUserCode(@PathVariable String code) throws ApiException {
//        BaseResponse<?> baseResponse = new BaseResponse<>(studentService.findById(id));
//        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
//    }

    @PostMapping
    public ResponseEntity<?> addToClas(@RequestBody StudentRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(studentService.addToClass(request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> changeClass(@PathVariable Long id, @RequestBody StudentRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(studentService.changeClass(id, request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
