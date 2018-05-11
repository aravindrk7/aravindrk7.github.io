function webpage(){
	var photoshop = document.getElementById('photo');
	var webpage = document.getElementById('web');
	photoshop.style.display = "none";	
	webpage.style.display = "flex";
	$('.web').addClass('active');
	$('.photo').removeClass('active');
}
function photoshop(){
	var photoshop = document.getElementById('photo');
	var webpage = document.getElementById('web');	
	webpage.style.display = "none";	
	photoshop.style.display = "flex";
	$('.photo').addClass('active');
	$('.web').removeClass('active');
}