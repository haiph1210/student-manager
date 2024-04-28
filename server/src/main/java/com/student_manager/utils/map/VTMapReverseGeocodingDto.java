package com.student_manager.utils.map;


import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VTMapReverseGeocodingDto implements Serializable {
    private static final long serialVersionUID = 1L;
    private String status;
    private Result[] results;

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String value) {
        this.status = value;
    }

    public Result[] getResults() {
        return this.results;
    }

    public void setResults(Result[] value) {
        this.results = value;
    }

    public static class Result implements Serializable {
        private static final long serialVersionUID = -1769984672207397169L;
        @JsonAlias("address_components")
        private AddressComponent[] addressComponents;
        @JsonAlias("formatted_address")
        private String formattedAddress;
        private Geometry geometry;
        @JsonAlias("place_id")
        private String placeID;
        @JsonAlias("plus_code")
        private PlusCode plusCode;
        private String[] types;

        public AddressComponent[] getAddressComponents() {
            return this.addressComponents;
        }

        public void setAddressComponents(AddressComponent[] value) {
            this.addressComponents = value;
        }

        public String getFormattedAddress() {
            return this.formattedAddress;
        }

        public void setFormattedAddress(String value) {
            this.formattedAddress = value;
        }

        public Geometry getGeometry() {
            return this.geometry;
        }

        public void setGeometry(Geometry value) {
            this.geometry = value;
        }

        public String getPlaceID() {
            return this.placeID;
        }

        public void setPlaceID(String value) {
            this.placeID = value;
        }

        public PlusCode getPlusCode() {
            return this.plusCode;
        }

        public void setPlusCode(PlusCode value) {
            this.plusCode = value;
        }

        public String[] getTypes() {
            return this.types;
        }

        public void setTypes(String[] value) {
            this.types = value;
        }

        public static class AddressComponent implements Serializable {
            private static final long serialVersionUID = -15490952904442233L;
            private String[] types;
            @JsonAlias("long_name")
            private String longName;
            @JsonAlias("short_name")
            private String shortName;
            @JsonAlias("area_code")
            private String areaCode;

            public String[] getTypes() {
                return this.types;
            }

            public void setTypes(String[] value) {
                this.types = value;
            }

            public String getLongName() {
                return this.longName;
            }

            public void setLongName(String value) {
                this.longName = value;
            }

            public String getShortName() {
                return this.shortName;
            }

            public void setShortName(String value) {
                this.shortName = value;
            }

            public String getAreaCode() {
                return this.areaCode;
            }

            public void setAreaCode(String areaCode) {
                this.areaCode = areaCode;
            }

        }

        public static class Geometry implements Serializable {
            private static final long serialVersionUID = 3085807354971204638L;
            private Location location;
            @JsonAlias("location_type")
            private String locationType;
            private Viewport viewport;

            public Location getLocation() {
                return this.location;
            }

            public void setLocation(Location value) {
                this.location = value;
            }

            public String getLocationType() {
                return this.locationType;
            }

            public void setLocationType(String value) {
                this.locationType = value;
            }

            public Viewport getViewport() {
                return this.viewport;
            }

            public void setViewport(Viewport value) {
                this.viewport = value;
            }

            public static class Location implements Serializable {
                private static final long serialVersionUID = 6039857024626109385L;
                private double lat;
                private double lng;

                public double getLat() {
                    return this.lat;
                }

                public void setLat(double value) {
                    this.lat = value;
                }

                public double getLng() {
                    return this.lng;
                }

                public void setLng(double value) {
                    this.lng = value;
                }
            }

            public static class Viewport implements Serializable {
                private static final long serialVersionUID = -597918239949520526L;
                private Location northeast;
                private Location southwest;

                public Location getNortheast() {
                    return this.northeast;
                }

                public void setNortheast(Location value) {
                    this.northeast = value;
                }

                public Location getSouthwest() {
                    return this.southwest;
                }

                public void setSouthwest(Location value) {
                    this.southwest = value;
                }
            }
        }

        public static class PlusCode implements Serializable {
            private static final long serialVersionUID = -8308211224799381281L;
            @JsonAlias("global_code")
            private String globalCode;
            @JsonAlias("compound_code")
            private String compoundCode;

            public String getGlobalCode() {
                return this.globalCode;
            }

            public void setGlobalCode(String globalCode) {
                this.globalCode = globalCode;
            }

            public String getCompoundCode() {
                return this.compoundCode;
            }

            public void setCompoundCode(String compoundCode) {
                this.compoundCode = compoundCode;
            }

        }
    }
}

