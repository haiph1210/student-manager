package com.student_manager.services.impl.authentication;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.core.ERROR;
import com.student_manager.dtos.requests.LoginRequest;
import com.student_manager.dtos.requests.UserRequest;
import com.student_manager.dtos.responses.AuthenticationResponse;
import com.student_manager.dtos.responses.UserInfo;
import com.student_manager.entities.User;
import com.student_manager.services.UserService;
import com.student_manager.utils.DataUtils;
import com.student_manager.utils.DateTimeUtils;
import com.student_manager.utils.DateUtil;
import com.student_manager.utils.jwt.JwtUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Date;

@Service
@Log4j2
public class AuthenticationServiceImpl implements com.student_manager.services.AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    private final JwtUtils generateToken;
    private final UserService userService;

    public AuthenticationServiceImpl(JwtUtils generateToken, UserService userService) {
        this.generateToken = generateToken;
        this.userService = userService;
    }

    @Override
    public AuthenticationResponse login(LoginRequest request) throws ApiException {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
            String token = generateToken.generateJwtToken(authentication);
            Date expiredTime = generateToken.generateExpiration();
            String pattent = DateTimeUtils.DATE_PATTERN;
            String expiredTimeString = DateUtil.toDate(expiredTime, pattent);
            String refreshToken = generateToken.generateJwtToken(authentication);
            User user = userService.findByUsername(request.getUsername());
            String firstName = !DataUtils.isNullOrEmpty(user.getFirstName())
                    ? user.getFirstName() : "";
            String lastName = !DataUtils.isNullOrEmpty(user.getLastName())
                    ? user.getLastName() : "";
            UserInfo userInfo = UserInfo
                    .builder()
                    .id(user.getId())
                    .userCode(user.getUserCode())
                    .fullName(firstName + lastName)
                    .role(user.getRole())
                    .build();
            return AuthenticationResponse
                    .builder()
                    .token(token)
                    .expiredTime(expiredTimeString)
                    .refreshToken(refreshToken)
                    .userInfo(userInfo)
                    .build();
        } catch (Exception e) {
            log.error("Đăng nhập thất bại. Sai tên đăng nhập hoặc mật khẩu. {}", e.getMessage());
            throw new ApiException(ERROR.UNAUTHORIZED, "Đăng nhập thất bại. Sai tên đăng nhập hoặc mật khẩu.");
        }
    }


    @Override
    public User register(UserRequest request, boolean isAdmin) throws ApiException {
        User registerUser;
        if (isAdmin) {
            registerUser = userService.createAdmin(request);
        } else {
            registerUser = userService.create(request);
        }
        return registerUser;
    }
    @Override
    public boolean existsByUsername(String username) throws ApiException {
        return userService.existsByUsername(username);
    }
}
