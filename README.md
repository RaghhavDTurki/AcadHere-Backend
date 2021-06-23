# College-Application

To install all dependencies 
``` npm i ```

To test it locally go to ```http://localhost:8080/```  

1. To GET the list of CP Contests: 
Make a GET request to ```http://localhost:8080/cp_reminder/```

2. To Access the Notice Board API 
    Go to ```http://localhost:8080/notice_board``` 
    Notice Message Schema: 
    1. Message(Required)
    2. Status(Required)
    * To POST a message, make a POST request to ```http://localhost:8080/notice_board```
    * To GET all messages, make a GET request to ```http://localhost:8080/notice_board```
    * To GET a single message, make a GET request, pass the id as the parameter, for example ```http://localhost:8080/notice_board/?id=TheMessageID```