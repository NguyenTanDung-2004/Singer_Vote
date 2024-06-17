<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="utf-8"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Singer Vote</title>
        <link rel="stylesheet" href="/Singer_Vote/jsp_css_javascript/home/home.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="/Singer_Vote/fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="/Singer_Vote/fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="/Singer_Vote/fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    </head>
    <body>
        <div class="header">
            <div class="logo">
                <img src="/Singer_Vote/img/image.png" style="height: 80px;" alt="">
                <p>The Best Singer</p>
            </div>
            <button id="login_header">Login</button>
        </div>
        <div class="main">
            <p class="top text">Vote For Your Singer</p>
            <p class="bottom text">Now you can visit our website to vote for your idol as the winner.</p>
            <button>Explore</button>
        </div>
        <div class="contact">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-twitter"></i>
        </div>
        <div class="blur"></div>
        <div class="login">
            <div class="logo">
                <img src="/Singer_Vote/img/image.png" style="height: 60px;" alt="">
            </div>
            <div class="text1">
                <p>Sign in to vote.</p>
            </div>
            <div class="input">
                <input type="email" class="email" placeholder="Your Email:">
                <div>
                    <input type="password" class="password" placeholder="Your Password:">
                    <i id="eye_login" class="fa-solid fa-eye-slash eye"></i>
                </div>
                <p>Forgot password?</p>
            </div>
            <div class="button">
                <button class="button1">Login Now</button>
                <div class="google button1">
                    <img src="/Singer_Vote/img/google.png" height="15px" alt="">
                    <p>Continue with Google</p>
                </div>
                <div class="text">
                    <p class="p1">Don't have an account?</p>
                    <p class="p2">Sign up</p>
                </div>
            </div>
            <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="signup">
            <div class="logo">
                <img src="/Singer_Vote/img/image.png" style="height: 60px;" alt="">
            </div>
            <div class="text1">
                <p>Sign up to vote.</p>
            </div>
            <div class="input">
                <input type="email" class="email" placeholder="Your Email:">
                <i id="eye_signup" class="fa-solid fa-eye-slash eye"></i>
            </div>
            <div class="button">
                <button>Continue</button>
                <div class="text">
                    <p class="p1">Have an account?</p>
                    <p class="p2">Login</p>
                </div>
            </div>
            <div class="successfull" style="color: green; position: absolute; bottom: 40px; width: 100%; text-align: center; display: none;">Sign up successfully!</div>
            <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="forgot">
            <div class="logo">
                <img src="/Singer_Vote/img/image.png" style="height: 60px;" alt="">
            </div>
            <div class="text1">
                <p>Reset your password.</p>
            </div>
            <div class="input">
                <input type="email" class="email" placeholder="Your Email:">
                <i id="eye_forgot" class="fa-solid fa-eye-slash eye"></i>
            </div>
            <div class="button">
                <button>Continue</button>
                <div class="text">
                    <p class="p1">Remembered your password?</p>
                    <p class="p2">Login</p>
                </div>
            </div>
            <i class="fa-solid fa-xmark"></i>
            <div class="successfull" style="color: green; position: absolute; bottom: 40px; width: 100%; text-align: center; display: none;">Reset password successfully!</div>
        </div>
        <a id="a_continue_google" href="https://accounts.google.com/o/oauth2/auth?scope=email%20profile&redirect_uri=http://localhost:8080/Singer_Vote/login_google&response_type=code&client_id=340019636522-crdnrukiefhjooeipk8jfoht42k4ttji.apps.googleusercontent.com&approval_prompt=force"></a> 
        <script src="/Singer_Vote/jsp_css_javascript/home/home.js"></script>
        <script src="/Singer_Vote/jsp_css_javascript/home/send_request.js"></script>
    </body>
</html>