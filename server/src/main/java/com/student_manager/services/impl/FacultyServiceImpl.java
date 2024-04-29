package com.student_manager.services.impl;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseService;
import com.student_manager.dtos.requests.FacultyRequest;
import com.student_manager.entities.Faculty;
import com.student_manager.entities.Major;
import com.student_manager.repositories.FacultyRepository;
import com.student_manager.services.handle.FacultyHandleImpl;
import com.student_manager.utils.DataUtils;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class FacultyServiceImpl extends BaseService implements com.student_manager.services.FacultyService {
    private final FacultyRepository facultyRepository;
    private final FacultyHandleImpl facultyHandle;

    public FacultyServiceImpl(FacultyRepository facultyRepository, ModelMapper modelMapper,
                              FacultyHandleImpl facultyHandle) {
        this.facultyRepository = facultyRepository;
        this.modelMapper = modelMapper;
        this.facultyHandle = facultyHandle;
    }

    @Override
    public List<Faculty> findAll() {
        return facultyRepository.findAll();
    }

    @Override
    public Faculty findById(Long id) throws ApiException {
        return facultyHandle.findById(id);
    }

    @Override
    public Faculty create(FacultyRequest request) {
        Faculty addFaculty = this.handleFaculty(null, request);
        return facultyRepository.save(addFaculty);
    }

    @Override
    public Faculty update(Long id, FacultyRequest request) throws ApiException {
        Faculty oldFaculty = this.findById(id);
        Faculty addFaculty = this.handleFaculty(oldFaculty, request);
        return facultyRepository.save(addFaculty);
    }

    @Override
    public Boolean delete(Long id) {
        boolean isExists = this.facultyRepository.existsById(id);
        if (isExists) {
            this.facultyRepository.deleteById(id);
        }
        return isExists;
    }

    private Faculty handleFaculty(Faculty oldFaculty, FacultyRequest request) {

        List<Major> majors = new ArrayList<>();
//        if (!DataUtils.isNull(request.getMajorDto())) {
//            List<Long> majorIds = request.getMajorDto().getMajorIds();
//            if (!DataUtils.isNull(majorIds) && !majorIds.isEmpty()) {
//                majors.addAll(majorHandle.findAllMajorByIds(majorIds));
//                if (majors.size() == majorIds.size()) {
//                    log.info("All majors found.");
//                } else {
//                    log.error("Some majors are missing.");
//                }
//            } else {
//                if (!DataUtils.isNull(request.getMajorDto().getMajors())) {
//                    List<MajorRequest> majorRequests = request.getMajorDto().getMajors();
//                    majors.addAll(majorRequests.stream()
//                            .map(item -> modelMapper.map(item, Major.class))
//                            .collect(Collectors.toList()));
//                }
//            }
//        }
//        log.info("major: {}", majors.toString());
        Faculty faculty = modelMapper.map(request, Faculty.class);
        faculty.setMajors(majors);
        if (!DataUtils.isNull(oldFaculty)) {
            faculty.setId(oldFaculty.getId());
        }
        log.info("faculty: {}", faculty.toString());
        return faculty;
    }

}
