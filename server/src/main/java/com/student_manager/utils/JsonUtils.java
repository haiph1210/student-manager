package com.student_manager.utils;

import com.google.gson.Gson;
import org.springframework.http.converter.json.GsonBuilderUtils;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

public class JsonUtils<T> {
    private static final Gson gson;

    static {
        gson = GsonBuilderUtils
                .gsonBuilderWithBase64EncodedByteArrays()
                .create();
    }

    public static String cashObjectToString(Object obj) {
        return gson.toJson(obj);
    }

    public static <T> T cashStringToObject(String input) {
        Type type = new TypeToken<T>() {
        }.getType();
        return gson.fromJson(input, type);
    }

    public static <T> T cashStringToObjectV2(String input, TypeToken<T> typeToken) {
        Type type = typeToken.getType();
        return gson.fromJson(input, type);
    }
}
