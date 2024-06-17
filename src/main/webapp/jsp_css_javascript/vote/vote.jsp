<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Singer Vote</title>
        <link rel="stylesheet" href="/Singer_Vote/jsp_css_javascript/vote/vote.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="/Singer_Vote/fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="/Singer_Vote/fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="/Singer_Vote/fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <script src="https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js"></script>
    </head>
    <body>
    <%ArrayList<ArrayList<String>> names_links_images = (ArrayList<ArrayList<String>>)request.getAttribute("data"); %>
        <div class="service" style="display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; right: 20px; position: fixed; bottom: 70px; z-index: 999;">
            <img class="service_child" src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/434718029_1118394646250167_1887933937683106884_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG4A31Lz7YHTKRD3miYbhh93BzFKgXz-uzcHMUqBfP67EUGtRYYJ10-INQHGfr7u8sd9B8TsBWu-tjS37g6oXFa&_nc_ohc=n9yXOyuxMVAAb55j1Zn&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfAAQiNPoJeAi8lJs1XF5xw5x6MOYx9X2u-rS9lwaomWCw&oe=662707A2" alt="" style="width: 50px; border-radius: 50%;">
            <i class="fa-solid fa-list service_child1"></i>
            <i class="fa-solid fa-plus service_child1"></i>
        </div>
        <div class="blur" style="position: fixed; z-index: -1; width: 100vw; height: 100vh; background-image: url(/Singer_Vote/jsp_css_javascript/vote/image.png); top: 0;left: 0;"></div>
        <div class="blur" style="position: fixed; z-index: -1; width: 100vw; height: 100vh; background-color: black; top: 0;left: 0; opacity: 0.6;"></div>
        <div class="text_header">
            <p>Vote For Your Singer You Love!</p>
        </div>
        <div class="change_img">
            
        </div>
        <div class="chart">
            
        </div>
        <div class="list_singer">
            <div class="input">
            	<i id="close_result" class="fa-solid fa-xmark"></i>
                <input type="text" placeholder="Your Singer:">
                <i class="fa-solid fa-magnifying-glass"></i>
                <div class="result_search">
                    <div class="content1">
                        <div class="content">
                            
                        </div>
                    </div>
                </div>
            </div>
            <p class="list_header">Stars In Years</p>
            <div class="list">
                <%
                	for (int i = 0; i < names_links_images.size(); i++){
                %>
                <div class="singer">
                    <img src="<%= names_links_images.get(i).get(2) %>" alt="" style="width: 250px; height: 150px;">
                    <p><%= names_links_images.get(i).get(0) %></p>
                </div>
                <%
                	}
                %>
            </div>
        </div>
        <div class="blur1"></div>
        <div class="singer_detail">
            <p id="name_detail" class="name">Son Tung MTP</p>
            <img id="img_detail" src="https://i.ytimg.com/vi/knW7-x7Y7RE/maxresdefault.jpg" alt="" style="width: 400px;">
            <a id="a_detail" class="a" href="https://vi.wikipedia.org/wiki/S%C6%A1n_T%C3%B9ng_M-TP">More infor about this singer.</a>
            <p id="number_detail" class="number">Votes Number: 100</p>
            <button>Vote Singer</button>
            <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="social">
            <img src="/Singer_Vote/img/facebook.png" alt="" style="height: 50px;">
            <img src="/Singer_Vote/img/instagram.png" alt="" style="height: 50px;">
            <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-twitter-inkythuatso-2-01-27-10-22-11.jpg" alt="" style="height: 50px; border-radius: 50%;">
        </div>
        <div class="list_voted">
            <p class="no_singer" style="position: absolute;
            font-size: 30px;
            text-decoration: underline;
            font-style: italic;
            width: 100%;
            text-align: center;
            top: 40vh;z-index: -1;">No Singer Voted By You!</p>
            <div class="list">
                
            </div>
        </div>
        <script type="text/javascript">
			var data = [];
			<%
				for (int i = 0; i < names_links_images.size(); i++){
			%>
				var list = [];
				list.push("<%=names_links_images.get(i).get(0) %>");
				list.push("<%=names_links_images.get(i).get(1) %>");
				list.push("<%=names_links_images.get(i).get(2) %>");
				data.push(list);
			<%
				}
			%>
		</script>
        <script src="/Singer_Vote/jsp_css_javascript/vote/vote.js"></script>
    </body>
</html>
    