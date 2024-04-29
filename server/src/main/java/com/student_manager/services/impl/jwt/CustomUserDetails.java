package com.student_manager.services.impl.jwt;

import com.student_manager.entities.User;
import com.student_manager.utils.DataUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String userCode;
    private String fullName;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Long id, String userCode, String fullName, String username, String password, String email, String phoneNumber, List<GrantedAuthority> authorities) {
        super();
    }

    public static CustomUserDetails build(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().name()));
        String firstName = !DataUtils.isNullOrEmpty(user.getFirstName()) ? user.getFirstName() : "";
        String lastName = !DataUtils.isNullOrEmpty(user.getLastName()) ? user.getLastName() : "";
        String fullName = firstName + lastName;
        return new CustomUserDetails(
                user.getId(),
                user.getUserCode(),
                fullName,
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getPhoneNumber(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
