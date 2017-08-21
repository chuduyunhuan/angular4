import { Component, OnInit } from "@angular/core";
import { MapService } from './map.service';
import { AnalyseService } from '../Analyse/analyse.service';
import * as L from 'leaflet';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
    map: any;
    dataCenterGroup = new L.featureGroup();
    modalDataCenter = false;
    modalInfo = {
        address: ''
    };
    siteChecked: string;
    vcds = [];
    blinkList = ['change-twink-yellow', 'change-twink-green', 'change-twink-pink'];
    constructor(
    private mapService: MapService,
    private analyseService: AnalyseService,
    private route: ActivatedRoute
  ) {}
    ngOnInit() {
        this.initMap();
    }
    initMap() {
        this.map = L.map('map').setView(L.latLng([41.123131, -87.32366]), 5);
        let mapboxAccessToken = 'pk.eyJ1IjoiY2h1ZHV5dW5odWFuIiwiYSI6IjRkNDY1ZGFjODhhMjE3OWRiZjBhNGQ3Mzk0YjkwYzA0In0.OL0_ZspJJ36sMw_KyEDHmA';
        let url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken
        L.tileLayer(url, {
            id: 'mapbox.dark',
            noWrap: true,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 7,
            minZoom: 3
        }).addTo(this.map);
        this.addDataCenterLayer();
        this.addTwinkLayer();
        this.getRouteParas();
    }
    addDataCenterLayer() {
        let geoInfo = this.mapService.getAllInfo();
        geoInfo.map((obj,i) => {
            let location = obj.location;
            let address = obj.address;
            if(!location) return;
            let icon = this.setIcon();
            let marker = L.marker(location, {icon: icon, title: address}).addTo(this.dataCenterGroup);
            this.registerMarkerClick(marker, address);
        });
        this.map.addLayer(this.dataCenterGroup);
    }
    registerMarkerClick(marker: any, address: string) {
        marker.on('click', e => {
            this.modalDataCenter = true;
            this.modalInfo.address = address;
            let start = ~~(Math.random()*(19 - 0) + 0);
            let end = ~~(Math.random()*(19 - 0) + 0);
            let order = this.exchange(start, end);
            this.vcds = this.analyseService.getOrgs().slice(order[0], order[1]);
            this.siteChecked = this.vcds[0].site;
        });
    }
    exchange(start: number, end: number) {
        if(start == end) {
            end = start + 1;
        }else if (start > end) {
            start ^= end;
            end ^= start;
            start ^= end;
        }
        return[start, end];
    }
    setIcon() {
       let icon = L.icon({
           iconUrl: './assets/images/datacenter.png',
           iconSize: [64, 64],
           iconAnchor: [30, 30],
           popupAnchor: [0, 0]
       });
       return icon;
   }
   addTwinkLayer() {
           setInterval(() =>{
            let geoInfo = this.mapService.getAllInfo();
            let len = geoInfo.length;
            let random = Math.random() * (len - 0) + 0;
            let data = geoInfo[parseInt(random.toString())];
            let blink = this.blinkList[parseInt((Math.random() * (3 - 0) + 0).toString())];
            this.registerAnimation(data.location, blink);
        },1000*0.5);
   }
   registerAnimation(location: Object, className='change-twink-wx') {
       let size = parseInt((Math.random() * (20 - 10) + 10).toString());
       let left = Math.random() * (30 + 15) - 15;
       let right = Math.random() * (30 + 15) - 15;
       let icon = L.divIcon({
           iconSize: L.point(size, size),
           iconAnchor: [left, right],
           className: className
       });
       let marker = L.marker(location, {icon: icon}).addTo(this.map);
       setTimeout(() => {
           this.map.removeLayer(marker);
       }, 1000*60*0.2);
   }
    getRouteParas() {
        this.route.params.subscribe((params: Params) => {
            let location = params.location;
            if(!location) return;
            this.locate(JSON.parse(location));
        })
    }
   closeModalDataCenter() {
        this.modalDataCenter = false;
   }
    locate(location) {
        this.map.panTo(location);
    }
    changeSiteChecked(name: string) {
        this.siteChecked = name;
    }
}