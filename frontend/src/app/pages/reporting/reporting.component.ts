import { Component, OnInit } from '@angular/core';
import{Chart} from 'chart.js';
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  constructor() { }
tasksPieChart=[];
tasksDeliverdOnTimeChart = []; 

  ngOnInit(): void {
/**
 * pourcentage of completion of every phase 
 */
   
    this.tasksPieChart = new Chart('pieChart1' , {
      type: 'pie',
      data: {
        labels: ["Pas mis en oeuvre", "En Cours", "Terminé "], 
        datasets:[{
          label:'Vote Now', 
          data : [9,11,12], // 9 : nbr de tache pas mis en oeuvre , 11 : nbr tache en cours , 12 : nbr tache terminé 
          backgroundColor:[
            '#f44336', 
            '#2BA8FF', 
            '#4CAF50', 
          ],
        }]
      },
      options: {
        title : {
          Text: "Bar Chart ",
          display:true
        }
      }
    }
    );

/**
 * 
 *   pourcentage of les taches validées avant la date limite
 */


    this.tasksDeliverdOnTimeChart = new Chart('pieChart2' , {
      type: 'pie',
      data: {
        labels: ["Taches Non Terminés Avant la date limite ",  "Taches Terminés Avant la date limite "], 
        datasets:[{
          label:'Vote Now', 
          data : [10,15], // 10 : nbr de Taches Non Terminés Avant la date limite , 15 : nbr de Taches  Terminés Avant la date limite
          backgroundColor:[
            '#f44336', 
            '#4CAF50', 
          ],
        }]
      },
      options: {
        title : {
          Text: "Bar Chart ",
          display:true
        }
      }
    }
    );
  



  }

}
