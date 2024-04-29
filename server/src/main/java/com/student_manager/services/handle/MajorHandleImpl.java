package com.student_manager.services.handle;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseService;
import com.student_manager.core.ERROR;
import com.student_manager.entities.Major;
import com.student_manager.repositories.MajorRepository;
import com.student_manager.utils.MessageUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Log4j2
public class MajorHandleImpl extends BaseService {
    private final MajorRepository majorRepository;

    public MajorHandleImpl(MajorRepository majorRepository) {
        this.majorRepository = majorRepository;
    }

    public Major findById(Long id) throws ApiException {
        return majorRepository.findById(id)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("ID: %s", id))));
    }

    public List<Major> findAllMajorByIds(List<Long> ids) {
        return majorRepository.findAllById(ids);
    }
}
