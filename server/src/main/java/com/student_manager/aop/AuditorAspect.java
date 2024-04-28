//
//import com.shop_quan_ao.server.entities.BaseEntities;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Before;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//
//@Aspect
//@Component
//public class AuditorAspect {
//
//    @Before("execution(* com.shop_quan_ao.server.entities..*Repository.save*(..)) && args(entity, ..)")
//    public void setAuditingInfo(Object entity) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication != null ? authentication.getName() : "unknown";
//
//        if (entity instanceof BaseEntities) {
//            BaseEntities baseEntity = (BaseEntities) entity;
//            baseEntity.setUpdatedBy(username);
//
//            if (baseEntity.getCreatedBy() == null) {
//                baseEntity.setCreatedBy(username);
//            }
//        }
//    }
//}