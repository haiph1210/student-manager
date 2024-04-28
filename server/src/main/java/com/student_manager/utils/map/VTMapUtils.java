package com.student_manager.utils.map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;

public class VTMapUtils {
    private static Logger logger = LogManager.getLogger(VTMapUtils.class);

    private static RestTemplate restTemplate = new RestTemplate();
    private static String domain = "https://api-maps.viettel.vn";

    private VTMapUtils() {
    }

    public static VTMapReverseGeocodingDto reverseGeocoding(String accessToken, BigDecimal latitude,
                                                            BigDecimal longitude) {
        String url = String.format("/gateway/placeapi/v2/place-api/geocode?key=%s&latlng=%s,%s", accessToken,
                latitude.toString(), longitude.toString());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json;charset=UTF-8");
        VTMapUtils.logger.info(VTMapUtils.domain + url);
        return VTMapUtils.restTemplate.exchange(VTMapUtils.domain + url, HttpMethod.GET,
                new HttpEntity<>(null, headers), VTMapReverseGeocodingDto.class).getBody();
    }
}

