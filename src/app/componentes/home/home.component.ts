import { Component, OnInit, ViewChild } from '@angular/core';
import { BoletoService } from 'src/app/services/boleto.service';
import { ChartType, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective, Color } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalVencidoHoje;
  totalVencido;
  totalAVencer;
  totalPago;
  chartType:ChartType = 'line'
  dataMesAno = [];
  dataValorTotal = [];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: Label = this.dataMesAno;
  public barChartType: ChartType = this.chartType;
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: this.dataValorTotal, label: 'Valor Total Mensal' }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: 'rgba(23,162,184,0.2)' },
  ]
  constructor(
    private boletoService: BoletoService
  ) { }



  ngOnInit() {

    this.boletoService.totalVencidoHoje().subscribe((res) => this.totalVencidoHoje = res);
    this.boletoService.totalVencido().subscribe((res) => this.totalVencido = res);
    this.boletoService.totalAVencer().subscribe((res) => this.totalAVencer = res);
    this.boletoService.totalPago().subscribe((res) => this.totalPago = res);
    this.boletoService.totalMes().subscribe((res) => this.buildLineBars(res))
  }

  buildLineBars(boletos) {

    boletos.forEach(
      (b) => {
        this.dataMesAno.push(b[0] + '/' +b[1])
        this.dataValorTotal.push(b[2])
      });

      //console.log(this.dataMesAno)
      //console.log(this.dataValorTotal)
  }
  

}
