import { Component, OnInit } from "@angular/core";
import { MapService } from '../Map/map.service';

@Component({
    selector: 'my-util',
    templateUrl: './util.component.html',
    styleUrls: ['./util.component.css']
})

export class UtilComponent implements OnInit {
    cityNames = [];
    cityData: string;
    constructor(private mapService: MapService) {}
    ngOnInit() {}
    beginQuery(names: string) {
        let reg = /\n|,|，/g;
        this.cityNames = names.split(reg).filter(val => {
            val = val.trim();
            return val.length > 0;
        });
        this.mapService.geocodeAll(this.cityNames).subscribe(data => {
            this.cityData = JSON.stringify(data);
        });
    }
}