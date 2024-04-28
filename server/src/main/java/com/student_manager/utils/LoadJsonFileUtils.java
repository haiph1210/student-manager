package com.student_manager.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.student_manager.core.ApiException;
import com.student_manager.core.ERROR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.Objects;

@Component
public class LoadJsonFileUtils {
    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private ObjectMapper objectMapper;

    public Object getJsonFile(String filePath) throws ApiException {
        return this.getFileUtils(filePath);
    }
    public Object getFileUtils(String jsonFile) throws ApiException {
        Resource resource = resourceLoader.getResource("classpath:" + jsonFile);
        try (InputStream inputStream = resource.getInputStream()) {
            Object object = objectMapper.readValue(inputStream, Object.class);
            if (Objects.isNull(object)) {
                throw new ApiException(ERROR.SYSTEM_ERROR.getCode(),"File : " + jsonFile + " No Data");
            }
            return object;
        } catch (Exception e) {
            throw new ApiException(ERROR.SYSTEM_ERROR.getCode(),"Cannot Get File Json In: " + jsonFile);
        }
    }
}
