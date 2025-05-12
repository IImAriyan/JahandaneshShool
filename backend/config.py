"""
# Jahan Danesh School Backend
"""
"""
       Hello, this project is a website for *Jahan Danesh School*, and this part is the backend.  
     It is built using Python, with the Flask framework and a MySQL database for data storage.  
     The backend also integrates AI-powered features to enhance user experience and automate certain tasks.  
      These AI features may include intelligent recommendations, automated content analysis, or interactive  
         tools to support learning. The backend is designed to be lightweight, fast, and scalable,  
       ensuring a smooth experience for both students and administrators. APIs are exposed for front-end  
     integration, and security measures such as authentication and input validation are implemented to  
                                               protect user data.
"""
JWT = {
    "SECRET_KEY" : "2JSDFLH10AOSLD2018724KJAS",
    "ALGORITHM" :"HS256",
    "ACCESS_TOKEN_EXPIRE_MINUTES" : 30
}

API_ROUTES = {
    "USER" : {
        "USER_LIST" : [["GET"],"/api/v1/user/list"],
        "GET_USER" :  [["GET"],"/api/v1/user/get/<user_id>"],
    },
    "AUTHENTICATION" : {
        "LOGIN" : [["POST"],"/api/v1/login"],
    }
}