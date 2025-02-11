# Data Structure 
# DataBase
## Appointment
### appointment
```json
{
    "user" : {
        "username" : { type :  string , required : true   },
        "fullname" : { type :  string , required : true } ,
        "birddate" : { type :  string , required : true } ,
        "tel" : { type :  string , required : true } ,
        "email": { type :  string , required : true } ,
    } ,
    "kind" : { type :  string , required : false } ,
    "kind_name" : { type :  string , required : false } ,  
    "description" : { type :  string , required : false } ,
    "medic" : {
        "fullname" :{ type :  string , required : true } ,
        "id" : { type :  string , required : true } ,
        "department" : { type :  string , required : true } ,
        "department_name" : {
            "th": { type :  string , required : true } ,
            "en" : { type :  string , required : true } ,
    } ,
    "appointment_time" : { type :  date , required : true } ,
    "call_center" :{ type :  string , required : true } ,
    "status_code" : { type :  number , required : true } ,
    "status_name" : { type :  string , required : true } ,
    "key" : { type :  string , required : true ,  primary_key} ,
}
```
Sample data
```json
{
    "user" : {
        "username" : "" ,
        "fullname" : "adidas samba" ,
        "birddate" : "1997-03-01" ,
        "tel" : "0982346543",
        "email": "deaet@gamil.com" 
    } ,
    "kind" : "xxx" ,
    
    "description" :"okfkdsrewkfsjgejgeorjgoeijgijgoejgiregoer" ,
    "medic" : {
        "fullname" : "nike ducklow" ,
        "id" : "xxxx",
        "department" : "xxx"
    } ,
    "appointment_time" : "2025-02-09T09:00:00.000+07:00" , 
    "call_center" : "02-2222-333" ,
    "status_code" : 1 , 
    "status_name" : "xx",
    "key" : "2502090900"

}
```
### appointment_config
```json
{
    "status_code" : {type : string} ,
    "status_name" : {type : string} ,
}
```
### appointment_slot
```json
{

    "datetime" : {type : Date} ,
    "date" : {
        "y" :  {type : Number} ,
        "m" :  {type : Number} ,
        "d" :  {type : Number} ,
    }  ,
    "slots" : { type : array ,
         "object" : { 
            "slot" :  {type : number  } , 
            "time" : {type : string } ,
            "time_display" {type : string} , status : {type : string}  
            } 
    } ,
    "fullname" : { type :  string , required : true } ,
    "id" : { type :  string , required : true } ,
    "status" : { type :  string , required : true } // open , close ,full

}
```

## Authentication
### users
```json
    {
    "username" : {type : string} , 
    "name" : {
        "first" : {type : string} , 
        "last" : {type : string} , 
        "full_name" : {type : string} , 
    } ,
    "type" :  {type : string} , 
    }
```
### authentication
```json
    "username" : {type : string} , 
    "passwordHash" :  {type : string} , 
```
### token_session
```json
    "token" : {type : string} , 
    "refresh_token" : {type : string} , 
    "username" : {type : string} , 
```