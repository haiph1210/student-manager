package com.student_manager.utils.query_helper;

import lombok.Data;

@Data
public class Range<T extends Comparable<? super T>> {
    private final T fromValue;
    private final T toValue;

    public Range(T fromValue, T toValue) {
        this.fromValue = fromValue;
        this.toValue = toValue;
    }
}
