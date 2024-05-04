//package com.student_manager.services.impl;
//
//import com.student_manager.core.ApiException;
//import com.student_manager.core.BaseService;
//import com.student_manager.core.ERROR;
//import com.student_manager.dtos.requests.StudentRequest;
//import com.student_manager.entities.Class;
//import com.student_manager.entities.Student;
//import com.student_manager.entities.User;
//import com.student_manager.repositories.StudentRepository;
//import com.student_manager.services.ClassService;
//import com.student_manager.services.UserService;
//import com.student_manager.utils.DataUtils;
//import com.student_manager.utils.MessageUtils;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.stereotype.Service;
//
//import java.util.Calendar;
//import java.util.Date;
//
//@Service
//@Log4j2
//public class StudentServiceImpl extends BaseService implements com.student_manager.services.StudentService {
//    private final StudentRepository studentRepository;
//    private final ClassService classService;
//    private final UserService userService;
//
//    public StudentServiceImpl(StudentRepository studentRepository, ClassService classService,
//                              UserService userService) {
//        this.studentRepository = studentRepository;
//        this.classService = classService;
//        this.userService = userService;
//    }
//
//    @Override
//    public Student findById(Long id) throws ApiException {
//        return studentRepository.findById(id)
//                .orElseThrow(()
//                        -> new ApiException(ERROR.INVALID_REQUEST,
//                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("ID: ", id))));
//
//    }
//
//    @Override
//    public Student addToClass(StudentRequest request) throws ApiException {
//        Student student = this.handleStudent(null, request);
//        return studentRepository.save(student);
//    }
//
//
//    @Override
//    public Student changeClass(Long id, StudentRequest request) throws ApiException {
//        Student oldStudent = this.findById(id);
//        Student student = this.handleStudent(oldStudent, request);
//        return studentRepository.save(student);
//    }
//
//    private Student handleStudent(Student oldStudent, StudentRequest request) throws ApiException {
//        Student student = modelMapper.map(request, Student.class);
//        User user = userService.findByUserCode(request.getUserCode());
//        Class aClass = classService.findById(request.getClassId());
//        Float yearLearn = aClass.getMajor().getFaculty().getTotalYearLearn();
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(request.getYearOfAdmission());
//        calendar.add(Calendar.YEAR, yearLearn.intValue());
//        Date endDate = calendar.getTime();
//
//        student.setUser(user);
//        student.setAClass(aClass);
//        student.setGraduationYear(endDate);
//
//        if (!DataUtils.isNull(oldStudent)) {
//            student.setId(oldStudent.getId());
//        }
//        return student;
//    }
//
////    public Student removeFromClass(StudentRequest request) {
////        Student student = this.handleStudent(null, request);
////        return studentRepository.save(student);
////    }
//
//
//}
