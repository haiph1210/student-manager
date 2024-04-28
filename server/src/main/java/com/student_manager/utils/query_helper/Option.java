package com.student_manager.utils.query_helper;

import lombok.Getter;

@Getter
public enum Option {
    LIKE,NOT_LIKE,EQUAL,NOT_EQUAL, CONTAINS, NOT_CONTAINS,
    GREATER_THAN, GREATER_THAN_EQUAL, LESS_THAN, LESS_THAN_EQUAL,
    IN,NOT_IN,BETWEEN
}
