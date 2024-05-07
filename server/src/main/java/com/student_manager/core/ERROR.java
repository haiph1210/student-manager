package com.student_manager.core;

import lombok.Getter;

@Getter
public enum ERROR {
    SUCCESS(1, "Success"),
    INVALID_REQUEST(100, "Request không hợp lệ"),
    SYSTEM_ERROR(99, "Hệ thống đang nâng cấp tính năng này, xin vui lòng thử lại sau!"),
    BAD_REQUEST(400, "Bad request"),
    RESOURCE_NOT_FOUND(404, "Resource not found"),
    UNAUTHORIZED(401, "Xác thực thất bại"),
    EXPIRED_JWT_EXCEPTION(403, "Mã thông báo JWT đã hết hạn");

    private final int code;
    private final String message;

    ERROR(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

