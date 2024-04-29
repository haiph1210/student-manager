package com.student_manager.controllers;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.dtos.requests.SubjectRequest;
import com.student_manager.services.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subjects")
public class SubjectController {
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
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
    public ResponseEntity<?> create(@RequestBody SubjectRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.create(request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody SubjectRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.update(id, request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(subjectService.delete(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
