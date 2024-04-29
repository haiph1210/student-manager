package com.student_manager.services.impl;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseService;
import com.student_manager.dtos.requests.MajorRequest;
import com.student_manager.entities.Class;
import com.student_manager.entities.Faculty;
import com.student_manager.entities.Major;
import com.student_manager.repositories.MajorRepository;
import com.student_manager.services.handle.ClassHandleImpl;
import com.student_manager.services.handle.FacultyHandleImpl;
import com.student_manager.services.handle.MajorHandleImpl;
import com.student_manager.utils.DataUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class MajorServiceImpl extends BaseService implements com.student_manager.services.MajorService {
    private final MajorRepository majorRepository;
    private final MajorHandleImpl majorHandle;
    private final FacultyHandleImpl facultyHandle;
    private final ClassHandleImpl classHandle;

    public MajorServiceImpl(MajorRepository majorRepository,
                            MajorHandleImpl majorHandle, FacultyHandleImpl facultyHandle,
                            ClassHandleImpl classHandle) {
        this.majorRepository = majorRepository;
        this.majorHandle = majorHandle;
        this.facultyHandle = facultyHandle;
        this.classHandle = classHandle;
    }

    public List<Major> findAll() {
        return majorRepository.findAll();
    }

    @Override
    public Major findById(Long id) throws ApiException {
        return majorHandle.findById(id);
    }

    @Override
    public Major create(MajorRequest request) throws ApiException {
        Major major = this.handleMajor(null, request);
        return majorRepository.save(major);
    }

    @Override
    public Major update(Long id, MajorRequest request) throws ApiException {
        Major oldMajor = this.findById(id);
        Major major = this.handleMajor(oldMajor, request);
        return majorRepository.save(major);
    }

    @Override
    public boolean delete(Long id) {
        boolean isExists = majorRepository.existsById(id);
        if (isExists) {
            majorRepository.deleteById(id);
        }
        return isExists;
    }

    private Major handleMajor(Major oldMajor, MajorRequest request) throws ApiException {
        Major major = modelMapper.map(request, Major.class);
        Faculty faculty = null;
        List<Class> classes = new ArrayList<>();
        if (!DataUtils.isNull(request.getFacultyId())) {
            faculty = facultyHandle.findById(request.getFacultyId());
        }
//        if (!DataUtils.isNull(request.getClassDto())) {
//            List<Long> classIds = request.getClassDto().getClassIds();
//            if (!classIds.isEmpty()) {
//                classes.addAll(classHandle.findAllByIds(classIds));
//            } else {
//                List<ClassRequest> classRequests = request.getClassDto().getClassRequests();
//                if (!DataUtils.isNull(classRequests) && !classRequests.isEmpty()) {
//                    classes.addAll(classRequests
//                            .stream()
//                            .map(item -> modelMapper.map(item, Class.class))
//                            .collect(Collectors.toList()));
//                }
//            }
//        }

        major.setFaculty(faculty);
        major.setClasses(classes);

        if (!DataUtils.isNull(oldMajor)) {
            major.setId(oldMajor.getId());
        }
        return major;
    }
}