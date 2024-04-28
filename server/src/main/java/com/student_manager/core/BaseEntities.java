package com.student_manager.core;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@Data
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntities implements Serializable {
    public static final Long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "CREATED_DATE", updatable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @CreationTimestamp
    private Date createdDate;
    @CreatedBy
    private Long createdBy;
    @Column(name = "UPDATED_DATE")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @UpdateTimestamp
    private Date updatedDate;
    @LastModifiedBy
    private Long updatedBy;
}
