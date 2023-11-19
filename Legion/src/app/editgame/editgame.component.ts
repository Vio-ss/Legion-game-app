import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editgame',
  templateUrl: './editgame.component.html',
  styleUrls: ['./editgame.component.css']
})
export class EditgameComponent {
  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<EditgameComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.service.getuserrole().subscribe(res => {
      this.rolelist = res;
    });

  }
  ngOnInit(): void {
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }
  }
  rolelist: any;
  editdata: any;

  editform = this.builder.group({
    id: " ", 
    name: " ",
    category: " ",
    link: " "
  });

  loaduserdata(code: any) {
    this.service.GetGamebyCode(code).subscribe(res => {
      this.editdata = res;
      console.log(this.editdata);
      this.editform.setValue({
        id: this.editdata.id, name: this.editdata.name,
        category: this.editdata.category, link: this.editdata.link
      });
    });
  }
  UpdateGame() {
    this.service.updategame(this.editform.value.id, this.editform.value).subscribe(res => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }
}
