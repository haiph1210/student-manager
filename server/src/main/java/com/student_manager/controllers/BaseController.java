package com.student_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/base")
public class BaseController {
    @GetMapping
    public ResponseEntity<?> getHelloWorld(@RequestParam String param) {
        return new ResponseEntity<>(param, HttpStatus.OK);
    }
}
