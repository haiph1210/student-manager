package com.student_manager.services.handle;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseService;
import com.student_manager.core.ERROR;
import com.student_manager.entities.Faculty;
import com.student_manager.repositories.FacultyRepository;
import com.student_manager.utils.MessageUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class FacultyHandleImpl extends BaseService {
    private final FacultyRepository facultyRepository;

    public FacultyHandleImpl(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    public Faculty findById(Long id) throws ApiException {
        return facultyRepository.findById(id)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("ID: %s", id))));
    }
}
