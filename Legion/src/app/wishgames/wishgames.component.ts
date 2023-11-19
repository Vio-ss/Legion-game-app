import { AfterViewInit, Component, ViewChild, ViewEncapsulation, DoCheck } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component'
import { AddgameComponent } from '../addgame/addgame.component';
import { EditgameComponent } from '../editgame/editgame.component';

@Component({
  selector: 'app-wishgames',
  templateUrl: './wishgames.component.html',
  styleUrls: ['./wishgames.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WishgamesComponent {
  
  constructor(private sanitizer: DomSanitizer, private builder: FormBuilder, private service: AuthService,private toastr:ToastrService,private router: Router, private dialog: MatDialog) {
    let role=sessionStorage.getItem('role');
    this.SetAccesspermission();

  }
  customerlist: any;
  dataSource: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data: any[] = [];
  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;

  ngOnInit() {
    this.service.getwish().subscribe(data => {
      this.data = data;
    });
  }
  ngAfterViewInit(): void { 
  }
  Loadgame() {
    
    this.service.GetAllWish().subscribe(res => {
      this.customerlist = res;
      this.dataSource = new MatTableDataSource(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  SetAccesspermission() {
    this.service.Getaccessbyrole(this.service.getrole(), 'customer').subscribe(res => {
      this.accessdata = res;
      //console.log(this.accessdata);

      if(this.accessdata.length>0){
        this.haveadd=this.accessdata[0].haveadd;
        this.haveedit=this.accessdata[0].haveedit;
        this.havedelete=this.accessdata[0].havedelete;
        this.Loadgame();
      }else{
        alert('you are not authorized to access.');
        this.router.navigate(['']);
      }

    });
  }
  displayedColumns: string[] = ['code', 'name','category', 'Link', 'action'];
  removegame(id: any) {
    this.service.deletewish(id).subscribe({
      next: (val:any)=>{
        this.toastr.success('Deleted successfully.');
        this.Loadgame();
      },
      error:(err:any)=>{
        this.toastr.error('Error');
      }
    })
  }
  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }  
  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}
