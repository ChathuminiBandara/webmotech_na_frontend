"use client"
import React, {useCallback, useEffect, useState} from 'react';
import {GoogleMap, Marker, Circle, useJsApiLoader, StandaloneSearchBox,} from '@react-google-maps/api';
import {Input} from 'antd';
import locIcon from '../../public/assets/icon/mdi--location.svg';
import {Button, Col, Row} from "reactstrap";
import "../../styles/googleMap.scss"
import * as outletService from "../../service/outletService";
import {customToastMsg} from "../../util/CommonFun";
import {useDispatch} from "react-redux";
import {setLoading} from "../../redux/actions/loadingActions";

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center_delivery = {
    lat: 6.891833499999998,
    lng: 79.89033189999999
};

const options = {
    strokeColor: '#5cb919',
    strokeOpacity: 0.4,
    strokeWeight: 2,
    fillColor: 'rgba(205,253,173,0.5)',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};

const zoom = 15;

const mapOptions = {
    zoomControl: true,
    mapTypeControl: false, // Hiding the map type control if not needed
    scaleControl: true,
    streetViewControl: true,
    rotateControl: false, // Hiding the rotate control if not needed
    fullscreenControl: false,
};

const GoogleMapView = ({close, outletDetails, cityDetails, radius}) => {
    const dispatch = useDispatch()
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCgWENJ_p_e-Uq_FYK6cDqLmOvlmS9_e9E',
        libraries: ["places"]
    });

    let temp = {
        lng: parseFloat(cityDetails[0]?.lang),
        lat: parseFloat(cityDetails[0]?.lat)
    }

    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [circleBoarder, setCircleBoarder] = useState(null);
    const [distanceInMeters, setDistanceInMeters] = useState();
    const [searchBox, setSearchBox] = useState(null);
    const [inputValue, setInputValue] = useState(''); // State for input value

    const getAddress = (latLng) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({location: latLng}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    console.log(results);
                    console.log(results[0].formatted_address);
                    setInputValue(results[0].formatted_address); // Set input value
                } else {
                    customToastMsg('No results found', 0);
                }
            } else {
                customToastMsg('Geocoder failed due to: ' + status, 0);
            }
        });
    };

    useEffect(() => {
        if (searchBox) {
            const onPlacesChanged = () => {
                dispatch(setLoading(true));

                const location = searchBox.getPlaces()[0]?.geometry?.location;
                if (location) {
                    const latLng = location.toJSON();
                    setMarkerPosition(latLng);
                    const bounds = new window.google.maps.LatLngBounds(latLng);
                    if (map) {
                        map.fitBounds(bounds);
                    }
                    // Set the input value to the selected place's name or formatted address
                    const place = searchBox.getPlaces()[0];
                    setInputValue(place.formatted_address || place.name || '');
                }
                dispatch(setLoading(false));
            };
            searchBox.addListener('places_changed', onPlacesChanged);
        }
    }, [searchBox, map]);

    useEffect(() => {
        if (cityDetails) {
            const temp = {
                lat: parseFloat(cityDetails[0]?.lat),
                lng: parseFloat(cityDetails[0]?.lang)
            };
            setDistanceInMeters(radius * 1000);
            setMarkerPosition(temp);
            setCircleBoarder(temp);
            if (map) {
                const bounds = new window.google.maps.LatLngBounds(temp);
                map.fitBounds(bounds);
            }
        }
    }, [cityDetails, radius]);

    const onLoad = useCallback(function callback(map) {
        dispatch(setLoading(true));

        let temp = {
            lat: parseFloat(cityDetails[0].lat),
            lng: parseFloat(cityDetails[0].lang)
        }
        console.log(temp)
        const bounds = new window.google.maps.LatLngBounds(temp);
        map.fitBounds(bounds);
        setMap(map);
        dispatch(setLoading(false));
    }, []);

    const onSearchBoxLoad = (ref) => setSearchBox(ref);

    const onDragEnd = useCallback(function callback(event) {
        console.log(event.latLng.toJSON())
        const latLng = event.latLng.toJSON();
        console.log(latLng)
        setMarkerPosition(latLng);
        getAddress(latLng);
    }, []);

    const confirmDetails = () => {
        dispatch(setLoading(true));
        outletService.checkLocationCircle(markerPosition, outletDetails).then(res => {

            if (res.data.status) {
                close(markerPosition)
                customToastMsg('You are eligible', 1)

            } else {
                close()
                customToastMsg('You are not in selected outlet area', 0)
            }
            dispatch(setLoading(false));
        }).catch(c => {
            console.log(c)
            customToastMsg(c.message, 0);
            dispatch(setLoading(false));
        })

        dispatch(setLoading(false));
    }

    return isLoaded ? (
        <div>
            <Row>
                <Col md={12} xl={12}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={18}
                        onLoad={onLoad}
                        options={{
                            scrollwheel: true,
                            disableDefaultUI: true, zoomControl: false,
                            scaleControl: true,
                            mapTypeControlOptions: {
                                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                                mapTypeIds: ["roadmap", "terrain"],
                            }
                        }}
                        mapTypeId={["roadmap", "terrain"]}
                        onZoomChanged={() => {
                        }}
                    >

                        <Marker
                            onDragEnd={onDragEnd}
                            position={markerPosition}
                            icon={locIcon}
                            draggable={true}
                        />
                        <Circle
                            radius={distanceInMeters}
                            center={circleBoarder}
                            options={options}
                        />
                        <StandaloneSearchBox
                            className='ipt-location'
                            onLoad={onSearchBoxLoad}
                        >
                            <Input
                                size={'large'}
                                type="text"
                                placeholder="Enter your location"
                                value={inputValue} // Bind the input value to state
                                onChange={(e) => setInputValue(e.target.value)} // Handle input changes
                                style={{
                                    width: "95%",
                                    position: "absolute",
                                    left: "50%",
                                    top: "2.5%",
                                    transform: "translateX(-50%)"
                                }}
                            />
                        </StandaloneSearchBox>
                    </GoogleMap>
                </Col>
                <Col md={12} xl={12}>
                    <Button onClick={() => confirmDetails()} className='w-100 btn-confirm-location' outline>Confirm Your
                        Location</Button>
                </Col>
            </Row>
        </div>
    ) : <></>;
};

export default GoogleMapView;
