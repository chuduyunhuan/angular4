import { Component, OnInit } from "@angular/core";
import { MapService } from './map.service';
import { AnalyseService } from '../Analyse/analyse.service';
import * as L from 'leaflet';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'map2',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent2 implements OnInit {
    map: any;
    dataCenterGroup = new L.featureGroup();
    modalDataCenter = false;
    modalInfo = {
        address: ''
    };
    siteChecked: string;
    vcds = [];
    siteIcons = ['yellow', 'green', 'red'];
    blinkList = ['change-twink-yellow2', 'change-twink-green2', 'change-twink-pink2'];
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
            let index = ~~(Math.random() * (3-0) + 0);
            let icon = this.setIcon(this.siteIcons[index]);
            let marker = L.marker(location, {icon: icon, title: address, opacity: 0.33, animated: false}).addTo(this.dataCenterGroup);
            this.registerMarkerClick(marker, address);
        });
        this.map.addLayer(this.dataCenterGroup);
    }
    setIcon(iconType: string, statusType?: string ) {
        let icon = L.icon({
            iconUrl: './assets/images/' + iconType + '.png',
            iconSize: statusType == 'normal'? [20,20] : [90, 90],
            iconAnchor: [30, 30],
            popupAnchor: [0, 0]
        });
        return icon;
    }
    isFlashing(address: string, index: number): boolean {
        let flag = true;
        this.dataCenterGroup.eachLayer(layer => {
            let options = layer.options;
            let title = options.title;
            if (title == address) {
                let animated = options.animated;
                if(!animated) {
                    flag = false;
                    let icon = this.setIcon(this.siteIcons[index]);
                    layer.options.animated = true;
                    layer.setIcon(icon);
                }
            }
        });
        return flag;
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
    addTwinkLayer() {
        setInterval(() =>{
            let geoInfo = this.mapService.getAllInfo();
            let len = geoInfo.length;
            let random = ~~(Math.random() * (len - 0) + 0);
            let data = geoInfo[random];
            let address = data.address;
            let blinkRandom = ~~(Math.random() * (3 - 0) + 0);
            let blink = this.blinkList[blinkRandom];
            if(this.isFlashing(address, blinkRandom)) {
                return;
            }
            this.registerAnimation(data.location, blink, address);
        },1000*0.5);
    }
    setAnimated(address: string) {
        this.dataCenterGroup.eachLayer(layer => {
            let options = layer.options;
            let title = options.title;
            if (title == address) {
                layer.options.animated = false;
                return;
            }
        });
    }
    registerAnimation(location: Object, className='change-twink-wx', title: string) {
        let icon = L.divIcon({
            iconSize: L.point(30, 30),
            iconAnchor: [-10, -10], //self icon size divide 4 minus datacenter icon size divide 2, then plus datacenter icon anchor.
            className: className
        });
        let marker = L.marker(location, {icon: icon, title: title}).addTo(this.map);
        setTimeout(() => {
            this.map.removeLayer(marker);
            this.setAnimated(title);
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