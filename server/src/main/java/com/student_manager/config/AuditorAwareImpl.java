package com.student_manager.config;

import com.student_manager.utils.DataUtils;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {

    public Optional<String> getCurrentAuditor() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            String username = userDetails.getUsername();

            if (DataUtils.isNullOrEmpty(username)) {
                username = "anonymousUser";
            }

            return Optional.of(username);
        }
        return Optional.of("anonymousUser");
    }
}

