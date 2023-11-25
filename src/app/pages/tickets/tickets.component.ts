import { Component } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  infoSeleccionada = '';
  tickets: any[] = [];
  esProject = false;
  esGroup = false;
  

  constructor(private ticketService: TicketsService) {

   }

  //TRAER TODOS LOS TICKETS
  // cargarTickets(): void {
  //   this.ticketService.traerTodos().subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.tickets = data;
  //       this.infoSeleccionada = '';
  //     },
  //     (error) => {
  //       console.error('Error al cargar tickets:', error);
  //       this.infoSeleccionada = 'Error al cargar tickets.';
  //     }
  //   );
  // }
  botones=[
    {
      descripcion:"Traer todos",
      operadorUtilizado:"Traer",
      link: "https://tp-ticketera-six.vercel.app/api/tickets",
      resultado: null,
    },
    {
      descripcion:"Traer tickets pendientes",
      operadorUtilizado:"($eq)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/pendientes",
      resultado: null,
    },
    {
      descripcion:"Traer tickets no pendientes",
      operadorUtilizado:"($ne)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/nopendientes",
      resultado: null,
    },
    {
      descripcion:"Traer tickets pendientes de tipo alta",
      operadorUtilizado:"($and)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/and",
      resultado: null,
    },
    {
      descripcion:"Traer tickets resueltos o de tipo baja",
      operadorUtilizado:"($or)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/or",
      resultado: null,
    },
    {
  
      descripcion:"Tickets con codigo de empleato mayor a 12.000",
      operadorUtilizado:"($gt)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/gt",
      resultado: null,
    }
    ,
    {
      descripcion:"Tickets no resueltos y código de empleado mayor o igual a 12000",
      operadorUtilizado:"($nor y $gte)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/norGte",
      resultado: null,
    }
    ,
    {
      descripcion:"Encontrar tickets que tengan numero de canales menores a 200",
      operadorUtilizado:"($lt)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/lt",
      resultado: null,
    }
    ,
    {
      descripcion:"Tickets que tengan numero de canales menores o iguales a 213",
      operadorUtilizado:"($lte)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/lte",
      resultado: null,
    }
    ,
    {
      descripcion:"Encontrar tickets con beneficios 'HBO Max', 'Paramount+'",
      operadorUtilizado:"($all)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/all",
      resultado: null,
    }
    ,
    {
      descripcion:"Encontrar tickets cuyos clientes tengan correo",
      operadorUtilizado:"($exists - $lookup - $unwind)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/exists",
      resultado: null,
    }
    ,
    {
      descripcion:"Tickets que contengan la palabra 'alta' en la descripción del problema",
      operadorUtilizado:"($search, $text)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/textsearch",
      resultado: null,
    }
    ,
    {
      descripcion:"Encontrar tickets que tengan una derivacion",
      operadorUtilizado:"($size)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/size",
      resultado: null,
    }
    ,
    {
      descripcion:"tickets Pendientes con Código de Empleado Mayor a 12.000",
      operadorUtilizado:"($match, $project)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/match",
      resultado: null,
    }
    ,
    {
      descripcion:"Encontrar la cantidad Total de Beneficios",
      operadorUtilizado:"($unwind, $group)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/unwind",
      resultado: null,
    },
    {
      descripcion:"Encontrar tickets donde el cliente es además empleado.",
      operadorUtilizado:"($lookup)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/lookup",
      resultado: null,
    },
    {
      descripcion:"Tickets cuyas ubicaciones intersectan con la región alrededor de la UTN Mitre",
      operadorUtilizado:"($geoIntersects)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/geoIntersects",
      resultado: null,
    },
    {
      descripcion:"Tickets derivados al departamento de cancelaciones y su solucion fue exitosa",
      operadorUtilizado:"($elemMatch)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/elemMatch",
      resultado: null,
    },
    {
      descripcion:"Tickets donde el cliente En Mardel o alrededores.",
      operadorUtilizado:"($geoWithin)",
      link: "https://tp-ticketera-six.vercel.app/api/tickets/geoWithin",
      resultado: null,
    }
  ]

  traerResultado(boton : any){
    if(boton.link=="https://tp-ticketera-six.vercel.app/api/tickets/match")
    {
      this.esProject=true;
    }
    else{
      this.esProject=false;
    }

    if(boton.link=="https://tp-ticketera-six.vercel.app/api/tickets/unwind")
    {
      this.esGroup=true;
    }
    else{
      this.esGroup=false;
    }
    this.botones.forEach(boton => {
      boton.resultado = null;
    });

    this.ticketService.getData(boton.link).subscribe((datos : any)=>{
      this.tickets = datos;
    });
    console.log(this.tickets);
  }

  mostrarInfo(info: string) {
    this.infoSeleccionada = info;
  }
}
