var close_singer_detail = document.querySelector("body .singer_detail i");
var box_detail = document.querySelector("body .singer_detail");
var blur1 = document.querySelector("body .blur1");
close_singer_detail.addEventListener("click", () => 
    {
        box_detail.style.scale = "0";
        blur1.style.display = "none";
        button_vote.innerHTML = "Vote Singer";
        button_vote.style.backgroundColor = "#6a994e";
        button_vote.style.color = "black";
    }
)
// thay đổi hình ảnh.
function create_img_array(data){
	var img_array1 = [];
    for (var i = 0; i < data.length; i++){
        img_array1.push(data[i][2]);
    }
    return img_array1;
}
var img_array = create_img_array(data);
//console.log(data);
//var img_array = create_img_array();
var event_img = document.querySelector("body .change_img");
document.addEventListener("DOMContentLoaded", function () {
    function applyAnimation(index) {
        setTimeout(function () {
            if (index < img_array.length - 1) {
                event_img.style.backgroundImage = "url(" + img_array[index + 1] + ")";
                event_img.style.backgroundSize = "cover";
                applyAnimation(index + 1);
            } else {
            // If it's the last element, restart the animation loop
                event_img.style.backgroundImage = "url(" + img_array[0] + ")";
                event_img.style.backgroundSize = "cover";
                setTimeout(function () {
                    applyAnimation(0);
                }, 0); // Delay before restarting the animation
            }
        }, 5000); // Duration of animation in milliseconds (same as animation-duration)
    }

    applyAnimation(0); // Start the animation with the first element
});
// click hiển thị singer box.
var id_singer; // id_singer dùng để lấy ra id_singer khi hiển thị box detail
var singer_list = document.querySelectorAll("body .list_singer .list .singer");
for (var i = 0; i < singer_list.length; i++) {
    (function(index) {
        singer_list[index].addEventListener('click', () => {
            // Gọi hàm get_number_vote_of_singer với một callback để thực hiện các thao tác sau khi hoàn thành
            id_singer = index;
            get_number_vote_of_singer(index, () => {
                // Thực hiện các thao tác sau khi get_number_vote_of_singer chạy xong
                box_detail.style.scale = "1";
                blur1.style.display = "block";
                set_data_for_detail(index);
            });
        });
    })(i);
}
// set data for detail
function set_data_for_detail(index){
	var name = document.querySelector("#name_detail");
	var img = document.querySelector("#img_detail");
	var link = document.querySelector("#a_detail");
	name.innerHTML = data[index][0];
	img.src = data[index][2];
	link.href = data[index][1];
}
// click plus
var plus = document.querySelector("body .service .fa-plus");
var social_box = document.querySelector("body .social");
var flag_social = 0;
plus.addEventListener("click", () => 
    {
        if (flag_social == 0){
            social_box.style.scale = "1";
            flag_social = 1;
        }
        else{
            social_box.style.scale = "0";
            flag_social = 0;
        }
    }
)

// lưu trữ hai giá trị 1 0 để dánh dấu cho button_unvote.
var flag_button_unvote = [];
function click_for_unvote(index) {
    return function() {
            var singerDiv = button_unvote[index].parentNode;
            flag_button_unvote[index] = 0;
            singerDiv.remove();
            remove_1_voted(list_voted_singer[index], function() {
            // Hàm callback này sẽ chạy sau khi remove_1_voted() hoàn thành
	            send_request_claim_top3();
	        });
    }
}
// viết hàm xử lí khi không có ca sĩ.
function check_list_voted(){
    for (var i = 0; i < flag_button_unvote.length; i++){
        if (flag_button_unvote[i] == 1){
            return true;
        }
    }
    return false;
}
var button_unvote = [];
function get_button_unvote(){
	flag_button_unvote = [];
	button_unvote = document.querySelectorAll("body .list_voted .list .singer .unvote");
	for (var i = 0; i < button_unvote.length; i++) {
    	button_unvote[i].addEventListener("click", click_for_unvote(i));
	}
	for (var i = 0; i < button_unvote.length; i++){
	    flag_button_unvote.push(1);
	}
}
// click list voted
var flag_list_voted = 0
var list_voted = document.querySelector("body .service .fa-list");
var list_voted_box = document.querySelector("body .list_voted")
list_voted.addEventListener("click", () => {
    if (flag_list_voted == 0) {
        send_request_list_singer_of_voter(function() {
            get_button_unvote();
            console.log(flag_button_unvote.length);
            list_voted_box.style.top = "5vh";
            blur1.style.display = "block";
            flag_list_voted = 1;
            if (check_list_voted() == false) {
                var no_singer = document.querySelector("body .list_voted .no_singer");
                no_singer.style.display = "block";
            } else {
                var no_singer = document.querySelector("body .list_voted .no_singer");
                no_singer.style.display = "none";
            }
        });
    } else {
        list_voted_box.style.top = "-100vh";
        blur1.style.display = "none";
        flag_list_voted = 0;
    }
});

// xử lí sự kiện keydown
var text;
var child_texts;
function check_substring() {
    var text_lower = text.toLowerCase();
    var child_texts_lower = child_texts.toLowerCase();
    if (child_texts_lower.indexOf(text_lower) !== -1) {
        return true;
    } else {
        return false;
    }
}

function search_result(){
    var results = [];
    text = input_search.value;
    for (var i = 0; i < data.length; i++){
		child_texts = data[i][0];
        if (check_substring() != false){
            results.push(i);
        }
    }
    return results;
}
var input_search = document.querySelector("body .list_singer .input input");
input_search.addEventListener("input", (event) => 
    {
        if (event.key === "Enter") {

        }
        else{
            add_data_result();
        }
    }
)
function add_data_result(){
	var result = search_result();
	var result_div1 = document.querySelector("body .list_singer .input .result_search");
	result_div1.style.display = "block";
	var result_div = document.querySelector("body .list_singer .input .result_search .content1 .content");
	result_div.innerHTML = "";
	for (var i = 0; i < result.length; i++){
		var newDiv = document.createElement('div');
		newDiv.className = 'div';
		newDiv.addEventListener("click", click_1_result(result[i]));
		// Tạo một thẻ hình ảnh và thiết lập thuộc tính
		var newImg = document.createElement('img');
		newImg.src = data[result[i]][2];
		newImg.alt = '';
		newImg.style.width = '120px';
		newImg.style.height = '70px';
		
		// Tạo một thẻ p chứa nội dung văn bản
		var newParagraph = document.createElement('p');
		newParagraph.textContent = data[result[i]][0];
		
		// Thêm hình ảnh và đoạn văn bản vào div mới
		newDiv.appendChild(newImg);
		newDiv.appendChild(newParagraph);
		
		result_div.appendChild(newDiv);
	}
		
}
function click_1_result(index) {
    return function() {
		id_singer = index;
        get_number_vote_of_singer(index, () => {
            // Thực hiện các thao tác sau khi get_number_vote_of_singer chạy xong
            box_detail.style.scale = "1";
            blur1.style.display = "block";
            set_data_for_detail(index);
        });
    }
}
// tắt bật result
var close_result = document.querySelector("#close_result");
close_result.addEventListener("click", () => 
	{
		var result_div = document.querySelector("body .list_singer .input .result_search");
		result_div.style.display = "none";
	}
)
var result_div = document.querySelector("body .list_singer .input .result_search");
result_div.style.display = "none";
// xử lí sự kiện nhấn vote ca sĩ.
var button_vote = document.querySelector(".singer_detail button");
button_vote.addEventListener("click", () => 
	{
		if (button_vote.innerHTML == "Voted"){
			return;
		}
		send_request_vote(id_singer);
	}
)	
// tạo các singer trong voted list.
function create_1_data_for_voted_list(index){
	// Tạo một đối tượng nghệ sĩ mới
	var singerDiv = document.createElement("div");
	singerDiv.classList.add("singer");
	
	var img = document.createElement("img");
	if (data[index] !== undefined) {
	    console.log(data[index][2]);
	    img.src = data[index][2];
	} else {
	    console.log("Index out of range or data is undefined.");
	}
	img.setAttribute("alt", "");
	img.style.width = "250px";
	img.style.height = "150px";
	singerDiv.appendChild(img);
	
	var nameParagraph = document.createElement("p");
	if (data[index] !== undefined) {
	    nameParagraph.textContent = data[index][0];
	} else {
	    console.log("Index out of range or data is undefined.");
	}
	singerDiv.appendChild(nameParagraph);
	
	var unvoteParagraph = document.createElement("p");
	unvoteParagraph.textContent = "Unvote";
	unvoteParagraph.classList.add("unvote");
	singerDiv.appendChild(unvoteParagraph);
	
	// Thêm nghệ sĩ vào danh sách
	var listDiv = document.querySelector("body .list_voted .list");
	listDiv.appendChild(singerDiv);
}
// xử lí giao tiếp với smart contract.
function send_request() {
            var http = new XMLHttpRequest();
            http.open("GET", "http://localhost:8080/Singer_Vote/communicate", true);
            http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
            http.send();
            http.onload = function() {
                var response_value = JSON.parse(http.responseText);
                console.log(response_value);
            }
        }
var number_vote123;
function get_number_vote_of_singer(index, callback) {
    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:8080/Singer_Vote/communicate?action=get_number_vote_of_singer&id_singer=" + index, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    http.send();
    http.onload = function() {
        var response_value = JSON.parse(http.responseText);
        var number_vote = document.querySelector("#number_detail");
        var voteCount = response_value[index]; // Chuyển đổi chuỗi thành số nguyên
        // Thay thế "NaN" bằng 0
        voteCount = voteCount.replace("\"", "");
         voteCount = voteCount.replace("\"", "");
         number_vote123 = parseInt(voteCount);
        number_vote.innerHTML = "Votes Number: " + number_vote123;
        console.log(response_value[response_value.length - 1]);
        if (response_value[response_value.length - 1] == "\"false\""){
			button_vote.innerHTML = "Voted";
		}
        // Gọi callback để thông báo rằng đã hoàn thành việc lấy dữ liệu
        callback();
    }
}
function send_request_vote(index) {
    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:8080/Singer_Vote/communicate?action=vote&id_singer=" + index, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    http.send();
    http.onload = function() {
        var response_value = JSON.parse(http.responseText);
        if (response_value == "\"vote khong thanh cong\""){
			button_vote.innerHTML = "You have already voted for 5 singer.";
	        button_vote.style.backgroundColor = "red";
	        button_vote.style.color = "white";
		}
		else{
			button_vote.innerHTML = "Voted";
			number_vote123++;
			var number_vote = document.querySelector("#number_detail");
			number_vote.innerHTML = "Votes Number: " + number_vote123;
			send_request_claim_top3();
		}
        console.log(response_value);
    }
}
var list_voted_singer;
function send_request_list_singer_of_voter(callback) {
	var listDiv = document.querySelector("body .list_voted .list");
	listDiv.innerHTML = "";
    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:8080/Singer_Vote/communicate?action=list_singer", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    http.send();
    http.onload = function() {
        var response_value = JSON.parse(http.responseText);
        response_value = response_value.replace("[", "");
        response_value = response_value.replace("]", "");
        response_value= response_value.replace(/"/g, '');
        console.log(response_value);
        var array = response_value.split(",");
        console.log(array);
        list_voted_singer = array.map(parseFloat);
        console.log(list_voted_singer);
        for (var i = 0; i < list_voted_singer.length; i++) {
			if (isNaN(list_voted_singer[i])){
				break;
			}
            create_1_data_for_voted_list(list_voted_singer[i]);
        }
        // Gọi hàm callback sau khi tất cả công việc trong onload đã hoàn thành
        if (callback) {
            callback();
        }
    }
}
function remove_1_voted(index, callback) {
    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:8080/Singer_Vote/communicate?action=remove&id_singer=" + index, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    http.send();
    http.onload = function() {
        var response_value = JSON.parse(http.responseText);
       	console.log(response_value);
       	if (callback){
			   callback();
		   }
    }
}
var array_id_top3 = [];
var array_phan_tram = [];
function send_request_claim_top3(callback){
	var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:8080/Singer_Vote/communicate?action=claim_top3", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    http.send();
    http.onload = function() {
        var response_value = JSON.parse(http.responseText);
        console.log("claim top 3");
        response_value = response_value.replace("[", "");
        response_value = response_value.replace("]", "");
        var array = response_value.split(",");
        var array_result = array.map(parseFloat);
        array_id_top3 = [];
		array_phan_tram = [];
      	for (var i = 0; i < array_result.length; i++){
			if (array_result[i] < 1 && array_result[i] > 0){
				array_phan_tram.push(array_result[i].toFixed(1));
			}
			else{
				array_id_top3.push(array_result[i]);
			}
		}
		let chart = document.querySelector("body .chart");
	
		chart.innerHTML = "";
		var count = 0;
		for (var i = 0; i < array_id_top3.length; i++){
			count++;
			create_chart(array_phan_tram[i] * 100, array_id_top3[i]);
			if (count == 5){
				break;
			}
		}
		if (callback){
			callback();
		}
    }
}
function create_chart(phan_tram, id){
	// Tạo một phần tử div mới
	let chartChild = document.createElement("div");
	
	// Thêm lớp "chart_child" vào phần tử mới
	chartChild.classList.add("chart_child");
	
	// Tạo một phần tử img mới
	let img = document.createElement("div");
	img.style.backgroundImage = "url('" + data[id][2] + "')";
	img.style.borderRadius = "50%";
	img.style.height = "50px";
	img.style.width = "50px";
	img.style.backgroundSize = "cover";

	
	// Thêm phần tử img vào phần tử chartChild
	chartChild.appendChild(img);
	
	// Tạo một phần tử div mới
	let column = document.createElement("div");
	column.classList.add("column");
	column.style.height = phan_tram + "%";
	
	// Tạo một phần tử p mới chứa nội dung "68%"
	let p = document.createElement("p");
	p.textContent = phan_tram + "%";
	
	// Thêm phần tử p vào phần tử column
	column.appendChild(p);
	
	// Thêm phần tử column vào phần tử chartChild
	chartChild.appendChild(column);
	
	// Lấy phần tử cha có lớp là "chart"
	let chart = document.querySelector("body .chart");
	
	// Thêm phần tử chartChild vào phần tử cha "chart"
	chart.appendChild(chartChild);
}
send_request_claim_top3();
