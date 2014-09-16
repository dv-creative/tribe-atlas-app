
//var SERVER_URL = "http://codewaretechnologies.com/music_band/api/";
//var SERVER_URL = "http://54.183.14.179/music_band/api/";

var SERVER_URL = "http://54.183.136.169/music_band/api/";





var current_index = 0;
var total_index = 0 ;
var music_list_data_array ;
var song_path;
var repeating_on_off = 0;
var check_success = 0;
var my_media = null;
var mediaTimer = null;
var isPlaying = false;
var audio_file_path;



/*
var urlOfFile = "http://www.w3schools.com/tags/horse.mp3";

function fileSystemSuccess(fileSystem) {
    
    var fileTransfer = new FileTransfer();
    fileTransfer.download(encodeURI('http://www.w3schools.com/tags/horse.mp3'), 'cdvfile://localhost/persistent/com.mee.flight/maptile/horse.mp3', function (entry) {
                          alert("sucessfulllyyyyyyy");
                          alert("download complete: " + entry.fullPath);
                          },
                          function(error) {
                          alert("eeeee: "+JSON.stringify(error));
                          alert("download error source " + error.source);
                          alert("download error target " + error.target);
                          alert("upload error code" + error.code);
                          }
                          );

}
function onDirectorySuccess(parent) {
	alert("message onDirectorySuccess");
    console.log(parent);
}

function onDirectoryFail(error) {
	
	alert("message onDirectoryFail");
	
    alert("Unable to create new directory: " + error.code);
}

function fileSystemFail(evt) {
	alert("message fileSystemFail");
    console.log(evt.target.error.code);
}
*/


function downloadFile() {
    window.requestFileSystem(
                             LocalFileSystem.PERSISTENT,
                             0,
                             onRequestFileSystemSuccess,
                             fail
                             );
}

function onRequestFileSystemSuccess(fileSystem) {
    console.log('onRequestFileSystemSuccess');
    fileSystem.root.getFile(
                            'dummy.html',
                            {create: true, exclusive: false},
                            onGetFileSuccess,
                            fail
                            );
}

function onGetFileSuccess(fileEntry) {
    alert('onGetFileSuccess!');
    
    alert("fileEntry.toURL()"+fileEntry.toURL());
    var path = fileEntry.toURL().replace('dummy.html', '');
    alert("path==="+path);
    var fileTransfer = new FileTransfer();
    fileEntry.remove();
    fileTransfer.download(
                          'http://www.w3schools.com/tags/horse.mp3',
                          path + 'horse.mp3',
                          function(file) {
                          alert('Download completed Successfully ');
                          showLink(file.toURI());
                          },
                          function(error) {
                          alert("error: "+JSON.stringify(error));
                          console.log('download error source ' + error.source);
                          console.log('download error target ' + error.target);
                          console.log('upload error code: ' + error.code);
                          }
                          );
    
    
}

function showLink(url) {
    alert("showLink"+url);
   // var divEl = document.getElementById('deviceready');
   // var aElem = document.createElement('a');
   // aElem.setAttribute('target', '_blank');
   // aElem.setAttribute('href', url);
   // aElem.appendChild(document.createTextNode('Ready! Click To Open.'))
   // divEl.appendChild(aElem);
}

function fail(evt) {
    console.log(evt.target.error.code);
}




document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady()
{
    
    
    downloadFile();
    
    
   
   // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
    
    
    
    analytics.startTrackerWithId('UA-54390319-1');
    analytics.trackView('Home Page View');
    getAlbumInfo();
    pageShowOtherHide("home_page");
    
  
   
    
    
    $('.player-play').click(function() {
                            
                            playAudio();
                            });
    
    $('.player-stop').click(function() {
                            stop();
                            });
    
    
    
    
    $('.music_repeating').click(function() {
                                // alert("repeating click");
                                
                                
                                if(repeating_on_off == 0)
                                {
                                repeating_on_off = 1;
                               // alert("Current song repeating on");
                                
                                $( ".change_repeading_icon").addClass("cstm-icons");
                                }
                                else
                                {
                                repeating_on_off = 0;
                                //alert("Current song repeating off");
                                $( ".change_repeading_icon").removeClass("cstm-icons");
                                }
                                
                                window.localStorage.setItem("Repeating",repeating_on_off);
                                
                                
                                });
    
    var music_shuffling_on_off = 0;
    
    $('.music_shuffling').click(function() {
                                //alert("music_shuffling click");
                                
                                if(music_shuffling_on_off == 0)
                                {
                                music_shuffling_on_off = 1;
                                $( ".change_shuffling_icon").addClass("cstm-icons");
                                }
                                else
                                {
                                music_shuffling_on_off = 0;
                                $( ".change_shuffling_icon").removeClass("cstm-icons");
                                }
                                
                                
                                
                                
                                shufflePlayTab();
                                });
    
    
    var music_info = 0;
    
    $('.music_info').click(function() {
                           
                           //alert("music_info click");
                           
                           if(music_info == 0)
                           {
                           music_info = 1;
                           $( ".change_musicinfo_icon").addClass("cstm-icons");
                           }
                           else
                           {
                           music_info = 0;
                           $( ".change_musicinfo_icon").removeClass("cstm-icons");
                           }
                           });
    
    
    
    
    
    
    $('.next_music_button').click(function() {
                                  
                                  // alert("current_index="+current_index);
                                  // alert("total_index="+total_index);
                                  if(current_index >= total_index -1)
                                  {
                                  current_index = 0;
                                  }
                                  else
                                  {
                                  current_index = current_index + 1;
                                  }
                                  
                                  
                                  stop();
                                  
                                  
                                  
                                  
                                  //window.localStorage.setItem("Music_Start_Index", current_index);
                                  //window.location.href = 'music_player_common.html';
                                  
                                  
                                  
                                  });
    
    
    
    $('.previous_music_button').click(function() {
                                      
                                      if(current_index <= 0)
                                      {
                                      current_index = total_index-1;
                                      }
                                      else
                                      {
                                      current_index = current_index - 1;
                                      }
                                      
                                      stop();
                                      
                                      //window.localStorage.setItem("Music_Start_Index", current_index);
                                      //window.location.href = 'music_player_common.html';
                                      
                                      });
    
    
    
    
    $('.time-slider').bind('change', function() {
                           seekPosition($(this).val());
                           });
    
    $('.volume').bind('change', function() {
                      setVolume($(this).val());
                      });
    
}




function pageShowOtherHide(pageDivId)

{
    
    
    $("#home_page").hide();
    $("#music_listing_page").hide();
    $("#music_player").hide();
    $("#music_player_wiht_lyrics").hide();
    $("#music_player_wiht_lyrics_minified").hide();
    $("#video_page").hide();
    $("#photo_page").hide();
    $("#photo_full_page").hide();
    $("#tribe_page").hide();
    
    
    
    $("#"+pageDivId+"").show();
    
  
    
    
    
}



function startAudoiSong()
{
    
    
  
    
    pageShowOtherHide("music_player");
    
    //$("#music_player").show();
    //$("#music_player_wiht_lyrics").hide();
    //$("#music_player_wiht_lyrics_minified").hide();
    
    
    
    var storage_start_index = window.localStorage.getItem("Music_Start_Index");
    
    current_index = parseInt(storage_start_index);
    
    
    song_path = window.localStorage.getItem("Song_Path");
    
    music_list_data_array = JSON.parse(window.localStorage.getItem("Music_List"));
    total_index = music_list_data_array.length;
    
    $(".song_title").html(music_list_data_array[current_index].audio_name);
    
    
    analytics.trackEvent('Audio Song', 'Music play', music_list_data_array[current_index].audio_name, 1);
    
    
    
    
    var audio_file= music_list_data_array[current_index].audio_file;
    var audio_lyrics= music_list_data_array[current_index].audio_lyrics;
    $(".lyrics").html(audio_lyrics);
    // song_path = "http://codewaretechnologies.com/music_band/audio_files/";
    audio_file_full_path = song_path+audio_file;
    initMedia(audio_file_full_path);
    
}






function initMedia(src) {
    
    //alert("initMedia calling");
    
    audio_file_path = src;
    my_media = new Media(src, onSuccess, onError);
    playAudio();
}

function playAudio() {
    
   // alert("playAudio callinggggg  isPlaying = "+isPlaying+" ");
    
    
    
    
    
    if (my_media === null)
    {
        initMedia(audio_file_path);
    }
	if (isPlaying === false)
    {
        
        //alert("playAudio callinggggggggggggggggggg");
        
        my_media.play();
        
        
        //my_media.play({ playAudioWhenScreenIsLocked : false })
        
        mediaTimer = setInterval(function() {
                                 // get my_media position
                                 my_media.getCurrentPosition(
                                                             // success callback
                                                             function(position) {
                                                             if (position > -1) {
                                                             
                                                             //setAudioPosition((position) + " sec");
                                                             
                                                             $('.media-played').text(Utility.formatTime(position));
                                                             updateSliderPosition(position);
                                                             }
                                                             },
                                                             // error callback
                                                             function(e) {
                                                             console.log("Error getting pos=" + e);
                                                             // setAudioPosition("Error: " + e);
                                                             $('.media-played').text(Utility.formatTime(0));
                                                             
                                                             }
                                                             );
                                 }, 1000);
        
        
        
        var counter = 0;
        var timerDuration = setInterval(
                                        function() {
                                        counter++;
                                        
                                        console.log("counter=" + counter);
                                        
                                        if (counter > 20)
                                        clearInterval(timerDuration);
                                        
                                        var duration = my_media.getDuration();
                                        
                                        console.log("duration=" + duration);
                                        
                                        // alert("duration"+duration);
                                        
                                        if (duration > -1)
                                        {
                                        clearInterval(timerDuration);
                                        $('.media-duration').text(Utility.formatTime(duration));
                                        $('.time-slider').attr('max', Math.round(duration));
                                        $('.time-slider').slider('refresh');
                                        }
                                        else
                                        $('.media-duration').text('Unknown');
                                        },
                                        900
                                        );
        
        changePlayButton('images/pause_button.png');
        
    }  //if check
    
    else
    {
        my_media.pause();
        // clearInterval(mediaTimer);
        changePlayButton('images/play_button.png');
    }
    
    isPlaying = !isPlaying;
}


function onSuccess(status) {
    
    
    
    //alert("onSuccess callingggggg = ");
    
    
    
    
    
    repeating_on_off = window.localStorage.getItem("Repeating");
    
    
    
    if (repeating_on_off == null || repeating_on_off == 0)
    {
        
        
        if(current_index >= total_index -1)
        {
            current_index = 0;
        }
        else
        {
            current_index = current_index + 1;
        }
        
        window.localStorage.setItem("Music_Start_Index", current_index);
        
        
        
        my_media = null;
        isPlaying = false;
        startAudoiSong();
        
        
        
        
    }
    
    else
    {
        
        //alert("current repeating again");
        isPlaying = false;
        playAudio();
    }
    
    
    
    
    
    
    
    
    
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    
}


function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
}

function updateSliderPosition(seconds) {
    
    
    
    var $slider = $('.time-slider');
    
    if (seconds < $slider.attr('min'))
        $slider.val($slider.attr('min'));
    else if (seconds > $slider.attr('max'))
        $slider.val($slider.attr('max'));
    else
        $slider.val(Math.round(seconds));
    
    
    
    
    
    $slider.slider('refresh');
}


function changePlayButton(imageName) {
    
    $('.player-play').attr("src", imageName);
    
}

function stop() {
    my_media.stop();
}


function resetLayout() {
    $('.media-played').text(Utility.formatTime(0));
    changePlayButton('images/play_button.png');
    updateSliderPosition(0);
}



function seekPosition(seconds) {
    //	alert("seekPosition seconds"+seconds);
    if (my_media === null)
        return;
    
    my_media.seekTo(seconds * 1000);
    updateSliderPosition(seconds);
}


function setVolume (volume_value) {
    
    my_media.setVolume(volume_value);
    var $value_slider = $('.volume');
    $value_slider.val(volume_value);
    $value_slider.slider('refresh');
}



function backButton()
{
   // window.location.href = 'index.html';
    pageShowOtherHide("home_page");
}
function homeButton () {
    
    window.location.href = 'index.html';
}

function openLyrics () {
    
    
    pageShowOtherHide("music_player_wiht_lyrics");
    
	// $("#music_player").hide();
	// $("#music_player_wiht_lyrics").show();
	//  $("#music_player_wiht_lyrics_minified").hide();
}

function closeLyrics()
{
    pageShowOtherHide("music_player");
    //$("#music_player").show();
    //$("#music_player_wiht_lyrics").hide();
    //$("#music_player_wiht_lyrics_minified").hide();
}




function minimizeScreen()
{
    
    pageShowOtherHide("music_player_wiht_lyrics_minified");
    
    //$("#music_player").hide();
    //$("#music_player_wiht_lyrics").hide();
    //$("#music_player_wiht_lyrics_minified").show();
    
}


function maximizeScreen()
{
    
    pageShowOtherHide("music_player_wiht_lyrics");
    //$("#music_player").hide();
    //$("#music_player_wiht_lyrics").show();
    //$("#music_player_wiht_lyrics_minified").hide();
    
}





















function musicListOpen() {
	
    //window.location.href = 'music.html';
    
    
}

function videolistOpen() {

	//window.location.href = 'video.html';
     pageShowOtherHide("video_page");
     getVideoList();
    
    
}

function photoListOpen() {
	
    //window.location.href = 'photos.html';
    
      pageShowOtherHide("photo_page");
      getPhotoGallery();
    
}

function tribeListOpen() {
    
	   //window.location.href = 'tribe.html';
    
        analytics.trackView('Home Page View');
    
        pageShowOtherHide("tribe_page");
        var album_id = window.localStorage.getItem("Album_Id", album_id);
        var album_name = window.localStorage.getItem("Album_Name");
        var description = window.localStorage.getItem("Album_Description");
        var demo_link = window.localStorage.getItem("Album_Link");
        var album_image_full_path = window.localStorage.getItem("Album_Image_Path");
        $("#tab_Band").html(description);
        $("#tab_album_credits").html(album_name);	
        $("#tab_links").html(demo_link);
        
	
}  


function shareviaFB() {
	alert('shareviaFB');
	
	/*
		window.plugins.socialsharing.shareViaFacebook('CodeWare Technologies via Facebook',
                 null,
                 null,
                 console.log('share ok'), // success callback
                 function(errormsg){alert(errormsg)}) // error callback
    
*/
    
    
    window.plugins.socialsharing.shareViaFacebook('CodeWare Technologies', null /* img */, 'http://www.x-services.nl' /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
    
    
}

function shareviaTwitter() {
	alert('shareviaTwitter');
	window.plugins.socialsharing.shareViaTwitter('CodeWare Technologies', null /* img */, 'http://www.x-services.nl');
    
    
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
            
            
            
            
            if (isPlaying === false)
            {
                 startAudoiSong();
            }
            else
            {
                pageShowOtherHide("music_player");
            }
            
            
            
            
           
            
            
			//window.location.href = 'music_player_common.html';
            
            
            
            
			
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
    
    pageShowOtherHide("music_listing_page");
    
	
}

function playMusic(index) {

	window.localStorage.setItem("Music_Start_Index", index);
    
    
    
    
    
    if (isPlaying === false)
    {
        startAudoiSong();
    }
    else
    {
        stop();
    }
    
    
    
    //startAudoiSong();
    
    
    
	//window.location.href = 'music_player_common.html';
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
                
                 var video_name = array[i].video_name;
                
                var video_file =  array[i].video_file;
                
                var video_img =  array[i].video_img;
                
                
                var video_src= video_path + video_file;
                var video_thumb_srch= video_images + video_img;
                
                
                var video_src_video_tag = video_src;
                
                // alert("video_src_video_tag"+video_src_video_tag);
                
                video_src = "'"+video_src+"'";
                
                 video_name = "'"+video_name+"'";
                
                
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
                
                sub_div +='<div onclick="playVideo('+video_src+','+video_name+')" class="col-xs-6 video_thumn" style="padding:0 5px 0 0;">';
                sub_div +='<a href="#">';
                sub_div +='<div class="col-md-12" style="padding:0;">';
                sub_div +='<video width="100%" height="130" controls>';
                sub_div +='<source src="'+video_src_video_tag+'" type="video/mp4">';
                sub_div +='</video>';
                sub_div +='</div>';
                sub_div +='<div class="col-md-12" style="padding:0;"><p class="video_preview_heading">'+array[i].video_name+'</p></div>';
                sub_div +='</a>';
                sub_div +='</div>';
                */
                
                /*
                
                sub_div +='<div class="col-xs-6 video_thumn" style="padding:0 5px 0 0;">';
                sub_div +='<a  href="#">';
                sub_div +='<div class="col-md-12" style="padding:0;">';
                sub_div +='<video autoplay="testvideo()" onclick="testvideo()" width="100%" height="130" >';
                sub_div +='<source src="'+video_src_video_tag+'" type="video/mp4">';
                sub_div +='</video>';
                sub_div +='</div>';
                sub_div +='<div class="col-md-12" style="padding:0;"><p class="video_preview_heading">'+array[i].video_name+'</p></div>';
                sub_div +='</a>';
                sub_div +='</div>';
                */
                
                
                sub_div +='<div class="col-xs-6 video_thumn" style="padding:0 5px 0 0;">';
                sub_div +='<a  href="#">';
                sub_div +='<div class="col-md-12" style="padding:0;">';
                sub_div +='<video class="videoclass" onclick="testvideo()" width="100%" height="130" src="'+video_src_video_tag+'" >';
                sub_div +='</video>';
                sub_div +='</div>';
                sub_div +='<div class="col-md-12" style="padding:0;"><p class="video_preview_heading">'+array[i].video_name+'</p></div>';
                sub_div +='</a>';
                sub_div +='</div>';
                
                
                
            }
            
            $("#video_list").html(sub_div);
            
            $(".videoclass").on("click", function() {
            
               alert("tttttttttttt");
            });
            
            
            
		} else {
			alert(resp.data);
			alert("video list not found");
		}
	}
	ajax(url, successCB);
}

function testvideo()
{
    alert("test video onclick event 33333 ");
}


function playVideo(src_video,video_name) {
    
    
	
	alert("playVideo playVideo =");
    
    alert("video track start");
    
    
    analytics.trackEvent('video Song', 'video play', video_name, 1);
    
    alert("video track end");
    
	
	//url = "http://www.w3schools.com/html/movie.mp4";
	//window.plugins.videoPlayer.play(url);
	
	//window.plugins.videoPlayer.play(src_video);
	
	
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
				sub_div += '<div class="col-md-12" style="padding:0;"><img width="100%" height="100px" src="' + image_full_path + '"></div>';
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
    
   // window.location.href = 'photo_gallery.html';
    
   pageShowOtherHide("photo_full_page");
    
    setPhotoOnfullyScreen();
    
   //onPhotoDeviceReady();  // use for silder screen page
   
}

function setPhotoOnfullyScreen() {

    
    var resp = JSON.parse(window.localStorage.getItem("Photo_List_Resp"));
    var	photo_index = parseInt(window.localStorage.getItem("photo_Index"));
    
    
    
    var photo_base_path = resp.photo_path;
    var array = resp.photos;
    
    
    var photo = array[photo_index].photo;
    
    var image_full_path = photo_base_path + photo ;
    
    
    
    $("#photo_full").attr('src',image_full_path);
    
    
}




function onPhotoDeviceReady() {
    
    
    
    var resp = JSON.parse(window.localStorage.getItem("Photo_List_Resp"));
    var photo_base_path = resp.photo_path;
    var array = resp.photos;
    var sub_div1='';
    var sub_div2='';
    
    for(var i=0;i<array.length;i++) {
        var album_id = array[i].album_id;
        var photo = array[i].photo;
        var image_full_path = photo_base_path + photo ;
        sub_div1 += '<div class="item mar_zer"><img width="100%" src="'+image_full_path+'"></div>';
        
        sub_div2 += '<div class="item" ><img width="100%" src="'+image_full_path+'"></div>';
        
    }
    
   
    
    $("#sync1").data('owlCarousel').addItem(sub_div1);
    $("#sync2").data('owlCarousel').addItem(sub_div2);
    
    
   
    
    var	photo_index = parseInt(window.localStorage.getItem("photo_Index"));
    //alert("photo_index"+photo_index);
    
    
    analytics.trackEvent('Photo Gallery', 'Photo View',array[photo_index].photo,3);
    
    
    
    
    $(".owl-carousel").owlCarousel();
    var owl = $(".owl-carousel").data('owlCarousel');
    owl.goTo(photo_index);  // Go to x slide
    
   
    
    
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

	var networkState = navigator.network.connection.type;

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





