package com.student_manager.aop;

import com.student_manager.core.ApiException;
import com.student_manager.core.BaseResponse;
import com.student_manager.core.ERROR;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandle /*extends ResponseEntityExceptionHandler*/ {
    private static final Logger LOGGER = LogManager.getLogger(GlobalExceptionHandle.class);

    @ExceptionHandler(value = {AccessDeniedException.class})
    public ResponseEntity<Object> handleExpiredJwtException(AccessDeniedException ex) {
        String errorMessage = "Access Denied: " + ex.getMessage();
        return new ResponseEntity<>(new BaseResponse<>(ERROR.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(value = {ExpiredJwtException.class})
    public ResponseEntity<Object> handleExpiredJwtException(ExpiredJwtException ex) {
        String errorMessage = "JWT token is expired: " + ex.getMessage();
        return new ResponseEntity<>(new BaseResponse<>(ERROR.EXPIRED_JWT_EXCEPTION), HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(ApiException.class)
    @ResponseBody
    public ResponseEntity<BaseResponse<?>> handleCustomizedException(ApiException e) {
        LOGGER.info("Exception {}", e.getMessage());
        return new ResponseEntity<>(new BaseResponse<>(e.getCode(), e.getMessage(), e.getData()), HttpStatus.OK);
    }


    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<BaseResponse<?>> handleInternalException(Exception ex) {
        try {
            LOGGER.error("Exception ", ex);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new BaseResponse<>(ERROR.SYSTEM_ERROR.getCode(), ERROR.SYSTEM_ERROR.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    @ExceptionHandler(DataIntegrityViolationException.class)
//    public ResponseEntity<BaseResponse<?>> handleDbViolation(Exception ex) {
//        LOGGER.error("DataIntegrityViolationException ", ex);
//        BaseResponse<?> response = new BaseResponse<>(ERROR.INVALID_PARAM);
//        if (ex.getMessage().contains("date_check"))
//            response.setMessage("Ngày kích hoạt phải trước ngày hết hạn");
//
//        if (ex.getMessage().contains("business_product_unkey"))
//            response.setMessage("Liên kết giữa doanh nghiệp và sản phẩm đã tồn tại");
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    @ResponseBody
//    protected ResponseEntity<Object> handleMethodArgumentNotValid(
//            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status,
//            WebRequest request) {
//        LOGGER.error("Validation Exception ");
//        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
//                .map(this::buildMessage)
//                .collect(Collectors.toList());
//        return new ResponseEntity<>(errors.toString(), HttpStatus.OK);

//        String errors = ex.getBindingResult()
//                .getFieldErrors()
//                .stream()
//                .map(DefaultMessageSourceResolvable::getDefaultMessage)
//                .collect(Collectors.joining(" \n "));
//        BaseResponse<?> response = new BaseResponse<>(ERROR.INVALID_REQUEST.getCode(), errors);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseEntity<BaseResponse<String>> handleValidationException(MethodArgumentNotValidException e) {
        LOGGER.error("App Exception ", e);
        List<String> errors = e.getBindingResult().getFieldErrors().stream()
                .map(this::buildMessage).collect(Collectors.toList());
        return new ResponseEntity<>(new BaseResponse<>(ERROR.INVALID_REQUEST.getCode(), ERROR.INVALID_REQUEST.getMessage(), errors.toString()), HttpStatus.BAD_REQUEST);
    }

    private String buildMessage(FieldError fe) {
        StringBuilder errorCode = new StringBuilder("");
        String localizedErrorMsg = "";
        errorCode.append("invalid").append(".");
        errorCode.append(fe.getCode().toLowerCase());
        try {
//            localizedErrorMsg = translator.formatLocalizedMessage(errorCode.toString(), fe.getField());
        } catch (Exception ex) {
            localizedErrorMsg = fe.getDefaultMessage();
        }
        return localizedErrorMsg;
    }

}
