import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AnalyseOrgs } from './analyse.orgs';

// @Injectable()
export class AnalyseService {
  orgs = [
    {id: 1, name: 'Bill', orgs: 15, errors: 12, site: 'www.google.com', status: 'Warning'},
    {id: 2, name: 'Jackson', orgs: 20, errors: 20, site: 'www.baidu.com', status: 'Error'},
    {id: 3, name: 'Allen', orgs: 2, errors: 0, site: 'www.github.com', status: 'Normal'},
    {id: 4, name: 'Kobe', orgs: 100, errors: 34, site: 'www.facebook.com', status: 'Normal'},
    {id: 5, name: 'Wade', orgs: 56, errors: 1, site: 'www.microsoft.com', status: 'Normal'},
    {id: 6, name: 'Howard', orgs: 98, errors: 0, site: 'www.oracle.com', status: 'Normal'},
    {id: 7, name: 'Jones', orgs: 8, errors: 3, site: 'www.qq.com', status: 'Warning'},
    {id: 8, name: 'Nash', orgs: 43, errors: 16, site: 'www.alipay.com', status: 'Error'},
    {id: 9, name: 'Pierce'},
    {id: 10, name: 'Bill'},
    {id: 11, name: 'Mr. Nice', power: 'fly', salary: '$400'},
    {id: 12, name: 'Narco'},
    {id: 13, name: 'Bombasto'},
    {id: 14, name: 'Celeritas'},
    {id: 15, name: 'Magneta'},
    {id: 16, name: 'RubberMan'},
    {id: 17, name: 'Dynama'},
    {id: 18, name: 'Dr IQ'},
    {id: 19, name: 'Magma'},
    {id: 20, name: 'Tornado'}
  ];
  getOrgs() {
    return this.orgs;
  }
}