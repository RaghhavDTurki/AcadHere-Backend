# College-Application

To install development dependencies\
``` npm install --dev ```\
\
To install development dependencies\ 
``` npm install ```

To run the project locally:
- `npm run build` to recompile the project using typescipt
- `npm start` to recompile and start the server
- `npm dev` to start server using nodemon
<br>

To test it locally go to ```http://localhost:8080/```

1. To GET the list of CP Contests:
Make a GET request to ```http://localhost:8080/cp_reminder/```

2. To Access the Notice Board API \
    Go to ```https://backend-clg-app.herokuapp.com/notice_board/```\
    Notice Message Schema:
    1. Message(Required)
    2. Status(Required)
     <br>
    * To POST a message, make a POST request to ```https://backend-clg-app.herokuapp.com/notice_board/```
    * To GET all messages, make a GET request to ```https://backend-clg-app.herokuapp.com/notice_board/```
    * To GET a single message, make a GET request, pass the id as the parameter, for example ```https://backend-clg-app.herokuapp.com/notice_board/?id=TheMessageID```
    * To UPDATE a single message, make a PATCH request to ```https://backend-clg-app.herokuapp.com/notice_board/TheMessageID```
    * To DELETE a single message, make a DELETE request to ```https://backend-clg-app.herokuapp.com/notice_board/TheMessageID```

- Resources Schema: 
	1. Url(Required)
	2. Subject_Code(Optional)
	3. Message(Required)
	4. Resources_Type( Should be either Video, Notes or Ebook or Course )(Required)


3. To Access the Video Resources API 
    Go to ```https://backend-clg-app.herokuapp.com/resources/videos/``` 
    * To POST a video, make a POST request to ```https://backend-clg-app.herokuapp.com/admin/resources/videos/```
    * To GET all videos, make a GET request to ```https://backend-clg-app.herokuapp.com/resources/videos/```
    * To GET a single video, make a GET request, pass the id as the parameter, for example ```https://backend-clg-app.herokuapp.com/resources/videos/?id=TheVideoID```
    * To UPDATE a single video, make a PATCH request to ```https://backend-clg-app.herokuapp.com/admin/resources/videos/TheVideoID```
    * To DELETE a single video, make a DELETE request to ```https://backend-clg-app.herokuapp.com/admin/resources/videos/TheVideoID```

4. To Access the Notes Resources API 
    Go to ```https://backend-clg-app.herokuapp.com/resources/notes/``` 
    * To POST a notes resource, make a POST request to ```https://backend-clg-app.herokuapp.com/admin/resources/notes/```
    * To GET all notes, make a GET request to ```https://backend-clg-app.herokuapp.com/resources/notes/```
    * To GET a single notes resource, make a GET request, pass the id as the parameter, for example ```https://backend-clg-app.herokuapp.com/resources/notes/?id=TheNotesID```
    * To UPDATE a single notes resource, make a PATCH request to ```https://backend-clg-app.herokuapp.com/admin/resources/notes/TheNotesID```
    * To DELETE a single notes resource, make a DELETE request to ```https://backend-clg-app.herokuapp.com/admin/resources/notes/TheNotesID```

5. To Access the Ebooks Resources API 
    Go to ```https://backend-clg-app.herokuapp.com/resources/ebooks/``` 
    * To POST an ebooks resource, make a POST request to ```https://backend-clg-app.herokuapp.com/admin/resources/ebook/```
    * To GET all ebooks, make a GET request to ```https://backend-clg-app.herokuapp.com/resources/ebooks/```
    * To GET a single ebook resource, make a GET request, pass the id as the parameter, for example ```https://backend-clg-app.herokuapp.com/resources/ebooks/?id=TheEbooksID```
    * To UPDATE a single ebooks resource, make a PATCH request to ```https://backend-clg-app.herokuapp.com/admin/resources/ebooks/TheEbooksID```
    * To DELETE a single ebooks resource, make a DELETE request to ```https://backend-clg-app.herokuapp.com/admin/resources/ebooks/TheEbooksID```

6. To Access the Courses Resources API 
Go to ```https://backend-clg-app.herokuapp.com/resources/courses/``` 
* To POST an ebooks resource, make a POST request to ```https://backend-clg-app.herokuapp.com/admin/resources/courses/```
* To GET all ebooks, make a GET request to ```https://backend-clg-app.herokuapp.com/resources/courses/```
* To GET a single ebook resource, make a GET request, pass the id as the parameter, for example ```https://backend-clg-app.herokuapp.com/resources/courses/?id=TheCourseID```
* To UPDATE a single ebooks resource, make a PATCH request to ```https://backend-clg-app.herokuapp.com/admin/resources/courses/TheCourseID```
* To DELETE a single ebooks resource, make a DELETE request to ```https://backend-clg-app.herokuapp.com/admin/resources/courses/TheCourseID```