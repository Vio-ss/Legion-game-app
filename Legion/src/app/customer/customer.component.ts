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
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerComponent implements DoCheck{
  title = 'authentication';
  isnotadmin=false;
  isadmin=false;

  constructor(private sanitizer: DomSanitizer, private builder: FormBuilder, private service: AuthService,private toastr:ToastrService,private router: Router, private dialog: MatDialog) {
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
      this.isnotadmin=false;
    }
    this.SetAccesspermission();

  }

  ngDoCheck(): void {
    let currentroute = this.router.url;
    let role=sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isadmin=true;
      this.isnotadmin = false;
    }else{
      this.isadmin=false;
      this.isnotadmin = true;
    }
  }
  customerlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;
  issaved=false;
  isnotsaved=false;

  ngAfterViewInit(): void {

  }
  Loadgame() {
    this.service.GetAllCustomer().subscribe(res => {
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
  displayedColumns: string[] = ['code', 'name','category', 'year','mode', 'size', 'Link', 'action'];

  addgame() {
    if(this.haveadd){
      this.OpenAdd('100ms', '600ms');
    }else{
      this.toastr.warning("You don't have access for Create")
    }
  }
  OpenAdd(enteranimation: any, exitanimation: any) {
    const popup = this.dialog.open(AddgameComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
    });
    popup.afterClosed().subscribe(res => {
      this.Loadgame();
    });
  }
  removegame(id: any) {
    if(this.havedelete){
      this.service.deletegame(id).subscribe({
        next: (val:any)=>{
          this.toastr.success('Deleted successfully.');
          this.Loadgame();
        },
        error:(err:any)=>{
          this.toastr.error('Error');
        }
      });
      this.service.deletesaves(id).subscribe({
        next: (val:any)=>{
          this.toastr.success('Deleted user saved successfully.');
          this.Loadgame();
        },
        error:(err:any)=>{
          this.toastr.error('Error');
        }
      });
   }else{
     this.toastr.warning("You don't have access for Delete")
   }
  }
  updategame(code: any) {

    if(this.haveedit){
       this.OpenEdit('100ms', '600ms');
    }else{
      this.toastr.warning("You don't have access for Edit")
    }

  }
  OpenEdit(enteranimation: any, exitanimation: any) {
    const popup = this.dialog.open(EditgameComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
    });
    popup.afterClosed().subscribe(res => {
      this.Loadgame();
    });
  }
  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  savegame(id:any, name:any, category:any,year:any,mode:any,size:any, link:any){
    this.service.savegame(id, name, category,year,mode,size, link).subscribe({
      next: (val:any)=>{
        this.toastr.success('Saved successfully.');

      },
      error:(err:any)=>{
        this.toastr.error('Error');
      }
    })
  }
  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
