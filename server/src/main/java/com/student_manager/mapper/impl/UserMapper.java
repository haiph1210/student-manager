package com.student_manager.mapper.impl;

import com.student_manager.dtos.requests.UserRequest;
import com.student_manager.entities.User;
import com.student_manager.mapper.SupperMappers;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper extends SupperMappers<User, UserRequest> {
}
