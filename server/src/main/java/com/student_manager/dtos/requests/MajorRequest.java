package com.student_manager.dtos.requests;

import com.student_manager.dtos.dto.ClassDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MajorRequest {
    @NotNull
    private String majorName;
    @NotNull
    private Long facultyId;
//    private ClassDto classDto;
}