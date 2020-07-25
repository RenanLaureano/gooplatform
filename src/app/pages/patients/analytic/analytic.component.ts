import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-analytic',
  styleUrls: ['./analytic.component.scss'],
  templateUrl: './analytic.component.html',
})
export class AnalyticComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  id_crianca;
  day = 0;

  days = [
    {
      name: "Hoje",
      value: 0
    },
    {
      name: "3 dias",
      value: 2
    },
    {
      name: "Uma semana",
      value: 6
    },
    {
      name: "Um mês",
      value: 29
    }
  ];

  ngOnInit() {
    this.id_crianca = this.route.snapshot.paramMap.get("id");
  }

  onChangeDay(e){
  }
}