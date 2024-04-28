package com.student_manager.core;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ApiException extends Exception {
    private int code;
    private Object data;

    public ApiException(int code) {
        this.code = code;
    }

    public ApiException(int code, String msg) {
        super(msg);
        this.code = code;
    }

    public ApiException(ERROR msg) {
        super(msg.getMessage());
        this.code = msg.getCode();
    }

    public ApiException(ERROR msg, Object data) {
        super(msg.getMessage());
        this.code = msg.getCode();
        this.data = data;
    }

    public ApiException(ERROR msg, String message) {
        super(message);
        this.code = msg.getCode();
    }

    public ApiException(ERROR msg, String message, Object data) {
        super(message);
        this.code = msg.getCode();
        this.data = data;
    }
}
