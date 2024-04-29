package com.student_manager.repositories;

import com.student_manager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    boolean existsByUsernameAndEmailAndPhoneNumber(String username, String email, String phoneNumber);

    Optional<User> findByUserCode(String userCode);
    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndEmailAndPhoneNumber(String username, String email, String phoneNumber);

}
