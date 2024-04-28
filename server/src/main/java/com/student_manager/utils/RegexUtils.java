package com.student_manager.utils;

import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class RegexUtils {
    public static final String REGEX_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    public static final String REGEX_INPUT_SPECIAL_CHARACTERS = ".*[^a-zA-Z0-9].*";
    public static final String REGEX_NOT_ZERO = "^[1-9][0-9]*$";
    public static final String REGEX_POSITIVE_INTEGER = "^[1-9][0-9]*$";
    public static final String REGEX_NO_SPECIAL_CHARS_HTML_TAGS = "^[^<>]*$";

    public static boolean validatePhoneNumber(String phoneNumber) {
        String pattern = "^(84|0[3|5|7|8|9])+([0-9]{8})\\b$";
        Pattern regexPattern = Pattern.compile(pattern);
        Matcher matcher = regexPattern.matcher(phoneNumber);
        return matcher.matches();
    }

    public static boolean validateEmail(String email) {
        String pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$";
        Pattern regexPattern = Pattern.compile(pattern);
        Matcher matcher = regexPattern.matcher(email);
        return matcher.matches();
    }

    public static boolean validateEmailV2(String email) {
        String pattern = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
        Pattern regexPattern = Pattern.compile(pattern);
        Matcher matcher = regexPattern.matcher(email);
        return matcher.matches();
    }

    public static boolean validateIdentityCard(String identityCard) {
        String pattern = "^[0-9]{9,12}$";
        Pattern regexPattern = Pattern.compile(pattern);
        Matcher matcher = regexPattern.matcher(identityCard);
        return matcher.matches();
    }
}
