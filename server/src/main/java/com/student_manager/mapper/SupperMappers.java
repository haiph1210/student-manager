package com.student_manager.mapper;

import com.student_manager.utils.JsonUtils;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface SupperMappers<E, D> {

    E toEntity(D dto);

    D toDto(E entity);

    List<E> toEntity(List<D> dtoList);

    List<D> toDto(List<E> entityList);

    Set<D> toDto(Set<E> entityList);
    E update(@MappingTarget E entity, D request);

    @Named("mapToString")
    default String mapToString(Map<String, Object> labels) {
        return JsonUtils.cashObjectToString(labels);
    }

    @Named("stringToMap")
    default Map<String, Object> stringToMap(String labels) {
        return JsonUtils.<Map<String, Object>>cashStringToObject(labels);
    }
}
