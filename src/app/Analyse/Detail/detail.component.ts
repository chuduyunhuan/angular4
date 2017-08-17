import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { AnalyseService } from '../analyse.service';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
  id: number;
  vcds = [];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private analyseService: AnalyseService
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.id = params['id'])
      .subscribe(id => {
          this.vcds = this.analyseService.getOrgs().filter(obj => {
              return id == obj.id;
          });
      });
  }
  goBack(): void {
    this.location.back();
  }
}
