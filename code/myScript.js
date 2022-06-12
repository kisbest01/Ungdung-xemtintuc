//thêm hình load vào body
$('body').append('<div style="" id="loading"><img id="loading-image" src="loader.gif" alt="Loading..."></div>');
//load trang 
$(window).on('load', function(){
    // load trong 2s
  setTimeout(removeLoader, 2000); 
});
//xóa load
function removeLoader(){
    $( "#loading" ).fadeOut(function() {
      $( "#loading" ).remove(); 
  });  
}
$(document).ready(function() {
// mã api-token cá nhân
const token = "9519cf41356470a94e21e9002ac5a5c2";
//lệnh GET yêu cầu các bài top
fetch("https://gnews.io/api/v4/top-headlines?&token=" + token + "&sortby=publishedAt" + "&lang=en")
    .then(function (response) {
        //chuyển chuổi nhận được thành đối tượng JSON
        return response.json();
    })
    .then(function (data) {
        //lấy thuộc tính articles của đối tượng data
        let myArr = data.articles;
        console.log(data);
        // lập qua từng thành phần trong mãng articles và hiện ra màn hình
        for(let i = 0; i < myArr.length; i++) {
        //thêm nội dung vào sau phần tử div có id dMain
        $("#dMain").append(
            "<div class='row sapxep'>" + 
            "<div class='col-sm-4 col-md-3' style='padding:5px 0px 5px 25px;'>" +
            "<image src=" + myArr[i].image + " style='width:100%;height:auto;'>" + 
            "</div>" + 
            "<div class='col-sm-8 col-md-9' style='padding:5px 25px;'>" +
            "<a href="+ myArr[i].url +" style='color:blue;text-decoration:underline;' target='_blank'><b>" + myArr[i].title + "</b></a>" +
            "<p class='sort'><i>" + myArr[i].publishedAt + "</i></p>" +
            "<p>" + myArr[i].description + "</p>" + "</div>" +
            "</div>"
        );
        }
    });
    //hiện form search khi nhấn icon search
    $("#iSearch").click(function() {
        $("#fSearch").css("display","block");
        $("#dContent").css({"background-color":"Grey","opacity":"0.6"});
    });
    //ẩn form search khi nhấn nút X
    $("#bX").click(function() {
        $("#fSearch").css("display","none");
        $("#dContent").css({"background-color":"white","opacity":"1"});
    });
    //các lệnh chạy khi nhấn nút search
    $("#bSearch").click(function() {
        //ẩn form search
        $("#fSearch").css("display","none");
        $("#dContent").css({"background-color":"white","opacity":"1"});
        $('#dMain').append('<div style="width: 100%;height: 100%;top: 65px;left: 0;" id="loading"><img id="loading-image" src="loader.gif" alt="Loading..."></div>');
        //load trang 
        $(window).on('load', function(){
        // load trong 2s
        setTimeout(2000); 
        });
        var url;
        //lấy dữ liệu nhập
        var keywords = $("#search").val();
        var from = new Date($("#from").val());
        var to = new Date($("#to").val());
        let fromDateISO = from.toISOString().split('').slice(0,19).join('')+"Z";
        let toDateISO = to.toISOString().split('').slice(0,19).join('')+"Z";
        //các điều kiện theo từ khóa và thời gian tìm kiếm
        if(keywords == "" && from.toString() == "Invalid Date" && to.toString() == "Invalid Date") {
            url = "https://gnews.io/api/v4/search?q=example&token=" + token + "&sortby=publishedAt" + "&lang=en";
        } else if(keywords == "" && from.toString() == "Invalid Date") {
            url= "https://gnews.io/api/v4/search?" + "q=" + keywords + "&lang=en" + "&token=" + token + "&to=" + toDateISO + "&sortby=publishedAt";
        } else if(keywords == "" && to.toString() == "Invalid Date") {
            url= "https://gnews.io/api/v4/search?" + "q=" + keywords + "&lang=en" + "&token=" + token + "&from=" + fromDateISO + "&sortby=publishedAt";
        } else if(from.toString() == "Invalid Date" && to.toString() == "Invalid Date") {
            url= "https://gnews.io/api/v4/search?" + "q=" + keywords + "&sortby=publishedAt" + "&lang=en" + "&token=" + token;
        } else if(to.toString() == "Invalid Date") {
            url= "https://gnews.io/api/v4/search?" + "q=" + keywords + "&lang=en" + "&token=" + token + "&from=" + fromDateISO + "&sortby=publishedAt";
        } else if(from.toString() == "Invalid Date") {
            url= "https://gnews.io/api/v4/search?" + "q=" + keywords + "&lang=en" + "&token=" + token  + "&to=" + toDateISO + "&sortby=publishedAt";
        } else if(keywords == "") {
            url = "https://gnews.io/api/v4/search?q=example" + "&lang=en" + "&token=" + token + "&from=" + fromDateISO + "&to=" + toDateISO + "&sortby=publishedAt";
        } else {
            url= "https://gnews.io/api/v4/search?" + "q=" + keywords + "&lang=en" + "&token=" + token  + "&from=" + fromDateISO + "&to=" + toDateISO + "&sortby=publishedAt";
        }
        console.log(url);
        //lệnh GET yêu cầu theo từ khóa search
        fetch(url)
        .then(function (response) {
            //chuyển chuổi nhận được thành đối tượng JSON
            return response.json();
        })
        .then(function (data) {
            //lấy thuộc tính articles của đối tượng data
            let myArr = data.articles;
            console.log(data);
            //xóa phần tử con khởi div có id dMain
            $("#dMain").empty();
            //lặp qua từng phần tử trong articles và hiện ra màn hình 
            for(let i = 0; i < myArr.length; i++) {
                $("#dMain").append(
                "<div class='row sapxep'>" + 
                "<div class='col-sm-4 col-md-3' style='padding:5px 0px 5px 25px;'>" +
                "<image src=" + myArr[i].image + " style='width:100%;height:auto;'>" + 
                "</div>" + 
                "<div class='col-sm-8 col-md-9' style='padding:5px 25px;'>" +
                "<a href="+ myArr[i].url +" style='color:blue;text-decoration:underline;' target='_blank'><b>" + myArr[i].title + "</b></a>" +
                "<p class='sort'><i>" + myArr[i].publishedAt + "</i></p>" +
                "<p>" + myArr[i].description + "</p>" + "</div>" +
                "</div>"
                );
            }
        });
    });
    //bô lọc trong trang
    $("#iFilter").on("keyup",function() {
        //lấy giá trị nhập vào và chuyển thành chữ thường
        var val = $(this).val().toLowerCase();
        $("#dMain").filter(function() {
            //giấu đi những hàng không phù hợp với kết quả tìm kiếm
            $(this).toggle($(this).text().toLowerCase().indexOf(val) > -1)
        });
    });
});
