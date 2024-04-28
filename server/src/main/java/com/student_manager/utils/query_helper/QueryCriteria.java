package com.student_manager.utils.query_helper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryCriteria {
    private String key;
    private Object value;
    private Option option;
}
