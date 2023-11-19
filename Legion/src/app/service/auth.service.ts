import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:3000/user';
  api='http://localhost:3000/customer';
  api1='http://localhost:3000/savedgames';
  api2='http://localhost:3000/wishedgames';

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }
  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  Getall(){
    return this.http.get(this.apiurl);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer(){
    return this.http.get('http://localhost:3000/customer');
  }
  GetAllSaves(){
    return this.http.get('http://localhost:3000/savedgames');
  }
  GetAllWish(){
    return this.http.get('http://localhost:3000/wishedgames');
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }
  Addgame(data: any){
    return this.http.post('http://localhost:3000/customer', data)
  }
  updategame(id:any,data:any){
    return this.http.put(this.api+'/'+id,data);
  }
  GetGamebyCode(id:any){
    return this.http.get(this.api+'/'+id);
  }
  deletegame(id: any){
    return this.http.delete(this.api+'/'+id);
    
  }
  deletesaves(id: any){
    return this.http.delete(this.api1+'/'+id);
  }
  savegame(id: any, name:any, category:any,year:any,mode:any,size:any, link:any){
    return this.http.post(this.api1, {id:id, name:name, category:category,year:year,mode:mode,size:size, link:link})
  }
  getsaves(): Observable<any[]>{
    return this.http.get<any[]>(this.api1);
  }
  getwish(): Observable<any[]>{
    return this.http.get<any[]>(this.api2);
  }
  wishgame(id: any, name:any, category:any,year:any,mode:any,size:any, link:any){
    return this.http.post(this.api2, {id:id, name:name, category:category,year:year,mode:mode,size:size, link:link})
  }
  deletewish(id: any){
    return this.http.delete(this.api2+'/'+id);
  }
}
