import { Component,  OnInit,ViewChild,Output,EventEmitter } from '@angular/core';

import * as Chartist from 'chartist';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { FormBuilder, AbstractControl } from '@angular/forms';
import { comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
//For comment 
//import { TableData } from './../../md/md-table/md-table.component';
//Comment part 

declare var $: any;
declare interface Task {
  title: string;
  checked: boolean;
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}




//end of comment part

@Component({
  selector: 'app-adminreportdetails',
  templateUrl: './adminreportdetails.component.html',
  styleUrls: ['./adminreportdetails.component.css']
})
export class AdminreportdetailsComponent implements OnInit {
  favoriteSeason : string;
  posts$: Observable<comment[]>;
  selectedFile;
  hasParam;
  reportsData;
  hostNameValues: any = [ ];
  selfReferrel: any = [ ];
  Sessions: any = [ ];
  pageViewPlatform: any = [ ];
  pageViews: any = [ ];
  endDate: any = [ ];
  sessionsWithSearch: any = [ ];
  resultsFound: any = [ ];
  reportId;
  userRole;
  isCommentExists = true;
    //question
    @ViewChild("formDirective") formDirective: NgForm;
    @Output() create: EventEmitter<any> = new EventEmitter();
  
    form: FormGroup;
  
    isOpen = false;
    //questionend
  type : FormGroup;
// comment part 

//public tableData: TableData;

public tasks1: Task[];
public tasks2: Task[];
public tasks3: Task[];

//end of comment 

  constructor(private formBuilder: FormBuilder,  private authService: AuthService,
    private commentservice: CommentService,private router: Router,
    private route: ActivatedRoute) { }

 //comment part form
validTextType: boolean = false;


getDataFromUrl(){
  // id from url
  this.route.params.subscribe((data) => {
    this.hasParam = data['id'.toString()];
    this.reportId = data['reportId'.toString()];

    if(this.hasParam > 0){
       this.getReport();
       this.posts$ = this.fetchAll();
       
       //console.log(this.posts$[0].description);
    }
  });
 
}

getReport(){
  //getReports
  let report = {
    'userid':this.hasParam
  };

  this.authService.getReports(report).subscribe((res:any) => {
    console.log(res);
    res.result.forEach((item, index) => {
      this.hostNameValues.push(item.hostname);
      this.selfReferrel.push(item.self_Referral);
      this.Sessions.push(item.sessions);
      this.pageViewPlatform.push(item.pages_views_plateformes);
      this.pageViews.push(item.page_views);
      this.endDate.push(item.enddate);
      this.sessionsWithSearch.push(item.Sessions_with_Search);
      this.resultsFound.push(item.Results_Found);
      
      });

    this.roundedLineChart();
    this.straightLinesChart();
    this.colouredRoundedLineChart();
    this.colouredBarsChart();
    this.chartPreferences();
    this.simpleBarChart();
    this.multipleBarsChart();
    // this.reportsData = res.result;
  });
}

  roundedLineChart(){
    /* ----------==========    Rounded Line Chart initialization    ==========---------- */
      const dataRoundedLineChart = {
        labels: ['Host Name'],
        series:[this.hostNameValues]
    };


      const optionsRoundedLineChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 10
        }),
        axisX: {
            showGrid: false,
        },
        // low: 0,
        // high: 43124, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
        showPoint: false,
        showLine: true
    };

    const RoundedLineChart = new Chartist.Line('#roundedLineChart', dataRoundedLineChart, optionsRoundedLineChart);
    this.startAnimationForLineChart(RoundedLineChart);
  }

  straightLinesChart(){
     /*  **************** Straight Lines Chart - single line with points ******************** */

     const dataStraightLinesChart = {
      labels: ['Self Referrel'],
      series: [
        this.selfReferrel
      ]
    };

    const optionsStraightLinesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
      
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
        classNames: {
            point: 'ct-point ct-white',
            line: 'ct-line ct-white'
        }
    };

    const straightLinesChart = new Chartist.Line('#straightLinesChart', dataStraightLinesChart,
     optionsStraightLinesChart);

    this.startAnimationForLineChart(straightLinesChart);
  }

  colouredRoundedLineChart(){
    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */
  
  
    const dataColouredRoundedLineChart = {
      labels: ['Sessions'],
      series: [this.Sessions]
    };
  
    const optionsColouredRoundedLineChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 10
      }),
      axisY: {
          showGrid: true,
          offset: 40
      },
      axisX: {
          showGrid: false,
      },
      showPoint: true,
      height: '300px'
    };
  
    const colouredRoundedLineChart = new Chartist.Line('#colouredRoundedLineChart', dataColouredRoundedLineChart,
     optionsColouredRoundedLineChart);
  
    this.startAnimationForLineChart(colouredRoundedLineChart);
  }

  colouredBarsChart(){
    
    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */


    const dataColouredBarsChart = {
      labels: ['Page View Platform'],
      series: [
        this.sessionsWithSearch
      ]
    };

    const optionsColouredBarsChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 10
      }),
      axisY: {
          showGrid: true,
          offset: 40
      },
      axisX: {
          showGrid: false,
      },
      showPoint: true,
      height: '300px'
    };


    const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
     optionsColouredBarsChart);

    this.startAnimationForLineChart(colouredBarsChart);

  }

  chartPreferences(){
    
    /*  **************** Public Preferences - Pie Chart ******************** */

    const dataPreferences = {
      labels: ['Page Views'],
      series: [this.pageViews]
  };

  const optionsPreferences = {
      height: '230px'
  };

  new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

  /*  **************** Simple Bar Chart - barchart ******************** */
  }

  simpleBarChart(){
    const dataSimpleBarChart = {
      labels: ['End Date'],
      series: [
        this.endDate
      ]
    };

    const optionsSimpleBarChart = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      }
    };

    const responsiveOptionsSimpleBarChart: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];

    const simpleBarChart = new Chartist.Bar('#simpleBarChart', dataSimpleBarChart, optionsSimpleBarChart,
     responsiveOptionsSimpleBarChart);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(simpleBarChart);
  }


  multipleBarsChart(){
    const dataMultipleBarsChart = {
      labels: ['Sessions with search'],
      series: [this.sessionsWithSearch]
    };

    const optionsMultipleBarsChart = {
        seriesBarDistance: 10,
        axisX: {
            showGrid: false
        },
        height: '300px'
    };

    const responsiveOptionsMultipleBarsChart: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];

    const multipleBarsChart = new Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart,
     optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(multipleBarsChart);
  }


isFieldValid(form: FormGroup, field: string) {
  return !form.get(field).valid && form.get(field).touched;
}


onType() {
  if (this.type.valid) {
  } else {
    this.validateAllFormFields(this.type);
  }
}

onUpload(event) {
  console.log(event);
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  this.authService.upload(formData).subscribe((res) => {
      this.selectedFile = res.file;
      console.log(res);
   })
  
  // this.getUrlFromS3Server();
}

validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}

//end of commnet part form 


  startAnimationForLineChart(chart: any) {
    let seq: number, delays: number, durations: number;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function(data: any) {

      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
}
startAnimationForBarChart(chart: any) {
    let seq2: number, delays2: number, durations2: number;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data: any) {
      if (data.type === 'bar') {
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
}


ngOnInit() {
this.userRole = localStorage.getItem('takwa-user-role');
   
  this.getDataFromUrl();

     //comment part 

    /*
    this.tableData = {
      headerRow: ['ID', 'Name', 'Salary', 'Country'],
      dataRows: [
          ['1', 'Dakota Rice', '$36,738', 'Niger'],
          ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
          ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
          ['4', 'Philip Chaney', '$38,735', 'Korea, South']
      ]
   };
   */

 this.tasks1 = [
   { title: 'Numbers are looking great so far?\'', checked: false },
   { title: 'Great dashboard for isolating seasonal trends?', checked: true },
   {
     title: 'Great results!',
     checked: true
   },
   { title: 'Create 4 Invisible test robots crowlers you Never Knew About', checked: false }
 ];
 this.tasks2 = [
    {
        title: `Flooded: One year later, assessing what was lost and
         what was found when a ravaging rain swept through metro Detroit`,
        checked: true
    },

    { title: 'Sign contract for \'What are conference organizers afraid of?\'', checked: false },
 ];
this.tasks3 = [

   { title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: false },
   {
     title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
     checked: true
   },
   { title: 'Sign contract for \'What are conference organizers afraid of?\'', checked: false }
];


   




   


    








   

    this.form = this.createFormGroup();



}
 //comment part form
 
 textValidationType(e){
  if (e) {
      this.validTextType = true;
  }else{
    this.validTextType = false;
  }
}




createFormGroup(): FormGroup {
  return new FormGroup({
  
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
    ]),
    // defaultcomment: new FormControl("", [
    //   Validators.required,
    //   Validators.maxLength(30000),
    // ]),
    picture: new FormControl("", [
      Validators.required,
      Validators.maxLength(30000),
    ]),
    defaultcomment: this.formBuilder.array([])
  });
}

onChange(value:string, isChecked: boolean) {
  const emailFormArray = <FormArray>this.form.controls.defaultcomment;

  if(isChecked) {
    emailFormArray.push(new FormControl(value));
  } else {
    let index = emailFormArray.controls.findIndex(x => x.value == value)
    emailFormArray.removeAt(index);
  }
  
  // console.log(emailFormArray);
}

onSubmit(formData: Pick<comment, "description" | "defaultcomment"| "picture" | "reportId" | "userid"  >): void {

  formData.picture = this.authService.ImageUrl+'/uploads/'+this.selectedFile;
  formData.reportId = this.reportId;
  formData.userid = this.hasParam;
  let defaultcommentValues = '';
  formData.defaultcomment.forEach(element => {
    defaultcommentValues+=element+'<br>';
  });
  formData.defaultcomment = defaultcommentValues;
  //  console.log(formData);return;
  this.commentservice
    .createcomment(formData, this.authService.userId)
    .pipe(first())
    .subscribe(() => {
      this.create.emit(null);
    });
    this.fetchAll();
  this.form.reset();
  this.formDirective.resetForm();

  this.router.navigate(["adminreportdetail/"+this.hasParam+'/'+this.reportId]);
}


fetchAll(): Observable<comment[]> {

  let comment =  this.commentservice.fetchAll(this.reportId);

  comment.forEach((element) => {
    if(element.length > 0){
     this.isCommentExists = false; 
    }
  });

  return comment;

}


delete(commentId: Pick<comment, "id">): void {
  this.commentservice
    .deleteComment(commentId)
    .subscribe(() => {this.posts$ = this.fetchAll();this.isCommentExists = true;});
}


}
