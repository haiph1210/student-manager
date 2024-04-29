package com.student_manager.services.impl;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseService;
import com.student_manager.core.ERROR;
import com.student_manager.dtos.requests.ScheduleRequest;
import com.student_manager.entities.Class;
import com.student_manager.entities.Schedule;
import com.student_manager.entities.Subject;
import com.student_manager.repositories.ScheduleRepository;
import com.student_manager.services.ClassService;
import com.student_manager.services.SubjectService;
import com.student_manager.utils.DataUtils;
import com.student_manager.utils.MessageUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class ScheduleServiceImpl extends BaseService implements com.student_manager.services.ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final ClassService classService;
    private final SubjectService subjectService;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, ClassService classService,
                               SubjectService subjectService) {
        this.scheduleRepository = scheduleRepository;
        this.classService = classService;
        this.subjectService = subjectService;
    }

    @Override
    public List<Schedule> findAll() {
        return scheduleRepository.findAll();
    }

    @Override
    public Schedule findById(Long id) throws ApiException {
        return scheduleRepository.findById(id)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("ID: %s", id))));
    }

    @Override
    public Schedule create(ScheduleRequest request) throws ApiException {
        Schedule schedule = this.handleSchedule(null, request);
        return scheduleRepository.save(schedule);
    }

    @Override
    public Schedule update(Long id, ScheduleRequest request) throws ApiException {
        Schedule oldSchedule = this.findById(id);
        Schedule schedule = this.handleSchedule(oldSchedule, request);
        return scheduleRepository.save(schedule);
    }

    @Override
    public boolean delete(Long id) {
        boolean isExists = scheduleRepository.existsById(id);
        if (isExists) {
            scheduleRepository.deleteById(id);
        }
        return isExists;
    }


    private Schedule handleSchedule(Schedule oldSchedule, ScheduleRequest request) throws ApiException {
        Schedule schedule = modelMapper.map(request, Schedule.class);
        Class aClass = classService.findById(request.getClassId());
        Subject subject = subjectService.findById(request.getSubjectId());
        schedule.setAClass(aClass);
        schedule.setSubject(subject);
        if (!DataUtils.isNull(oldSchedule)) {
            schedule.setId(oldSchedule.getId());
        }
        return schedule;
    }
}
