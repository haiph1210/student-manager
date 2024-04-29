package com.student_manager.entities;

import com.student_manager.core.BaseEntities;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "TBL_SUBJECT")
public class Subject extends BaseEntities {
    @Column(length = 255)
    private String subjectName;
    private Integer credits = 1;

}
