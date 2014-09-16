
//var SERVER_URL = "http://codewaretechnologies.com/music_band/api/";
//var SERVER_URL = "http://54.183.14.179/music_band/api/";

//var SERVER_URL = "http://54.183.136.169/music_band/api/";

var SERVER_URL = "http://54.183.239.240/music_band/api/";  


var current_index = 0;
var selected_play = false;
var total_index = 0 ;
var music_list_data_array ;
var song_path;
var repeating_on_off = 0;

var check_success = 0;


var my_media = null;
var mediaTimer = null;
var isPlaying = false;
var audio_file_path;

var music_live_path_download;
var music_live_name_download;

var shuffle_tab_check = 0;


var songs_shuffle_list;
var songs_original_list;

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



function downloadFile(music_live_name,music_live_path) {
    
   
    
    music_live_name_download =music_live_name;
    music_live_path_download = music_live_path;
    
    
    
    window.requestFileSystem(
                             LocalFileSystem.PERSISTENT,
                             0,
                             onRequestFileSystemSuccess,
                             fail
                             );
}

function onRequestFileSystemSuccess(fileSystem) {
   
    fileSystem.root.getFile(
                            'dummy.html',
                            {create: true, exclusive: false},
                            onGetFileSuccess,
                            fail
                            );
}

function onGetFileSuccess(fileEntry) {
   
    
    //alert("fileEntry.toURL()"+fileEntry.toURL());
    var path = fileEntry.toURL().replace('dummy.html', '');
    //alert("path==="+path);
    var fileTransfer = new FileTransfer();
    fileEntry.remove();
    
    //alert("music_live_name_download = = = "+music_live_name_download);

    //alert("music_live_path_download = = = "+music_live_path_download);
    
    $("#loading").show();
    
    
    // http://54.183.136.169/music_band/audio_files/4d40122d3fce61e2270dca0f67fd71ed.mp3
    
    music_live_name_download = music_live_name_download.replace(/ /gi, "_");
    
    alert("path="+path);
    
    fileTransfer.download(
                          music_live_path_download,
                          path + ''+music_live_name_download+'.mp3',
                          function(file) {
                          $("#loading").hide();
                          alert('Download completed successfully' );
                          
                          showLink(file.toURI());
                          },
                          function(error) {
                          $("#loading").hide();
                          alert("some error on download : "+JSON.stringify(error));
                          console.log('download error source ' + error.source);
                          console.log('download error target ' + error.target);
                          console.log('upload error code: ' + error.code);
                          }
                          );
    
    
    
    /*
    fileTransfer.download(
                          'http://www.w3schools.com/tags/horse.mp3',
                          path + 'horse.mp3',
                          function(file) {
                          alert('Download completed successfully' );
                           $("#loading").hide();
                          showLink(file.toURI());
                          },
                          function(error) {
                          alert("error: "+JSON.stringify(error));
                          console.log('download error source ' + error.source);
                          console.log('download error target ' + error.target);
                          console.log('upload error code: ' + error.code);
                          }
                          );
    
    */
}

function showLink(url) {
   
    //alert("Playing URL: "+url);
    
    
    $("#download_play").html("<a href="+url+">play last download </a>");
    
    //var divEl = document.getElementById('deviceready');
    //var aElem = document.createElement('a');
    //aElem.setAttribute('target', '_blank');
    //aElem.setAttribute('href', url);
    //aElem.appendChild(document.createTextNode('Ready! Click To Open.'))
    //divEl.appendChild(aElem);
}

function fail(evt) {
    $("#loading").hide();
    alert("downloading error :"+evt.target.error.code);
}






document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady()
{
    
  //  downloadFile();
   
    
    
    //alert("message 111111");
    //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
    
    
    
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
                                
                                shuffleMusicSongsLIst();
                                
                                
                                
                                if(music_shuffling_on_off == 0)
                                {
                                    music_shuffling_on_off = 1;
                                    $( ".change_shuffling_icon").addClass("cstm-icons");
                               
                                    window.localStorage.setItem("Music_List", JSON.stringify(songs_shuffle_list));
                                
                                
                                 }
                                else
                                {
                                    music_shuffling_on_off = 0;
                                    $( ".change_shuffling_icon").removeClass("cstm-icons");
                               
                                
                                   window.localStorage.setItem("Music_List", JSON.stringify(songs_original_list));
                                
                                }
                                
                                
                                
                                
         
                                
                                
                               
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
                                  
                                  /*
                                  if(current_index >= total_index -1)
                                  {
                                  current_index = 0;
                                  }
                                  else
                                  {
                                  current_index = current_index + 1;
                                  }
                                  */
                                  
                                  stop();
                                  
                                  
                                  
                                  
                                  });
    
    
    
    $('.previous_music_button').click(function() {
                                      
                                      if(current_index <= 0)
                                      {
                                      current_index = total_index-2;
                                      }
                                      else
                                      {
                                      current_index = current_index - 2;
                                      }
                                      
                                      stop();
                                     
                                      
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
    
   
    
    selected_play = false;
    
   // pageShowOtherHide("music_player");
    
    
    
    //var storage_start_index = window.localStorage.getItem("Music_Start_Index");
    
   
    
    //current_index = parseInt(storage_start_index);
    
    
    //alert("=====current_index===="+current_index);
  
    
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
    
    audio_file_path = src;
    my_media = new Media(src, onSuccess, onError);
    playAudio();
}

function playAudio() {
    
     alert("Please wait ......");
    
    
    if (my_media === null)
    {
        initMedia(audio_file_path);
    }
	if (isPlaying === false)
    {
        
      //  $("#loading").show();
       // alert("playAudio callinggggggggggggggggggg");
        my_media.play();
      //  $("#loading").hide();
        
        
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
    
    
    
    
    
    
    
    
    repeating_on_off = window.localStorage.getItem("Repeating");
    
    
    
    if (repeating_on_off == null || repeating_on_off == 0)
    {
        
    
        if(selected_play)
        {
            
        }
        else
        {
           

            if(current_index >= total_index -1)
            {
                current_index = 0;
            }
            else
            {
                current_index = current_index + 1;
            }
            
        }
  
        my_media = null;
        isPlaying = false;
        startAudoiSong();
        
        
    }
    
    else
    {
        
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
	
	window.plugins.socialsharing.shareViaTwitter('CodeWare Technologies', null /* img */, 'http://www.x-services.nl');
    
    
}

function onShare() {
	window.plugins.socialsharing.share('CodeWare Technologies ', null, null, 'http://codewaretechnologies.com');
}

function openEmailIdPopUp()
{
   
  $("#email-popup").show();
    
   
    
}
function submitEmail()
{
    $("#email-popup").hide();
    
   
    var user_email = $( "#user_email").val();
    
    
    sendEmailFromServer(user_email);
 
}


function okMessage()
{
    $("#message-popup").hide();
}

function cancleEmail()
{
    $("#email-popup").hide();
}

function sendEmailFromServer(mail_id)
{
    
    var url = SERVER_URL + "send_mail_to_user/"+mail_id;     
   
	
	var successCB = function(resp) {
		
		alert(JSON.stringify(resp));
        
         $("#message-popup").show();
        
        
		if (resp.success == 1) {
		          
            alert(resp.message);
            
		} else {
			alert(resp.message);
		}
	}
	ajax(url, successCB);
    
}


function getAlbumInfo() {
	var url = SERVER_URL + "album_information/";
	
	var successCB = function(resp) {
		
		console.log(JSON.stringify(resp));
		if (resp.success == 1) {

			var album_id = resp.data[0].album_id;
			
			window.localStorage.setItem("Album_Id", album_id);

			var album_name = resp.data[0].album_name;
		
			window.localStorage.setItem("Album_Name", album_name);

			var description = resp.data[0].description;
			
			window.localStorage.setItem("Album_Description", description);

			var demo_link = resp.data[0].demo_link;
		
			window.localStorage.setItem("Album_Link", demo_link);

			var album_img = resp.data[0].album_img;
			var album_image_full_path = resp.album_img + album_img;
		
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
	
	var successCB = function(resp) {
		console.log(JSON.stringify(resp));
		if (resp.success == 1) {
			var song_path = resp.song_path;
			window.localStorage.setItem("Song_Path", song_path);
			var array = resp.Songs;
			
            
            if (isPlaying === false)
            {
                //var index = 0;
                //window.localStorage.setItem("Music_Start_Index", index);
                pageShowOtherHide("music_player");
                window.localStorage.setItem("Music_List", JSON.stringify(array));
                startAudoiSong();
                
            }
            else
            {
                pageShowOtherHide("music_player");
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
	
	var successCB = function(resp) {
		console.log(JSON.stringify(resp));
		if (resp.success == 1) {
			$("#total_songs").html(resp.total_song);
			$("#total_times").html(resp.total_time);
			var song_path = resp.song_path;
			window.localStorage.setItem("Song_Path", song_path);
			var array = resp.Songs;
			         
            pageShowOtherHide("music_listing_page");
            songs_original_list = array;
            setMusicListScreen();
            
            
		} else {
			alert(resp.data);
			alert("Music list not found");
		}
	}
	ajax(url, successCB);
}

function shuffleMusicSongsLIst()
{
    
    
    if(shuffle_tab_check)
    {
        

    }
    else
    {
        songs_shuffle_list = shuffle(songs_original_list);
        setMusicShuffleListScreen();
        shuffle_tab_check = 1;
    }
}







function shuffle(o) {
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}



function setMusicListScreen() {
    
	var array = songs_original_list;
   
    
    var song_path = window.localStorage.getItem("Song_Path");
	
	var sub_div = '';
	for (var i = 0; i < array.length; i++) {
        
        var music_live_name = array[i].audio_name;
        music_live_name = "'"+music_live_name+ "'";
        // alert("music_live_name======"+ music_live_name);
        
        var audio_file= array[i].audio_file;
        var music_live_path = song_path + audio_file;
        music_live_path = "'"+music_live_path+ "'";
        // alert("music_live_path======"+ music_live_path);
        
		if (i % 2 == 0) {
			sub_div += '<div class="col-xs-12 line">';
		} else {
			sub_div += '<div class="col-xs-12 line2">';
		}
		sub_div += '<div onclick="playMusic(' + i + ')" class="col-xs-10 song">';
		sub_div += '<p>' + (i + 1) + '. ' + array[i].audio_name + ' </p>';
		sub_div += '</div>';
		/*
        sub_div += '<div class="col-xs-2 minute">';
		sub_div += '<p>' + array[i].audio_time + '</p>';
		sub_div += '</div>';
		
        sub_div += '<div onclick="downloadFile('+music_live_name+','+music_live_path+')" class="col-xs-2 minute">';
		sub_div += '<i class="fa fa-download dwnl-icon"></i>';
        sub_div += '</div>';
        */
        
        
        sub_div += '<div class="col-xs-2 minute">';
		sub_div += '<p>' + array[i].audio_time + '</p>';
		sub_div += '</div>';
		
        sub_div += '</div>';
        
        
	}
	  $("#music_list_div").html(sub_div);
    
    
	
}





function playMusic(index) {
    
   
    
	//window.localStorage.setItem("Music_Start_Index", index);
    
    selected_play = true;
    current_index = index;
    
    window.localStorage.setItem("Music_List", JSON.stringify(songs_original_list));
    
    music_shuffling_on_off = 0;
    $( ".change_shuffling_icon").removeClass("cstm-icons");
    
    pageShowOtherHide("music_player");
    
    if (isPlaying === false)
    {
        startAudoiSong();
    }
    else
    {
        stop();
    }
}

function playAllTab()
{
    
    
    music_shuffling_on_off = 0;
    $( ".change_shuffling_icon").removeClass("cstm-icons");
    
    if (isPlaying === false)
    {
        //var index = 0;
        //window.localStorage.setItem("Music_Start_Index", index);
        pageShowOtherHide("music_player");
        window.localStorage.setItem("Music_List", JSON.stringify(songs_original_list));
        startAudoiSong();
        
    }
    else
    {
        pageShowOtherHide("music_player");
        window.localStorage.setItem("Music_List", JSON.stringify(songs_original_list));
    }
}



function shufflePlayTab()
{
    
    shuffleMusicSongsLIst();
    
    
    music_shuffling_on_off = 1;
    $( ".change_shuffling_icon").addClass("cstm-icons");
    
    
    if (isPlaying === false)
    {
        //var index = 0;
        //window.localStorage.setItem("Music_Start_Index", index);
        pageShowOtherHide("music_player");
        window.localStorage.setItem("Music_List", JSON.stringify(songs_shuffle_list));
        startAudoiSong();
        
    }
    else
    {
        pageShowOtherHide("music_player");
        window.localStorage.setItem("Music_List", JSON.stringify(songs_shuffle_list));
    }
}


function setMusicShuffleListScreen() {
    
	var array = songs_shuffle_list;
    var song_path = window.localStorage.getItem("Song_Path");
	
	var sub_div = '';
	for (var i = 0; i < array.length; i++) {
        var music_live_name = array[i].audio_name;
        music_live_name = "'"+music_live_name+ "'";
       
        
        var audio_file= array[i].audio_file;
        var music_live_path = song_path + audio_file;
        music_live_path = "'"+music_live_path+ "'";
      
        
		if (i % 2 == 0) {
			sub_div += '<div class="col-xs-12 line">';
		} else {
			sub_div += '<div class="col-xs-12 line2">';
		}
		sub_div += '<div onclick="playMusicWithShuffle(' + i + ')" class="col-xs-10 song">';
		sub_div += '<p>' + (i + 1) + '. ' + array[i].audio_name + ' </p>';
		sub_div += '</div>';
		
        /*
        sub_div += '<div class="col-xs-2 minute">';
		sub_div += '<p>' + array[i].audio_time + '</p>';
		sub_div += '</div>';
		
        sub_div += '<div onclick="downloadFile('+music_live_name+','+music_live_path+')" class="col-xs-2 minute">';
        sub_div += '<i class="fa fa-download dwnl-icon"></i>';
		sub_div += '</div>';
        */
        
        
        sub_div += '<div class="col-xs-2 minute">';
		sub_div += '<p>' + array[i].audio_time + '</p>';
		sub_div += '</div>';
		
        
        
        
        
        sub_div += '</div>';
        
	}
	
     $("#shuffle_music_list_div").html(sub_div);
    
    
	   
}

function playMusicWithShuffle(index) {
    
   
   alert("playMusic wiht shufffling");
	//window.localStorage.setItem("Music_Start_Index", index);
    
    selected_play = true;
    current_index = index;
   
    window.localStorage.setItem("Music_List", JSON.stringify(songs_shuffle_list));
    
    
    
    
    music_shuffling_on_off = 1;
    $( ".change_shuffling_icon").addClass("cstm-icons");
        
     pageShowOtherHide("music_player");
    
    if (isPlaying === false)
    {
        startAudoiSong();
    }
    else
    {
        stop();
    }
}









function getVideoList()
{
	
    
	var album_id = window.localStorage.getItem("Album_Id");
	var url = SERVER_URL + "get_album_video/" + album_id + "";
	
	var successCB = function(resp) {
		console.log(JSON.stringify(resp));
		
		
		
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
                
               
                
                video_src = "'"+video_src+"'";
                
                 video_name = "'"+video_name+"'";
                
                
              
                
                
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
    
    alert("video track start");
    analytics.trackEvent('video Song', 'video play', video_name, 1);
    alert("video track end");
	
	//url = "http://www.w3schools.com/html/movie.mp4";
	//window.plugins.videoPlayer.play(url);
	
	//window.plugins.videoPlayer.play(src_video);
	
	
}


function getPhotoGallery() {

	var album_id = window.localStorage.getItem("Album_Id");
	

	var url = SERVER_URL + "get_photo_gallery/" + album_id + "";

	var successCB = function(resp) {
		
		console.log(JSON.stringify(resp));
		if (resp.success == 1) {

			window.localStorage.setItem("Photo_List_Resp", JSON.stringify(resp));
			var photo_base_path = resp.photo_path;
			var array = resp.photos;
			var sub_div = '';
			for (var i = 0; i < array.length; i++) {
				

				var album_id = array[i].album_id;
				var photo = array[i].photo;
				var image_full_path = photo_base_path + photo;

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
   pageShowOtherHide("photo_full_page");
   //setPhotoOnfullyScreen();
   onPhotoDeviceReady();
   
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
        sub_div1 += '<div  class="item mar_zer"> <img  src="'+image_full_path+'"></div>';
        
       // sub_div2 += '<div class="item" ><img width="100%" src="'+image_full_path+'"></div>';
    }
    
    $("#sync1").data('owlCarousel').addItem(sub_div1);
    //$("#sync2").data('owlCarousel').addItem(sub_div2);
    
    var	photo_index = parseInt(window.localStorage.getItem("photo_Index"));
    
    analytics.trackEvent('Photo Gallery', 'Photo View',array[photo_index].photo,3);
    
    $(".owl-carousel").owlCarousel();
    var owl = $(".owl-carousel").data('owlCarousel');
    owl.goTo(photo_index);  // Go to x slide
    
}

function ajax(url, successCB) {
	
	if (checkConnection()) {
		
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

	

	if ((states[networkState] == 'No network connection') || (states[networkState] == 'Unknown connection')) {
		alert("Your phone internet connection is not working. Please check and relaunch app.");
		return false;
	} else {
		return true;
	}

}





