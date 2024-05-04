package com.student_manager.config;

import com.student_manager.entities.User;
import com.student_manager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;
public class AuditorAwareImpl implements AuditorAware<Long> {

    @Autowired
    private UserRepository userRepository;

    public Optional<Long> getCurrentAuditor() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            String username = userDetails.getUsername();

            Optional<User> user = userRepository.findByUsername(username);

            if (user.isPresent()) {
                return Optional.ofNullable(user.get().getId());
            }
        }

        return Optional.empty();
    }
}

