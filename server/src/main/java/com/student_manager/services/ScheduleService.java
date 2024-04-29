package com.student_manager.services;

import com.student_manager.core.ApiException;
import com.student_manager.dtos.requests.ScheduleRequest;
import com.student_manager.entities.Schedule;

import java.util.List;

public interface ScheduleService {
    List<Schedule> findAll();

    Schedule findById(Long id) throws ApiException;

    Schedule create(ScheduleRequest request) throws ApiException;

    Schedule update(Long id, ScheduleRequest request) throws ApiException;

    boolean delete(Long id);
}
