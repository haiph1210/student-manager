package com.student_manager.utils;

import org.apache.logging.log4j.util.Strings;

import java.util.Objects;

public class StringUtils {
    public static boolean isNullOrEmpty(String request) {
        return (Objects.isNull(request) || Strings.isEmpty(request));
    }
}
