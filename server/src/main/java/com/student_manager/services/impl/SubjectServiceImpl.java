package com.student_manager.services.impl;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseService;
import com.student_manager.core.ERROR;
import com.student_manager.dtos.requests.SubjectRequest;
import com.student_manager.entities.Subject;
import com.student_manager.repositories.SubjectRepository;
import com.student_manager.utils.DataUtils;
import com.student_manager.utils.MessageUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class SubjectServiceImpl extends BaseService implements com.student_manager.services.SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override
    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    @Override
    public Subject findById(Long id) throws ApiException {
        return subjectRepository.findById(id)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("ID: %s", id))));
    }

    @Override
    public Subject create(SubjectRequest request) {
        Subject subject = this.handleSubject(null, request);
        return subjectRepository.save(subject);
    }

    @Override
    public Subject update(Long id, SubjectRequest request) throws ApiException {
        Subject oldSubject = this.findById(id);
        Subject subject = this.handleSubject(oldSubject, request);
        return subjectRepository.save(subject);
    }

    @Override
    public boolean delete(Long id) {
        boolean isExists = subjectRepository.existsById(id);
        if (isExists) {
            subjectRepository.deleteById(id);
        }
        return isExists;
    }

    private Subject handleSubject(Subject oldSubject, SubjectRequest request) {
        Subject subject = modelMapper.map(request, Subject.class);
        if (!DataUtils.isNull(oldSubject)) {
            subject.setId(oldSubject.getId());
        }
        return subject;
    }
}
