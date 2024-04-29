package com.student_manager.dtos.requests;

import com.student_manager.dtos.dto.FacultyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FacultyRequest {
    private String facultyName;
    private Float totalYearLearn;
    private FacultyDto facultyDto;
}
