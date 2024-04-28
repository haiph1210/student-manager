package com.student_manager.core;

import lombok.Data;

@Data
public class BaseResponse<T> {

    private int code;

    private String message;
    private T data;

    public BaseResponse() {
        this.code = 1;
        this.message = "Success";
    }

    public BaseResponse(T data) {
        this.code = 1;
        this.message = "Success";
        this.data = data;
    }

    public BaseResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public BaseResponse(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public BaseResponse(ERROR msg) {
        this.code = msg.getCode();
        this.message = msg.getMessage();
    }

    public void setCodeSuccess() {
        this.code = 1;
        this.message = "Success";
    }
}
