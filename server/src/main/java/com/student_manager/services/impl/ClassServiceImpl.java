package com.student_manager.services.impl;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseService;
import com.student_manager.core.ERROR;
import com.student_manager.dtos.requests.ClassRequest;
import com.student_manager.entities.Class;
import com.student_manager.entities.Major;
import com.student_manager.repositories.ClassRepository;
import com.student_manager.services.MajorService;
import com.student_manager.utils.DataUtils;
import com.student_manager.utils.MessageUtils;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class ClassServiceImpl extends BaseService implements com.student_manager.services.ClassService {
    private final ClassRepository classRepository;
    private final MajorService majorService;

    public ClassServiceImpl(ClassRepository classRepository, ModelMapper modelMapper, MajorService majorService) {
        this.classRepository = classRepository;
        this.modelMapper = modelMapper;
        this.majorService = majorService;
    }

    @Override
    public List<Class> findAll() {
        return classRepository.findAll();
    }

    @Override
    public Class findById(Long id) throws ApiException {
        return classRepository.findById(id)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("ID: ", id))));
    }

    @Override
    public Class create(ClassRequest request) throws ApiException {
        Class aClass = this.handleClass(null, request);
        return classRepository.save(aClass);
    }

    @Override
    public Class update(Long id, ClassRequest request) throws ApiException {
        Class oldClass = this.findById(id);
        Class aClass = this.handleClass(oldClass, request);
        return classRepository.save(aClass);
    }

    @Override
    public boolean delete(Long id) {
        boolean isExists = classRepository.existsById(id);
        if (isExists) {
            classRepository.deleteById(id);
        }
        return isExists;
    }

    private Class handleClass(Class oldClass, ClassRequest request) throws ApiException {
        Class aClass = modelMapper.map(request, Class.class);
        Major major = null;
        if (!DataUtils.isNull(request.getMajorId())) {
            major = majorService.findById(request.getMajorId());
        }
        aClass.setMajor(major);
        if (!DataUtils.isNull(oldClass)) {
            aClass.setId(oldClass.getId());
        }

        return aClass;
    }
}
