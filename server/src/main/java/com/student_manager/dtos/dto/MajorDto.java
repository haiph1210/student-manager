package com.student_manager.dtos.dto;

import com.student_manager.dtos.requests.MajorRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MajorDto {
    private List<Long> majorIds;
    private List<MajorRequest> majors;
}
