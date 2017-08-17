import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import MapGeo from './map.geo';

@Injectable()
export class MapService {
	constructor(private http: Http) {
	}
	getAllInfo() {
        return MapGeo.map(obj => {
            let result = obj.results[0];
            return {
                address: result.formatted_address,
                location: result.geometry.location
            }
        });
    }
}