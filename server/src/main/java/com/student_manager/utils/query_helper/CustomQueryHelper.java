package com.student_manager.utils.query_helper;

import com.google.gson.reflect.TypeToken;
import com.student_manager.utils.JsonUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Log4j2
public class CustomQueryHelper {
    /**
     * auth: Hải Phạm Quang
     * Sử dụng với trường hợp là 1 list query với cách so sánh and
     **/
    public static <T> Specification<T> setSpecificationList(List<QueryCriteria> criteriaList) {
        return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (QueryCriteria criteria : criteriaList) {
                Predicate predicate = toPredicate(root, cb, criteria);
                if (predicate != null) {
                    predicates.add(predicate);
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static <T> Specification<T> setSpecification(QueryCriteria criteria, OptionQuery optionQuery) {
        return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = toPredicate(root, cb, criteria);
            switch (optionQuery) {
                case OR:
                    return cb.or(predicate);
                case AND:
                    return cb.and(predicate);
                case NOT:
                    return cb.not(predicate);
                default:
                    log.error("Cannot option: {}", optionQuery);
                    return null;
            }
        };
    }

    public static <T> List<Predicate> createPredicate(Root<T> root, CriteriaBuilder cb, List<QueryCriteria> criteriaList) {
        List<Predicate> predicates = new ArrayList<>();
        for (QueryCriteria criteria : criteriaList) {
            switch (criteria.getOption()) {
                case EQUAL:
                    predicates.add(equalPredicate(root, cb, criteria));
                case LIKE:
                    predicates.add(likePredicate(root, cb, criteria));
                case NOT_EQUAL:
                    predicates.add(notEqualPredicate(root, cb, criteria));
                case NOT_LIKE:
                    predicates.add(notLikePredicate(root, cb, criteria));
                case IN:
                    predicates.add(inPredicate(root, cb, criteria));
                case NOT_IN:
                    predicates.add(notInPredicate(root, cb, criteria));
//            case GREATER_THAN:
//                return greaterThanPredicate(root, cb, criteria);
//            case GREATER_THAN_EQUAL:
//                return greaterThanOrEqualPredicate(root, cb, criteria);
//            case LESS_THAN:
//                return lessThanPredicate(root, cb, criteria);
//            case LESS_THAN_EQUAL:
//                return lessThanOrEqualPredicate(root, cb, criteria);

            }
        }
        return predicates;
    }

    public static <T> Predicate toPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
        switch (criteria.getOption()) {
            case EQUAL:
                return (equalPredicate(root, cb, criteria));
            case LIKE:
                return (likePredicate(root, cb, criteria));
            case NOT_EQUAL:
                return (notEqualPredicate(root, cb, criteria));
            case NOT_LIKE:
                return (notLikePredicate(root, cb, criteria));
            case IN:
                return (inPredicate(root, cb, criteria));
            case NOT_IN:
                return (notInPredicate(root, cb, criteria));
            case BETWEEN:
                return (betweenPredicate(root, cb, criteria));
//            case GREATER_THAN:
//                return greaterThanPredicate(root, cb, criteria);
//            case GREATER_THAN_EQUAL:
//                return greaterThanOrEqualPredicate(root, cb, criteria);
//            case LESS_THAN:
//                return lessThanPredicate(root, cb, criteria);
//            case LESS_THAN_EQUAL:
//                return lessThanOrEqualPredicate(root, cb, criteria);

        }
        return null;
    }

    private static <T, Y extends Comparable<? super Y>> Predicate betweenPredicate(
            Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {

        Path<Y> path = root.get(criteria.getKey());
        TypeToken<Range<Y>> typeToken = new TypeToken<Range<Y>>() {};
        Range<Y> range = JsonUtils.<Range<Y>>cashStringToObjectV2(JsonUtils.cashObjectToString(criteria.getValue()), typeToken);
        Object fromValue = range.getFromValue();
        Object toValue = range.getToValue();

        return cb.between(path, (Y) fromValue, (Y) toValue);
    }

    private static <T> Predicate equalPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
        return cb.equal(root.get(criteria.getKey()), criteria.getValue());
    }

    private static <T> Predicate likePredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
        return cb.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
    }

    private static <T> Predicate notEqualPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
        return cb.notEqual(root.get(criteria.getKey()), criteria.getValue());
    }

    private static <T> Predicate notLikePredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
        return cb.notLike(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
    }

    private static <T> Predicate inPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
        return root.get(criteria.getKey()).in((Collection<?>) criteria.getValue());
    }

    private static <T> Predicate notInPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
        return cb.not(root.get(criteria.getKey()).in((Collection<?>) criteria.getValue()));
    }

    private static <T> Predicate greaterThanPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
        return cb.gt(root.get(criteria.getKey()), criteria.getValue().getClass().getModifiers());
    }

//    private static <T> Predicate greaterThanOrEqualPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
//        return cb.greaterThanOrEqualTo(root.get(criteria.getKey()),criteria.getValue());
//    }
//
//    private static <T> Predicate lessThanPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
//        return cb.lessThan(root.get(criteria.getKey()), criteria.getValue().getClass().getModifiers());
//    }
//
//    private static <T> Predicate lessThanOrEqualPredicate(Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {
//        return cb.lessThanOrEqualTo(root.get(criteria.getKey()), (Comparable<?>) criteria.getValue());
//    }

    private static <T> Predicate greaterThanOrEqualPredicate(
            Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {

        Path<Comparable> path = root.get(criteria.getKey());
        Comparable value = (Comparable) criteria.getValue();

        return cb.greaterThanOrEqualTo(path, value);
    }

    private static <T> Predicate lessThanPredicate(
            Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {

        Path<Comparable> path = root.get(criteria.getKey());
        Comparable value = (Comparable) criteria.getValue();

        return cb.lessThan(path, value);
    }

    private static <T> Predicate lessThanOrEqualPredicate(
            Root<T> root, CriteriaBuilder cb, QueryCriteria criteria) {

        Path<Comparable> path = root.get(criteria.getKey());
        Comparable value = (Comparable) criteria.getValue();

        return cb.lessThanOrEqualTo(path, value);
    }


//    public static <T> Page<T> getPageWithDynamicFilter(List<QueryCriteria> criteriaList, Pageable pageable, Class<T> entityClass, EntityManager entityManager) {
//        Specification<T> spec = buildSpecification(criteriaList);
//        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//        CriteriaQuery<T> query = cb.createQuery(entityClass);
//        Root<T> root = query.from(entityClass);
//        query.select(root).where((Predicate) spec);
//
//        TypedQuery<T> typedQuery = entityManager.createQuery(query);
//        typedQuery.setFirstResult((int) pageable.getOffset());
//        typedQuery.setMaxResults(pageable.getPageSize());
//
//        List<T> resultList = typedQuery.getResultList();
//
//        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
//        Root<T> countRoot = countQuery.from(entityClass);
//        countQuery.select(cb.count(countRoot)).where((Predicate) spec);
//        Long count = entityManager.createQuery(countQuery).getSingleResult();
//
//        return new PageImpl<>(resultList, pageable, count);
//    }

}
