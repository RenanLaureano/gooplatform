import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../_services/api.service';
@Component({
  selector: 'ngx-time-per-place-pie',
  template: `
    <div echarts [loading]="loading" [options]="options" [merge]="updateOptions" class="echart"></div>
    <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }"></ngx-loading>
  `,
})
export class TimePerPlacePieComponent implements OnDestroy, OnInit {

  options: any = {};
  updateOptions: any = {};
  themeSubscription: any;

  loading = false;
  data: any = [];
  comodos = ['Banheiro', 'Cozinha', 'Farmacia', 'LadoFora', 'Quarto', 'Sala'];

  @Input()
  id_crianca: string;
  @Input()
  day: string;

  constructor(private theme: NbThemeService, private api: ApiService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.api.post("get-data-time-places", { id: this.id_crianca, days: this.day }).subscribe(res => {
      if (res.code === 1) {

        this.data = res.data;

        if (this.data.length < 6) {
          this.comodos.forEach(c => {
            if (!this.isHave(c)) {
              this.data.push({ name: c, value: 0 });
            }
          });
        }

        this.InitPie();
      }
    });
  }

  ChangePie(id_crianca, day) {
    this.loading = true;
    this.api.post("get-data-time-places", { id: id_crianca, days: day }).subscribe(res => {
      if (res.code === 1) {

        this.data = res.data;

        if (this.data.length < 6) {
          this.comodos.forEach(c => {
            if (!this.isHave(c)) {
              this.data.push({ name: c, value: 0 });
            }
          });
        }

        this.updateOptions = {
          series: [{
            data: this.data
          }]
        };

        this.loading = false;
      }
    });
  }

  InitPie() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight, colors.fg],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Banheiro', 'Farmacia', 'Sala', 'Cozinha', 'Quarto', 'LadoFora'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Minutos',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  isHave(value): boolean {

    var b = false;
    this.data.forEach(d => {
      if (d.name === value)
        b = true;
    });

    return b;
  }
}
