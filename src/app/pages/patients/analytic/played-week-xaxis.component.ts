import { Component, AfterViewInit, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../_services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-played-week-xaxis',
  template: `
    <div echarts [loading]="loading" [options]="options" class="echart"></div>
    <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }"></ngx-loading>
  `,
})
export class PlayedWeekXaxisComponent implements OnDestroy, OnInit {

  options: any = {};
  themeSubscription: any;

  loading = false;
  data: any = [];

  days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];

  constructor(private theme: NbThemeService, private api: ApiService) {
  }

  @Input() id_crianca: string;

  ngOnInit(): void {
    this.loading = true;

    var data = [
      {
        name: "Semana passada",
        date: moment().subtract(1, 'weeks').endOf('week').format("YYYY-MM-DD")
      },
      {
        name: "Essa semana",
        date: moment().endOf('week').format("YYYY-MM-DD")
      },
    ]

    this.CreateSeries(data);
  }

  InitAxis(legend, axis, series) {
    this.loading = false;
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: legend,
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: axis,
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: series,
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  CreateSeries(weeks): any {


    this.api.post("get-data-played-week", { id: this.id_crianca, data: weeks }).subscribe(res => {
      if (res.code === 1) {
        var legend = [];
        var axis = [];
        var series = [];

        var array_color = [];
        this.theme.getJsTheme().subscribe(config => {
          array_color.push(config.variables.info);
          array_color.push(config.variables.success);
          array_color.push(config.variables.warning);
          array_color.push(config.variables.danger);
          array_color.push(config.variables.primary);
          array_color.push(config.variables.fg);
        });

        res.data.forEach(d => {
          legend.push(d.name);

          axis.push(
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: array_color[res.data.indexOf(d)],
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
              axisPointer: {
                label: {
                  formatter: params => {
                    return (
                      'Minutos jogados  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                    );
                  },
                },
              },
              data: this.days,
            },
          );

          var _data = [];
          this.days.forEach(x => {
          var index = (this.days.indexOf(x)) - 6;
          var day = d.value.filter(_day => _day.day === index.toString());
            _data.push(day.length === 0 ? 0 : parseFloat(day[0].value))
          });

          series.push(
            {
              name: d.name,
              type: 'line',
              smooth: true,
              data: _data,
            }
          );

        });

        this.InitAxis(legend, axis, series);
      }
    });
  }
}
