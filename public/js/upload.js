var title = "test";

$('#record-btn').click(function(){
	var title = $('#inputInitials').val();
	console.log(title);
	var posterDropzone = new Dropzone("div#uploadPoster", { url: "/admin/poster", headers: { "title": title }, acceptedFiles: "image/*" });
	var bannerDropzone = new Dropzone("div#uploadBanner", { url: "/admin/banner", headers: { "title": title }, acceptedFiles: "image/*" });
})

// Disable auto discover for all elements:
Dropzone.autoDiscover = false;

/*Dropzone.options.uploadPoster = {

	url: "/admin/poster",
	headers: { "title": title },
	acceptedFiles: "image/*"

}

Dropzone.options.uploadBanner = {

	url: "/admin/banner",
	headers: { "title": title },
	acceptedFiles: "image/*"

}
*/
$(document).ready(function(){
	$('.upload-btn').click(function() {
		 $('uploadDiv').hide();
	});
});
