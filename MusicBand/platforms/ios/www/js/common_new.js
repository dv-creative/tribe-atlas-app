
//var SERVER_URL = "http://codewaretechnologies.com/music_band/api/";


var SERVER_URL = "http://54.183.136.169/music_band/api/";




function homeButton() {
	window.location.href = 'index.html';
}

function backButton()
{
    //window.location.href = 'index.html';
    pageShowOtherHide("home_page");
}


function musicListOpen() {
    
	//window.location.href = 'music.html';
    
    pageShowOtherHide("music_listing_page");
    
}

function videolistOpen() {

	window.location.href = 'video.html';
}

function photoListOpen() {
	window.location.href = 'photos.html';
}

function tribeListOpen() {
	window.location.href = 'tribe.html';
}


function shareviaFB() {
	alert('shareviaFB');
	
	
		window.plugins.socialsharing.shareViaFacebook('CodeWare Technologies via Facebook',
                 null,
                 null,
                 console.log('share ok'), // success callback
                 function(errormsg){alert(errormsg)}) // error callback
                 
/*
	window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null, null, console.log('share ok'), // success callback
	function(errormsg) {
		alert(errormsg)
	});
	
*/ 	
} 

function shareviaTwitter() {
	alert('shareviaTwitter');	
	window.plugins.socialsharing.shareViaTwitter('CodeWare Technologies via twitter');	  
}

function onShare() {
	window.plugins.socialsharing.share('CodeWare Technologies ', null, null, 'http://codewaretechnologies.com');
}

function getAlbumInfo() {
	var url = SERVER_URL + "album_information/";
	//alert(" websiteClick url : "+ url);
	var successCB = function(resp) {
		//alert("websiteClick response :"+JSON.stringify(resp));
		console.log(JSON.stringify(resp));
		if (resp.success == 1) {

			var album_id = resp.data[0].album_id;
			//alert("set album_id : " + album_id);
			window.localStorage.setItem("Album_Id", album_id);

			var album_name = resp.data[0].album_name;
			//alert("album_name : "+album_name);
			window.localStorage.setItem("Album_Name", album_name);

			var description = resp.data[0].description;
			//alert("description : "+description);
			window.localStorage.setItem("Album_Description", description);

			var demo_link = resp.data[0].demo_link;
			//alert("demo_link : "+demo_link);
			window.localStorage.setItem("Album_Link", demo_link);

			var album_img = resp.data[0].album_img;
			var album_image_full_path = resp.album_img + album_img;
			//alert("album_image_full_path : "+album_image_full_path);
			window.localStorage.setItem("Album_Image_Path", album_image_full_path);

		} else {
			alert(resp.data);
		}
	}
	ajax(url, successCB);
}


function playAlbumHomeScreen() {
    
    var album_id = window.localStorage.getItem("Album_Id");
    var url = SERVER_URL + "music_list/" + album_id + "";
    // alert(" websiteClick url : "+ url);
    var successCB = function(resp) {
        console.log(JSON.stringify(resp));
        if (resp.success == 1) {
            $("#total_songs").html(resp.total_song);
            $("#total_times").html(resp.total_time);
            var song_path = resp.song_path;
            window.localStorage.setItem("Song_Path", song_path);
            var array = resp.Songs;
            window.localStorage.setItem("Music_List_original", JSON.stringify(array));
            window.localStorage.setItem("Music_List", JSON.stringify(array));
            
            // add this line to play music direct from home screen
            var index = 0;
            window.localStorage.setItem("Music_Start_Index", index);
            
            if(isPlaying)
            {
                pageShowOtherHide("music_player");
            }
            else
            {
                 musicStart();
            }
            
           
            
            
            
            
            
        } else {
            alert(resp.data);
            alert("Music list not found");
        }
    }
    ajax(url, successCB);
}

function getMusicList() {

	var album_id = window.localStorage.getItem("Album_Id");
	var url = SERVER_URL + "music_list/" + album_id + "";
	// alert(" websiteClick url : "+ url);
	var successCB = function(resp) {
		console.log(JSON.stringify(resp));
		if (resp.success == 1) {
			$("#total_songs").html(resp.total_song);
			$("#total_times").html(resp.total_time);
			var song_path = resp.song_path;
			window.localStorage.setItem("Song_Path", song_path);
			var array = resp.Songs;
			window.localStorage.setItem("Music_List_original", JSON.stringify(array)); 
			window.localStorage.setItem("Music_List", JSON.stringify(array));
			setMusicListScreen(1);
		} else {
			alert(resp.data);
			alert("Music list not found");
		}
	}
	ajax(url, successCB);
}

function shuffle(o) {
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function shufflePlayTab() {
	music_list_data_array = JSON.parse(window.localStorage.getItem("Music_List"));	
	//alert("old music list :"+JSON.stringify(music_list_data_array));
	var new_music_list_data_array = shuffle(music_list_data_array);	
	//alert("new music list :"+JSON.stringify(new_music_list_data_array));
	window.localStorage.setItem("Music_List", JSON.stringify(new_music_list_data_array));	
	setMusicListScreen(3);
} 

function playAllTab() {
	music_list_data_array = JSON.parse(window.localStorage.getItem("Music_List_original"));		
	window.localStorage.setItem("Music_List", JSON.stringify(music_list_data_array));
	setMusicListScreen(1); 
}

function setMusicListScreen(tab_index) {
	var array = JSON.parse(window.localStorage.getItem("Music_List"));
	
	var sub_div = '';
	for (var i = 0; i < array.length; i++) {
		if (i % 2 == 0) {
			sub_div += '<div onclick="playMusic(' + i + ')" class="col-xs-12 line">';
		} else {
			sub_div += '<div onclick="playMusic(' + i + ')" class="col-xs-12 line2">';
		}
		sub_div += '<div class="col-xs-10 song">';
		sub_div += '<p>' + (i + 1) + '. ' + array[i].audio_name + ' </p>';
		sub_div += '</div>';
		sub_div += '<div class="col-xs-2 minute">';
		sub_div += '<p>' + array[i].audio_time + '</p>';
		sub_div += '</div>';
		sub_div += '</div>';
	}
	
	
	
	if (tab_index == 1)
	{
	  $("#music_list_div").html(sub_div);
	}
	else
	{
	  $("#shuffle_music_list_div").html(sub_div);
	} 
	
}  

function playMusic(index) {
	window.localStorage.setItem("Music_Start_Index", index);
    musicStart();
}

function getVideoList()
{
	
   
	var album_id = window.localStorage.getItem("Album_Id");
	var url = SERVER_URL + "get_album_video/" + album_id + "";
	
	var successCB = function(resp) {
		console.log(JSON.stringify(resp));
		
		//alert("video resp : "+JSON.stringify(resp));
		
		if (resp.success == 1) {
			
			
			
			var video_images = resp.video_images; 	
			
			var video_path = resp.video_path; 	
			
			
			  
			var array = resp.Album_videos; 		
			
			var sub_div = '';	
					
		for (var i = 0; i < array.length; i++) {
            
			
			var video_file =  array[i].video_file;
			
			var video_img =  array[i].video_img;
			
			
			var video_src= video_path + video_file;
			var video_thumb_srch= video_images + video_img;
			
			
            var video_src_video_tag = video_src;
            
           // alert("video_src_video_tag"+video_src_video_tag);
            
			video_src = "'"+video_src+"'";
			
			
			
			
			//alert("video_thumb_srch"+video_thumb_srch);
			
		  	
		     /*
		
				sub_div +='<div onclick="playVideo('+video_src+')" class="col-xs-6 video_thumn" style="padding:0 5px 0 0;">';
                	sub_div +='<a href="#">';
                    	sub_div +='<div class="col-md-12" style="padding:0;"><img width="100%" src="'+video_thumb_srch+'"></div>';
                        sub_div +='<div class="col-md-12" style="padding:0;"><p class="video_preview_heading">'+array[i].video_name+'</p></div>';
                    sub_div +='</a>';
                sub_div +='</div>'; 
            */
            
            /*
            sub_div +='<video width="120" height="120" controls>';
            sub_div +='<source src="http://www.w3schools.com/tags/movie.mp4" type="video/mp4">';
            sub_div +='</video>';
             */
            
            
            
            sub_div +='<div onclick="playVideo('+video_src+')" class="col-xs-6 video_thumn" style="padding:0 5px 0 0;">';
            sub_div +='<a href="#">';
            sub_div +='<div class="col-md-12" style="padding:0;">';
                sub_div +='<video width="100%" height="130" controls>';
                sub_div +='<source src="'+video_src_video_tag+'" type="video/mp4">';
                sub_div +='</video>';
            sub_div +='</div>';
            sub_div +='<div class="col-md-12" style="padding:0;"><p class="video_preview_heading">'+array[i].video_name+'</p></div>';
            sub_div +='</a>';
            sub_div +='</div>';
            

            
            /*
            sub_div +='<video width="120" height="120" controls>';
            sub_div +='<source src="'+video_src_video_tag+'" type="video/mp4">';
            sub_div +='</video>';
            */
            
            
              
             }
                
                 $("#video_list").html(sub_div);
                
		
		} else {
			alert(resp.data);
			alert("video list not found");
		}
	}
	ajax(url, successCB);
	
	
}

function playVideo(src_video) {
	
	//alert("playVideo playVideo =");
	
	//url = "http://www.w3schools.com/html/movie.mp4";
	//window.plugins.videoPlayer.play(url);
	
	window.plugins.videoPlayer.play(src_video);
	
	
	
}

function getPhotoGallery() {

	var album_id = window.localStorage.getItem("Album_Id");
	//alert("local storage get album_id = "+album_id);

	var url = SERVER_URL + "get_photo_gallery/" + album_id + "";

	var successCB = function(resp) {
		//alert("websiteClick response :"+JSON.stringify(resp));
		console.log(JSON.stringify(resp));
		if (resp.success == 1) {

			window.localStorage.setItem("Photo_List_Resp", JSON.stringify(resp));

			var photo_base_path = resp.photo_path;



			var array = resp.photos;
			//alert("leg="+array.length);

			var sub_div = '';
			for (var i = 0; i < array.length; i++) {
				
				

				var album_id = array[i].album_id;
				var photo = array[i].photo;

				//alert("album_id"+album_id);
				//alert("album_img"+photo);

				var image_full_path = photo_base_path + photo;
  
				//alert("image_full_path"+image_full_path);

				sub_div += '<div onclick="photoGallery('+i+')" class="col-xs-4 photo_gallery">';
				sub_div += '<a href="#">';
				sub_div += '<div class="col-md-12" style="padding:0;"><img width="100%" src="' + image_full_path + '"></div>';
				sub_div += '</a>';
				sub_div += '</div>';

			}

			$("#photo_gallery_list").html(sub_div);

		} else {
			alert(resp.data);
		}
	}
	ajax(url, successCB);
}

function photoGallery(photo_index) {

	window.localStorage.setItem("photo_Index", photo_index);

	window.location.href = 'photo_gallery.html';
}

function ajax(url, successCB) {
	
	
	//alert("== url ==" +url);

	if (checkConnection()) {
        
        

		//	$("#loading").show();

		$.ajax({
			type : "GET",
			dataType : "jsonp",
			crossDomain : true,
			async : true, // aysnc is false then timeout not work
			url : url,
			timeout : 3000,
			beforeSend : function() {
				console.log(this.url);
				_loading = true;
			},
			success : successCB,
			error : function(jqXHR, text_status, strError) {
				//alert("jqXHR"+JSON.stringify(jqXHR));
				//alert("text_status"+text_status);
				//alert("strError"+strError);

				//	$("#loading").hide();

				if (text_status === "timeout") {
					alert("Internet is working very slow. Please try again ");
				} else {
					alert(text_status);
				}

			},
			complete : function() {

				//	$("#loading").hide();

				_loading = false;
			}
		});

	}
}

function checkConnection() {   
   
   // return true;
    
   

	//var networkState = navigator.network.connection.type;
    
   
    
    var networkState = navigator.connection.type;
    
    

	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.CELL] = 'Cell generic connection';
	states[Connection.NONE] = 'No network connection';
    
    

	//alert('Connection type: ' + states[networkState]);

	if ((states[networkState] == 'No network connection') || (states[networkState] == 'Unknown connection')) {
		alert("Your phone internet connection is not working. Please check and relaunch app.");
		return false;
	} else {
		return true;
	}
     
    

}

