document.addEventListener("deviceready", onDeviceReady, false);

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

function onDeviceReady() {
    // we will not be doing anything!!
	//alert('onDeviceReadystart');
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
	 try{
		DropboxSync.checkLink(function() { // success
			alert("Hallo ok");
		// User is already authenticated with Dropbox.
		}, function() { // fail
			alert("Hallo fail");
		// User is not authenticated with Dropbox.
			});
	
			alert("Hallo");
			DropboxSync.link();
			alert("Hallo2");
	
	}catch(e){alert(e);}
	alert('onDeviceReadyend');
}

$(document).on("pageshow", function () {
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
    if ($("#contactsList").length == 1) {
        $("body").addClass('ui-disabled').css("background", "#000");
        $.mobile.loading("show");
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var filter = ["displayName", "phoneNumbers"];
        navigator.contacts.find(filter, onSuccess, onError, options);
    } else if ($("#addContact").length == 1) {
        bindAddContactEvents();
    }
});

function onSuccess(contacts) {
    var html = "";
    for (var i = 0; i < contacts.length; i++) {
        if ($.trim(contacts[i].displayName).length != 0 || $.trim(contacts[i].nickName).length != 0) {
            html += '<li>';
            html += '<h2>' + contacts[i].displayName ? contacts[i].displayName : contacts[i].nickName + '</h2>';
            if (contacts[i].phoneNumbers) {
                html += '<ul class="innerlsv" data-role="listview" data-inset="true">';
                html += '<li><h3>Phone Numbers</h3></li>';
                for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                    html += "<li>Type: " + contacts[i].phoneNumbers[j].type + "<br/>" +
                        "Value: " + contacts[i].phoneNumbers[j].value + "<br/>" +
                        "Preferred: " + contacts[i].phoneNumbers[j].pref + "</li>";
                }
                html += "</ul>";
            }
            html += '</li>';
        }
    }
    if (contacts.length === 0) {
        html = '<li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">';
        html += '<h2>No Contacts</h2>';
        html += '<label>No Contacts Listed</label>';
        html += '</li>';
    }
    $("#contactsList").html(html);
    $("#contactsList").listview().listview('refresh');
    $(".innerlsv").listview().listview('refresh');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}

function onError(contactError) {
    alert('Oops Something went wrong!');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}

function bindAddContactEvents() {
    $("#addContact").on("click", function () {
        var name = $.trim($("#name").val()),
            number = $.trim($("#number").val());

        if (name.length == 0) {
            alert("Please enter a valid Name");
            return false;
        }

        if (number.length == 0) {
            alert("Please enter a valid Number");
            return false;
        }

        var contact = navigator.contacts.create();
        contact.displayName = name;
        contact.nickname = name;

        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', number, true);
        contact.phoneNumbers = phoneNumbers;

        contact.save(createSuccess, createError);
    });
}

function createSuccess() {
    alert("Contact has been successfully added");
    resetPage();
}

function createError() {
    alert("Oops Something went wrong! Please try again later.");
}

function resetPage() {
    $("#name").val("");
    $("#number").val("");
}


// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoFileSuccess(imageData) {
  // Get image handle
  console.log(JSON.stringify(imageData));
  
  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
	//alert('onPhotoURISuccess');
  // Uncomment to view the image file URI 
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhotoWithData() {
	//alert('capturePhotoWithData');
  // Take picture using device camera and retrieve image as base64-encoded string
  //navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

function capturePhotoWithFile() {
	//alert('capturePhotoWithFile');
	navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
}
// A button will call this function
//
function getPhoto(source) {
	//alert('getPhoto');
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}

// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}
function dropbox_linked() { }
// Called from the onActivityResult method in the plugin when linking is successful.
function dropbox_onSyncStatusChange(status) { }
// Called by observer in the plugin when there's a change 
// to the status of background synchronization (download/upload).
// status is a string variable that will be 'sync' or 'none'.
function dropbox_fileChange() { }
// Called by observer in the plugin when a file is changed.


function uploadfile(){
	
	var src = $('#largeImage').attr('src');
	alert(src);
/*
	optionsarray['filePath']='file:///storage/extSdCard/DCIM/Camera/04102010343.jpg';
	optionsarray['dropboxPath']='';
	DropboxSync.prototype.uploadFile(optionsarray);*/
}
/*
// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64 encoded image data
  // console.log(imageData);
  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');
  // Unhide image elements
  //
  smallImage.style.display = 'block';
  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
}
// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI 
  // console.log(imageURI);
  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');
  // Unhide image elements
  //
  largeImage.style.display = 'block';
  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}
// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
}
// A button will call this function
//
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
}
// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}
*/