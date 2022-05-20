/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer';
import { Container, Grid, Typography, Box, Button, TextField } from '@mui/material';
import './map.css';
const { kakao } = window;
export default function KakaoMap() {
  useEffect(() => {

    setTimeout(() => mapContainer(), 500);
  }, []);


  function success({ coords, timestamp }) {
    window.lat = coords.latitude; 
    window.lng = coords.longitude; 

  }

  function getUserLocation() {
    if (!navigator.geolocation) {
 
    }
    navigator.geolocation.getCurrentPosition(success);
  }

  getUserLocation();
  const mapContainer = () => {
    let mapContainer = document.getElementById('map');
    let mapOption = {
      center: new kakao.maps.LatLng(window.lat, window.lng),
      level: 3,
    };

    var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
      contentNode = document.createElement('div'), 
      markers = [], 
      currCategory = ''; 
    var map = new kakao.maps.Map(mapContainer, mapOption);

    
    var markerPosition = new kakao.maps.LatLng(window.lat, window.lng);


    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);


    var ps = new kakao.maps.services.Places(map);


    kakao.maps.event.addListener(map, 'idle', searchPlaces);

    contentNode.className = 'placeinfo_wrap';


    addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);


    placeOverlay.setContent(contentNode);


    addCategoryClickEvent();


    function addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent('on' + type, callback);
      }
    }

    function searchPlaces() {
      if (!currCategory) {
        return;
      }

  
      placeOverlay.setMap(null);


      removeMarker();

      ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
    }

   
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
    
        displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
   
      } else if (status === kakao.maps.services.Status.ERROR) {

      }
    }

    function displayPlaces(places) {

      var order = document.getElementById(currCategory).getAttribute('data-order');

      for (var i = 0; i < places.length; i++) {
   
        var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        (function (marker, place) {
          kakao.maps.event.addListener(marker, 'click', function () {
            displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    }


    function addMarker(position, order) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', 
        imageSize = new kakao.maps.Size(27, 28), 
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), 
          spriteOrigin: new kakao.maps.Point(46, order * 36), 
          offset: new kakao.maps.Point(11, 28), 
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, 
          image: markerImage,
        });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

 
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayPlaceInfo(place) {
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        '</a>';

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          '</span>' +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ')</span>';
      } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
      }

      content += '    <span class="tel">' + place.phone + '</span></div><div class="after"></div>';

      contentNode.innerHTML = content;
      placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      placeOverlay.setMap(map);
    }

    function addCategoryClickEvent() {
      var category = document.getElementById('category'),
        children = category.children;

      for (var i = 0; i < children.length; i++) {
        children[i].onclick = onClickCategory;
      }
    }

 
    function onClickCategory() {
      var id = this.id,
        className = this.className;

      placeOverlay.setMap(null);

      if (className === 'on') {
        currCategory = '';
        changeCategoryClass();
        removeMarker();
      } else {
        currCategory = id;
        changeCategoryClass(this);
        searchPlaces();
      }
    }

    function changeCategoryClass(el) {
      var category = document.getElementById('category'),
        children = category.children,
        i;

      for (i = 0; i < children.length; i++) {
        children[i].className = '';
      }

      if (el) {
        el.className = 'on';
      }
    }
  };

  return (
 
    <div className='w-full flex flex-col justify-center'>
      <div
        id='map'

        className='h-[400px] sm:h-[300px] md:h-[400px] w-11/12 md:w-3/4 mx-auto'
      >
        <ul id='category'>
  
          <li id='CS2' data-order='5'>
            <span class='category_bg store'></span>
            편의점
          </li>
        </ul>
      </div>
    </div>

  );
}
