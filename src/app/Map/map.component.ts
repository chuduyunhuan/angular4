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
            let marker = L.marker(location, {icon: icon, title: address, opacity: 0.8}).addTo(this.dataCenterGroup);
            this.registerMarkerClick(marker, address);
        });
        this.map.addLayer(this.dataCenterGroup);
    }
    registerMarkerClick(marker: any, address: string) {
        this.modalInfo.address = address;
        let start = ~~(Math.random()*(19 - 0) + 0);
        let end = ~~(Math.random()*(19 - 0) + 0);
        let order = this.exchange(start, end);
        this.vcds = this.analyseService.getOrgs().slice(order[0], order[1]);
        this.siteChecked = this.vcds[0].site;
        marker.bindPopup(this.createHtml(), {maxWidth: 800});
    }
    createHtml() {
        let vcdHtml = ``;
        this.vcds.map((vcd, index) => {
            let first = ``;
            if(index == 0) {
                first = `<input type="radio" style="margin: 5px;" checked data-site="${vcd.site}" onclick="
                            let doms = document.querySelectorAll('[type=radio]');
                            for(let i = 0, len = doms.length; i < len; ++i) {
                                doms[i].checked = false;
                                this.checked = true;
                            }
                        " 
                        />`;
            }else {
                first = `<input type="radio" style="margin: 5px;" data-site="${vcd.site}" onclick="
                            let doms = document.querySelectorAll('[type=radio]');
                            for(let i = 0, len = doms.length; i < len; ++i) {
                                doms[i].checked = false;
                                this.checked = true;
                            }
                        " 
                        />`;
            }
            vcdHtml += `
                <div class="vcd-info-style">
                        <div class="bottom-border">
                            <div class="row" style="margin-left: -22px;">` +
                                first +
                                `
                                <h5 style="margin-top: -2px;">${vcd.name}</h5>
                            </div>
                            <h5 style="margin-top: 0;"><span>${vcd.site}</span></h5>
                        </div>
                        <div class="bottom-border">
                            <h5><span>${vcd.orgs}</span></h5>
                        </div>
                        <div class="bottom-border">
                            <h5><span>${vcd.errors}</span></h5>
                        </div>
                        <div>
                            <h5>
                                <span class="badge badge-danger"></span>
                                <span>${vcd.status}</span>
                            </h5>
                        </div>
                </div>
            `
        });
        let html = `
            <div aria-hidden="true">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Site Overview - ${this.modalInfo.address}</h3>
                    </div>
                    <div class="modal-body row row-nowrap" >
                        <div class="vcd-info-style">
                            <div><h5><b>DR vCD </b></h5></div>
                            <div><h5><b># of Orgs </b></h5></div>
                            <div><h5><b># of Replications in Error </b></h5></div>
                            <div><h5><b>System Status </b></h5></div>
                        </div>
                        ` +
                        vcdHtml +
                        `
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" onclick="
                            let doms = document.querySelectorAll('[type=radio]');
                            let site = '';
                            for(let i = 0, len = doms.length; i < len; ++i) {
                                let chosen = doms[i].checked;
                                if(chosen == true) {
                                    site = doms[i].getAttribute('data-site');
                                    break;
                                }
                            }
                            if(site) window.open('http://' + site);
                        " >Enter</button>
                    </div>
                </div>
            </div>
        `;
        return html;
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