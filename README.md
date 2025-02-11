# **Appointment Microservice**
# Overview Architecture
![alt text](image.png)
## **Users Service**
### Tool
 - Redis 
 - Mongodb
 - JWT
### Concept
![alt text](image-1.png)
![alt text](image-2.png)
```
- จะมี 2 token 
  1). Access Token คือ Token ไว้ใช้ Access Resource server 
  2). Refresh Token คือ ใช้ refresh Access Token
  ** Key 2 Token จะไม่มีเหมือน และเวลาหมดอายุก็ต่างกัน เช่น AccessToken มีอายุ 1 นาที RefreshToken จะมีอายุ 2 นาที
- token จะใช้ concept JWT ในการ Decode & Encode
- Database Design ให้แยกข้อมูลที่จะ Login กับ ข้อมูล uesr ออกจากกัน 
```
### DATABASE Design
```text
_________________________________
|--authentication[DB]            |
|----auth[Col] ใช้ไว้สำหรับ Login   |
|----users[Col] ข้อมูลโดยละเอียด    |
|________________________________|
```

## API ENDPOINT
### register
```
POST localhost:3001/users/register*
```
 ####  Request
```json
{
    "firstname" : "qaxsdf", 
    "lastname" :"mufrdsadong" , 
    "phone" : "098-234-6543" , 
    "type" : 0 , 
    "username" : "timber" ,
    "password" : "P@ssw0rd" , 
    "birthdate" : "1997-03-15"
}
```
### Response 200
```json
{
    "Message": "User registered successfully"
}
```
### Login 
```
POST localhost:3001/auth/login
```
####  Request
```json
{
    "username" : "timber1" ,
     "password" : "P@ssw0rd"
}
```
####  Response 200
```json
{"Message":"Login Success","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbWJlcjEiLCJ0eXBlIjoiQWNjZXNzVG9rZW4iLCJpYXQiOjE3MzkyODg1MTgsImV4cCI6MTczOTI4OTExOH0.4DBOqsKzW2zdXjgE0IfpMoPCgrUha4hEqi1Z6jz55is","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbWJlcjEiLCJ0eXBlIjoiQWNjZXNzVG9rZW4iLCJpYXQiOjE3MzkyODg1MTgsImV4cCI6MTczOTI4OTcxOH0.lyEOW-HxMmu5DSdsqCmk3744kCV65LBaqzSLrXkMjhw"}
```
## Appointment Serivce
### Concept
![alt text](image-4.png)

```
 - ใช้ AccessToken เพื่อ Appointment Serivce
 - ใช้ Redis เพื่อ Verfiy Queue ของแพทย์
 - Redis สามารถนำไปพัฒนาแสดงผล Queue ของแพทย์แบบ Realtime ได้
```
### DATABASE Design
```text
_________________________________________
|--appointment[DB]                      |
|----appointment[Col]                   |
|_______________________________________|
```
## API ENDPOINT

```
POST localhost:3001/auth/login
```
####  Request
```json
{
    "Authoirzation" : "Bearer <Access_token ของ user ที่จะทำการ Booking>"
}
```
```json
{
     "medic_id" : "Dr smith" ,
     "slot":"10:00" , 
     "notes" :"xx" , 
     "date" : "2025-02-15T10:00:00.000+07:00" 
}
```
```
Note
 - medic_id คือ username ของ user ที่เป็น type  1 ถ้าไม่มัีให้สร้างก่อนใช้งาน
 - ในตัวอย่างคือ user > timber1 จะ booking medic > Dr smith
```
 ####  Response
```json
{
    "Message":"Booking Success!",
    "data":{
        "_id":"11:30;20250215;Dr smith",
        "user":{
            "username":"timber1",
            "fullname":"111 mu312431r4frdsadong",
            "email":"-",
            "birthdate":"1997-03-15T00:00:00.000Z",
            "phone":"098-234-6543",
            "_id":"67ab73bf67be461ca7d784c7"},
            "medic":{
                "id":"Dr smith",
                "fullname":"111 mu312431r4frdsadong",
                "specialization":"test",
                "_id":"67ab73bf67be461ca7d784c8"
            },
            "slot":"11:30",
            "date":"2025-02-15T03:00:00.000Z",
            "status":"confirmed",
            "notes":"xx",
            "created_at":"2025-02-11T15:58:55.508Z",
            "updated_at":"2025-02-11T15:58:55.508Z",
            "__v":0
                }
        }
```


## Deployment

