package com.student_manager.core;

import com.student_manager.entities.User;
import com.student_manager.repositories.UserRepository;
import com.student_manager.utils.Translator;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;
import java.util.Optional;

@Component
public abstract class BaseService {
    @Autowired
    protected LocaleResolver localeResolver;
    @Autowired
    protected Translator translator;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    protected ModelMapper modelMapper;

    protected User getUser() throws ApiException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = null;
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            String username = userDetails.getUsername();
            Optional<User> optionalUser = userRepository.findByUsername(username);
            if (optionalUser.isPresent()) {
                user = optionalUser.get();
            } else {
                throw new ApiException(ERROR.BAD_REQUEST,"User không tồn tại");
            }
        } else {
            throw new ApiException(ERROR.BAD_REQUEST,"Xác thực không thành công");
        }
        return user;
    }

    protected String getLocaleFromRequest(HttpServletRequest request) {
        Locale locale = localeResolver.resolveLocale(request);
        return locale.toString();
    }

    protected String getLocal() {
        return "vi";
    }
}
