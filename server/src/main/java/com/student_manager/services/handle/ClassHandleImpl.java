package com.student_manager.services.handle;

import com.student_manager.core.BaseService;
import com.student_manager.entities.Class;
import com.student_manager.repositories.ClassRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Log4j2
public class ClassHandleImpl extends BaseService {
    private final ClassRepository classRepository;

    public ClassHandleImpl(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    public List<Class> findAllByIds(List<Long> ids) {
        return classRepository.findAllById(ids);
    }
}
