package com.student_manager.dtos.dto;

import com.student_manager.dtos.requests.ClassRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassDto {
    private List<Long> classIds;
    private List<ClassRequest> classRequests;
}
