package com.student_manager.controllers;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.dtos.requests.ScheduleRequest;
import com.student_manager.services.ScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService subjectService) {
        this.scheduleService = subjectService;
    }

    @GetMapping()
    public ResponseEntity<?> findAll() {
        BaseResponse<?> baseResponse = new BaseResponse<>(scheduleService.findAll());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(scheduleService.findById(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ScheduleRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(scheduleService.create(request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ScheduleRequest request) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(scheduleService.update(id, request).getId());
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ApiException {
        BaseResponse<?> baseResponse = new BaseResponse<>(scheduleService.delete(id));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
