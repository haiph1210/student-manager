package com.student_manager.services.impl;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseService;
import com.student_manager.core.ERROR;
import com.student_manager.dtos.requests.UserRequest;
import com.student_manager.entities.Class;
import com.student_manager.entities.User;
import com.student_manager.enums.Role;
import com.student_manager.mapper.impl.UserMapper;
import com.student_manager.repositories.UserRepository;
import com.student_manager.services.ClassService;
import com.student_manager.utils.DataUtils;
import com.student_manager.utils.MessageUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Log4j2
public class UserServiceImpl extends BaseService implements com.student_manager.services.UserService {
    private final UserRepository userRepository;
    private final ClassService classService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, ClassService classService, PasswordEncoder passwordEncoder,
                           UserMapper userMapper) {
        this.userRepository = userRepository;
        this.classService = classService;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) throws ApiException {
        return userRepository.findById(id)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("ID: %s", id))));
    }

    @Override
    public User findByUserCode(String userCode) throws ApiException {
        return userRepository.findByUserCode(userCode)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("USERCODE: %s", userCode))));
    }

    @Override
    public User findByUsername(String username) throws ApiException {
        return userRepository.findByUsername(username)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("USERNAME: %s", username))));
    }

    @Override
    public User findByUsernameAndEmailAndPhoneNumber(String username, String email, String phoneNumber) throws ApiException {
        return userRepository.findByUsernameAndEmailAndPhoneNumber(username, email, phoneNumber)
                .orElseThrow(()
                        -> new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_NOT_EXISTS, String.format("USERNAME: %s , EMAIL : %s , PHONE : %s", username, email, phoneNumber))));
    }

    @Override
    public User create(UserRequest request) throws ApiException {
        User user = this.handleUser(null, request);
        return userRepository.save(user);
    }

    @Override
    public User createAdmin(UserRequest request) throws ApiException {
        User user = this.handleUser(null, request);
        user.setRole(Role.ADMIN);
        return userRepository.save(user);
    }

    @Override
    public User update(Long id, UserRequest request) throws ApiException {
        User oldUser = this.findById(id);
        User user = this.handleUser(oldUser, request);
        return userRepository.save(user);
    }

    private User handleUser(User oldUser, UserRequest request) throws ApiException {
//        User user = modelMapper.map(request, User.class);
        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        //passwordEncoder
        if (!DataUtils.isNull(oldUser)) {
            user.setId(oldUser.getId());
            user.setUserCode(oldUser.getUserCode());
            user.setUsername(oldUser.getUsername());
            user.setPassword(oldUser.getPassword());
        } else {
            boolean isExistByUsername = userRepository.existsByUsername(request.getUsername());
            boolean isExistsByUsernameAndEmailAndPhoneNumber = userRepository.existsByUsernameAndEmailAndPhoneNumber(request.getUsername(), request.getEmail(), request.getPhoneNumber());
            if (isExistByUsername) {
                throw new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_EXISTS,
                                String.format("USERNAME: %s", request.getUsername())));
            }
            if (isExistsByUsernameAndEmailAndPhoneNumber) {
                throw new ApiException(ERROR.INVALID_REQUEST,
                        this.translator.toLocaleByFormatString(MessageUtils.GLOBAL_MESSAGE_EXISTS,
                                String.format("USERNAME: %s , EMAIL : %s , PHONE : %s", request.getUsername(), request.getEmail(), request.getPhoneNumber())));

            }
        }

//        Student student = Student
//                .builder()
//                .user(user)
//                .yearOfAdmission(request.getYearOfAdmission())
//                .build();
//        user.setStudent(student);
        return user;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public User addOrUpdateUserToClass(Long userId, Long classId) throws ApiException {
        Class aClass = classService.findById(classId);
        User user = findById(userId);
        user.setAClass(null);
        user.setAClass(aClass);
        return userRepository.save(user);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public User removeUserToClass(Long userId) throws ApiException {
        User user = this.getUser();
        user.setAClass(null);
        return userRepository.save(user);
    }
}
