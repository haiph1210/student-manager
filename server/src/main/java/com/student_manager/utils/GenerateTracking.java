package com.student_manager.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class GenerateTracking {
    public static String generateTrackingId(Long userId) {
        Date now = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String formattedDate = dateFormat.format(now);

        String randomString = generateRandomString(5);

        return formattedDate + randomString + String.valueOf(userId);
    }

    public static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        return sb.toString();
    }
}
