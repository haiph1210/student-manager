package com.student_manager.repositories;

import com.student_manager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(nativeQuery = true,
            value = "SELECT * FROM TBL_USER a WHERE (?1 IS NULL OR a.role = ?1)")
    Optional<List<User>> findAllByRole(String role);
    @Query(nativeQuery = true,
            value = "SELECT * FROM TBL_USER a WHERE a.class_id = ?1")
    Optional<List<User>> findAllByClassId(Long classId);

    boolean existsByUsername(String username);

    boolean existsByUsernameAndEmailAndPhoneNumber(String username, String email, String phoneNumber);

    Optional<User> findByUserCode(String userCode);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndEmailAndPhoneNumber(String username, String email, String phoneNumber);

}
