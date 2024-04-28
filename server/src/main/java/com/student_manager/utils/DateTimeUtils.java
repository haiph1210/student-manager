package com.student_manager.utils;

import lombok.extern.log4j.Log4j2;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Log4j2
public class DateTimeUtils {
    public static final String DATE_PATTERN = "dd/MM/yyyy HH:mm:ss";
    public static final String DATE_PATTERN_V2 = "HH:mm dd/MM/yyyy";
    public static final String DATE_PATTERN_V3 = "dd/MM/yyyy";

    public static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern(DATE_PATTERN);

    public static String localDateTimeToString(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);
        return localDateTime.format(formatter);
    }

    public static String localDateTimeToString(LocalDateTime localDateTime, String datePattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(datePattern);
        return localDateTime.format(formatter);
    }

    public static LocalDateTime stringToLocalDateTime(String dateInString, String datePattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(datePattern);
        return LocalDate.parse(dateInString, formatter).atStartOfDay();
    }

    public static LocalDate stringToLocalDate(String dateInString, String datePattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(datePattern);
        return LocalDate.parse(dateInString, formatter);
    }
}
