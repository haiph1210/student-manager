package com.student_manager.controllers;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.dtos.requests.ClassRequest;
import com.student_manager.services.ClassService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/class")
public class ClassController {
    private final ClassService classService;

    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping()
    public ResponseEntity<?> findAll() {
        BaseResponse<?> baseResponse = new BaseResponse<>(classService.findAll());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(classService.findById(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ClassRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(classService.create(request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ClassRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(classService.update(id, request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(classService.delete(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
