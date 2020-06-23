import { Component, OnInit, ViewChild } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction';
import { BoletoService } from 'src/app/services/boleto.service';
import { Boleto } from 'src/app/shared/boleto.model';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-calendario-boleto',
  templateUrl: './calendario-boleto.component.html',
  styleUrls: ['./calendario-boleto.component.css']
})
export class CalendarioBoletoComponent implements OnInit {

  constructor(
    private boletoService:BoletoService
    ) { }

  @ViewChild('calendar',{static:true}) calendarComponent: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin,bootstrapPlugin,interactionPlugin];
  locales = [ptLocale]
  eventos = [];

  ngOnInit() {
    this.boletoService.listarTodosBoletos().subscribe((res) => this.eventos = this.populaEventos(res))
    
  }

  populaEventos(boletos:Boleto[]){
    let eventos = []
    let dataVencimento
    boletos.forEach((b) => {
      dataVencimento = moment(b.dtVencimento, "YYYY-MM-DD").format("YYYY-MM-DD")
      if(b.status == 'PAGO'){
        eventos.push({title: b.nome, date: dataVencimento,backgroundColor: '#28a745',textColor:'white' })
      }else{
        eventos.push({title: b.nome, date: dataVencimento,backgroundColor: '#dc3545',textColor:'white',borderColor:'#dc3545' })
      }
      
    });
    return eventos;
  }
  createEvent(event){
    var cell:HTMLElement = event.el;
    cell.onclick = (ev:MouseEvent) => {
      this.addEvento(event.date);      

    }
  }
  addEvento(date: any) {
    this.eventos = this.eventos.concat({title: 'teste', date: date})
  }

  

}
