import { Component, OnInit } from "@angular/core";
import { AnalyseService } from './analyse.service';
import {StringFilter} from "clarity-angular";
import { AnalyseOrgs } from './analyse.orgs';

class NameFilter implements StringFilter<AnalyseOrgs> {
    accepts(org: AnalyseOrgs, search: string):boolean {
        return org.name.toLowerCase().indexOf(search) >= 0;
    }
}

@Component({
    selector: 'analyse',
    templateUrl: './analyse.component.html',
    styleUrls: ['./analyse.component.css']
})

export class AnalyseComponent implements OnInit {
	orgs = [];
	pageSize: number = 10;
	private nameFilter = new NameFilter();
	constructor(private analyseService: AnalyseService) {};
	ngOnInit() {
		this.orgs = this.analyseService.getOrgs();
	}
}