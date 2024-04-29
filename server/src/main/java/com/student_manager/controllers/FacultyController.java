package com.student_manager.controllers;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.dtos.requests.FacultyRequest;
import com.student_manager.dtos.requests.MajorRequest;
import com.student_manager.services.FacultyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/faculties")
public class FacultyController {
    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping()
    public ResponseEntity<?> findAll() {
        BaseResponse<?> baseResponse = new BaseResponse<>(facultyService.findAll());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(facultyService.findById(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody FacultyRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(facultyService.create(request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody FacultyRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(facultyService.update(id, request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(facultyService.delete(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}

