package com.student_manager.dtos.requests;

import com.student_manager.dtos.dto.MajorDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MajorRequest {
    private String majorName;
    private MajorDto majorDto;
}