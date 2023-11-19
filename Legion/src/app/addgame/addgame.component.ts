import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit{
  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<AddgameComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.service.getuserrole().subscribe(res => {
      this.rolelist = res;
    });

  }
  ngOnInit(): void {
  }
  rolelist: any;
  editdata: any;

  addform = this.builder.group({
    id: " ", 
    name: " ",
    category: " ",
    link: " ",
  });

  AddGame() {
    if(this.addform.valid){
      this.service.Addgame(this.addform.value).subscribe({
        next: (val:any)=>{
          this.toastr.success('Added successfully.');
          this.dialogref.close();
        },
        error:(err:any)=>{
          this.toastr.error('Error');
        }
      })
    }
  }

}
