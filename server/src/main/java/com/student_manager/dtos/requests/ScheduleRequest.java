package com.student_manager.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleRequest {
    @NotNull
    private Date startTime;
    @NotNull
    private Date endTime;
    @NotNull
    private Long classId;
    @NotNull
    private Long subjectId;

}
