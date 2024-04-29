package com.student_manager.enums;

import lombok.Getter;

@Getter
public enum Gender {
    MALE("Nam"),
    FEMALE("Nữ");
    private final String value;

    Gender(String value) {
        this.value = value;
    }
}
