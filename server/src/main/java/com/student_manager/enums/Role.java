package com.student_manager.enums;

import lombok.Getter;

@Getter
public enum Role {
    USER("Người dùng"),
    ADMIN("Quản trị viên"),
    ANONYMOUS("Ẩn danh");
    private final String value;

    Role(String value) {
        this.value = value;
    }
}
