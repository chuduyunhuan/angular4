import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

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
    geocode(address: string): Observable<any> {
        let url = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
        return this.http
            .get(url + encodeURIComponent(address))
            .map(res => res.json())
            .catch(this.handleError)
            .map(data => {
                if(data.status != 'OK') { throw new Error('unable to geocode address'); }
                return data;
            });
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `$ {
                error.status
            } - $ {
                error.statusText || ''
            }
            $ {
                err
            }`;
        } else {
            errMsg = error.message ? error.message: error.toString();
        }
        // console.error(errMsg);
        return Observable.
            throw (errMsg);
    }
}