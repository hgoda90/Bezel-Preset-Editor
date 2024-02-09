function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function bezelToggle(){
	if($(".switch-panel .bezel input").is(":checked")){
		setCookie("bezelStyle", "mbz", 30);
		bezelStyle = "mbz";
		layerToggle(imageLayer);
	}
	else{
		setCookie("bezelStyle", "koko-aio", 30);
		bezelStyle = "koko-aio";
	}
	
	$(".info").empty();
	colorReset();
	settingReset();
};

function colorReset(){
	$(".hex input").val("");
	$(".rgb input").val("");
	
	if(bezelStyle == "mbz"){
		$(".contrast").css("opacity", 0);
		$(".layers-wrap, .imageType").css("opacity", 1);
		$("#mb").css("display", "inline-block");
		$("#koko").css("display", "none");
		
		$(".square").css("background", "#1A1A1A");
		$(".square").css("box-shadow", "0px 0px 14px 4px rgba(26, 26, 26, 0.25)");
		settingReset();
		
		if($("div").hasClass("hex") == true){
			$(".hex input").attr("placeholder", "1A1A1A");
		}
		else{
			$(".rgb input[name='red']").attr("placeholder", "26");
			$(".rgb input[name='green']").attr("placeholder", "26");
			$(".rgb input[name='blue']").attr("placeholder", "26");
		}
	}
	else{
		$(".contrast").css("opacity", 1);
		$(".contrast option").prop("selected", false);
		$(".contrast option[value='1.30']").prop("selected", "selected");
		$(".layers-wrap, .imageType").css("opacity", 0);
		$("#koko").css("display", "inline-block");
		$("#mb").css("display", "none");
		
		$(".square").css("background", "#808080");
		$(".square").css("box-shadow", "0px 0px 14px 4px rgba(128, 128, 128, 0.25)");
	
		if($("div").hasClass("hex") == true){
			$(".hex input").attr("placeholder", "808080");
		}
		else{
			$(".rgb input[name='red']").attr("placeholder", "128");
			$(".rgb input[name='green']").attr("placeholder", "128");
			$(".rgb input[name='blue']").attr("placeholder", "128");
		}
	}
}

function formatToggle(){
	$(".colors").empty();
	
	if($(".switch-panel .format input").is(":checked")){
		setCookie("colorFormat", "RGB", 30);
		colorFormat = "RGB";
		$(".hex").remove();
		$(".text-box").after('<div class="rgb">rgb(<input type="text" name="red" size=3 maxLength=3>, <input type="text" name="green" size=3 maxLength=3>, <input type="text" name="blue" size=3 maxLength=3>)</div>');
	}
	else{
		setCookie("colorFormat", "HEX", 30);
		colorFormat = "HEX";
		$(".rgb").remove();
		$(".text-box").after('<div class="hex">HEX: # <input type="text" name="hex" size=6 maxlength=6></div>');
	}
	
	$(".info").empty();
	colorReset();
	swatches();
}

function layerToggle(imageLayers){
	setCookie("imageLayer", imageLayers, 30);
	imageLayer = imageLayers
	
	if($(".hex input, .rgb input").val() == ""){
		settingReset();
	}
	else{
		$("form").submit();
	}
	
	switch(imageLayer){
		case "Bezel":
			$(".layer input").val(1).trigger('input');
			$(".layer-labels li:nth-child(1)").addClass("active");
			break;
		case "Background":
			$(".layer input").val(2).trigger('input');
			$(".layer-labels li:nth-child(2)").addClass("active");
			break;
		case "LED":
			$(".layer input").val(3).trigger('input');
			$(".layer-labels li:nth-child(3)").addClass("active");
			break;
		case "Device":
			$(".layer input").val(4).trigger('input');
			$(".layer-labels li:nth-child(4)").addClass("active");
			break;
		case "Device LED":
			$(".layer input").val(5).trigger('input');
			$(".layer-labels li:nth-child(5)").addClass("active");
			break;
		case "Decal":
			$(".layer input").val(6).trigger('input');
			$(".layer-labels li:nth-child(6)").addClass("active");
			break;
		case "Top":
			$(".layer input").val(7).trigger('input');
			$(".layer-labels li:nth-child(7)").addClass("active");
			break;
		case "Cab Glass":
			$(".layer input").val(8).trigger('input');
			$(".layer-labels li:nth-child(8)").addClass("active");
			break;
		default:
			$(".layer input").val(1).trigger('input');
			$(".layer-labels li:nth-child(1)").addClass("active");
	}
}

function imageTypeToggle(){
	if($(".switch-panel .imageType input").is(":checked")){
		setCookie("imageType", "yellow", 30);
		imageType = "yellow";
	}
	else{
		setCookie("imageType", "standard", 30);
		imageType = "standard";
	}
	
	if($(".hex input, .rgb input").val() == ""){
		settingReset();
	}
	else{
		$("form").submit();
	}
}

function presetCopy() {
	navigator.clipboard.writeText($(".conversion").text().trim());
}

function rgbToHSB(r, g, b){
    r /= 255, g /= 255, b /= 255;
	var v = Math.max(r, g, b), n = v - Math.min(r, g, b);
	var h = (n === 0) ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
	
    return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
}

function settingReset(){
	if(bezelStyle == "mbz"){
		if(imageType == "yellow"){
			switch(imageLayer){
				case "Bezel":
					$(".conversion").text('HSM_BZL_COLOR_HUE = "0.000000"\nHSM_BZL_COLOR_SATURATION = "0.000000"\nHSM_BZL_COLOR_VALUE = "10.000000"');
					break;
				case "Background":
					$(".conversion").text('HSM_BG_HUE = "0.000000"\nHSM_BG_SATURATION = "100.000000"\nHSM_BG_BRIGHTNESS = "100.000000"\nHSM_BG_GAMMA = "1.000000"');
					break;
				case "LED":
					$(".conversion").text('HSM_LED_HUE = "0.000000"\nHSM_LED_SATURATION = "100.000000"\nHSM_LED_BRIGHTNESS = "100.000000"\nHSM_LED_GAMMA = "1.000000"');
					break;
				case "Device":
					$(".conversion").text('HSM_DEVICE_HUE = "0.000000"\nHSM_DEVICE_SATURATION = "100.000000"\nHSM_DEVICE_BRIGHTNESS = "100.000000"\nHSM_DEVICE_GAMMA = "1.000000"');
					break;
				case "Device LED":
					$(".conversion").text('HSM_DEVICELED_HUE = "0.000000"\nHSM_DEVICELED_SATURATION = "100.000000"\nHSM_DEVICELED_BRIGHTNESS = "100.000000"\nHSM_DEVICELED_GAMMA = "1.000000"');
					break;
				case "Decal":
					$(".conversion").text('HSM_DECAL_HUE = "0.000000"\nHSM_DECAL_SATURATION = "100.000000"\nHSM_DECAL_BRIGHTNESS = "100.000000"\nHSM_DECAL_GAMMA = "1.000000"');
					break;
				case "Top":
					$(".conversion").text('HSM_TOP_HUE = "0.000000"\nHSM_TOP_SATURATION = "100.000000"\nHSM_TOP_BRIGHTNESS = "100.000000"\nHSM_TOP_GAMMA = "1.000000"');
					break;
				case "Cab Glass":
					$(".conversion").text('HSM_CAB_GLASS_HUE = "0.000000"\nHSM_CAB_GLASS_SATURATION = "100.000000"\nHSM_CAB_GLASS_BRIGHTNESS = "100.000000"\nHSM_CAB_GLASS_GAMMA = "1.000000"');
					break;
			}
		}
		else{
			switch(imageLayer){
				case "Bezel":
					$(".conversion").text('HSM_BZL_COLOR_HUE = "0.000000"\nHSM_BZL_COLOR_SATURATION = "0.000000"\nHSM_BZL_COLOR_VALUE = "10.000000"');
					break;
				case "Background":
					$(".conversion").text('HSM_BG_HUE = "0.000000"\nHSM_BG_SATURATION = "100.000000"\nHSM_BG_BRIGHTNESS = "100.000000"');
					break;
				case "LED":
					$(".conversion").text('HSM_LED_HUE = "0.000000"\nHSM_LED_SATURATION = "100.000000"\nHSM_LED_BRIGHTNESS = "100.000000"');
					break;
				case "Device":
					$(".conversion").text('HSM_DEVICE_HUE = "0.000000"\nHSM_DEVICE_SATURATION = "100.000000"\nHSM_DEVICE_BRIGHTNESS = "100.000000"');
					break;
				case "Device LED":
					$(".conversion").text('HSM_DEVICELED_HUE = "0.000000"\nHSM_DEVICELED_SATURATION = "100.000000"\nHSM_DEVICELED_BRIGHTNESS = "100.000000"');
					break;
				case "Decal":
					$(".conversion").text('HSM_DECAL_HUE = "0.000000"\nHSM_DECAL_SATURATION = "100.000000"\nHSM_DECAL_BRIGHTNESS = "100.000000"');
					break;
				case "Top":
					$(".conversion").text('HSM_TOP_HUE = "0.000000"\nHSM_TOP_SATURATION = "100.000000"\nHSM_TOP_BRIGHTNESS = "100.000000"');
					break;
				case "Cab Glass":
					$(".conversion").text('HSM_CAB_GLASS_HUE = "0.000000"\nHSM_CAB_GLASS_SATURATION = "100.000000"\nHSM_CAB_GLASS_BRIGHTNESS = "100.000000"');
					break;
			}
		}
	}
	else{
		$(".conversion").text('BEZEL_R = "0.000000"\nBEZEL_G = "0.000000"\nBEZEL_B = "0.000000"\nBEZEL_CON = "1.300000"');	
	}
}

function start(){
	if(getCookie("bezelStyle") == ""){
		bezelStyle = "mbz";
	}
	else{
		bezelStyle = getCookie("bezelStyle");
	}
	
	if(getCookie("colorFormat") == ""){
		colorFormat = "HEX";
	}
	else{
		colorFormat = getCookie("colorFormat");
	}
	
	if(getCookie("imageLayer") == ""){
		imageLayer = "Bezel";
	}
	else{
		imageLayer = getCookie("imageLayer");
	}
	
	if(getCookie("imageType") == ""){
		imageType = "standard";
	}
	else{
		imageType = getCookie("imageType");
	}
	
	if(colorFormat == "RGB"){
		$(".text-box").after('<div class="rgb">rgb(<input type="text" name="red" size=3 maxLength=3>, <input type="text" name="green" size=3 maxLength=3>, <input type="text" name="blue" size=3 maxLength=3>)</div>');
	}
	else{
		$(".text-box").after('<div class="hex">HEX: # <input type="text" name="hex" size=6 maxlength=6></div>');
	}
	
	if(bezelStyle == "mbz"){
		$(".switch-panel .bezel input").attr("checked", "checked");
		layerToggle(imageLayer);
	}
	
	if(colorFormat == "RGB"){
		$(".switch-panel .format input").attr("checked", "checked");
	}
	
	if(imageType == "yellow"){
		$(".switch-panel .imageType input").attr("checked", "checked");
	}
	
	colorReset();
	settingReset();
	swatches();
}

function swatches(){
	swatchColors();
	$(".hex input").val("");
	$(".rgb input").val("");
	
	$(".swatch .color").on('click', function(){
		if(colorFormat == "HEX"){
			$(".hex input").val($(this).parents(".colors").siblings(".color-code").text().replace("#", ""));
		}
		else{
			swatchRGB = $(this).parents(".colors").siblings(".color-code").text().replace("rgb(", "").replace(")", "").split(', ');
			
			$(".rgb input[name='red']").val(swatchRGB[0]);
			$(".rgb input[name='green']").val(swatchRGB[1]);
			$(".rgb input[name='blue']").val(swatchRGB[2]);
		}
		
		$("form").submit();
	});
	
	$(".swatch .color").on('mouseover', function(){
		$(this).parents(".colors").siblings(".color-code").text($(this).data("code"));
	});
}

start();

$(".switch-panel .bezel input").on('click', function(){
	bezelToggle();
	
	if(bezelStyle == "koko-aio"){
		setTimeout(function () {
			$(".switch-panel").addClass("koko-aio");
		}, 400);
	}
	else{
		$(".switch-panel").removeClass("koko-aio");
	}
});

$(".switch-panel .format input").on('click', function(){
	formatToggle();
});

$(".switch-panel .imageType input").on('click', function(){
	imageTypeToggle();
});

if(bezelStyle == "koko-aio"){
	$(".switch-panel").addClass("koko-aio");
}
else{
	$(".switch-panel").removeClass("koko-aio");
}

$('.layer-labels li').on('click', function () {
	var index = $(this).index();
	
	$(".layer-labels li").removeClass("active");
	$(".layer input").val(index+1).trigger('input');
	$('.layer-labels').find("li:nth-child("+(index+1)+")").addClass("active");
	layerToggle($(this).text());
});

$(document).ready(function () {
	$("form").submit(function (event) {
		$(".message").removeClass("info");
		$(".message").removeClass("error");
		$(".message").empty();
		hexError = rgbError = "false";
		
		if(colorFormat == "HEX"){
			var hex = $(".hex input").val().toUpperCase();
		
			if(/^[0-9A-F]{6}$/i.test(hex) == false){
				hexError = "true";
			}
			else{
				function hexToRgb(color) {
					var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
					
					return rgb ? {
						r: parseInt(rgb[1], 16),
						g: parseInt(rgb[2], 16),
						b: parseInt(rgb[3], 16)
					} : null;
				}
				
				hexError = "false";
				
				if(bezelStyle == "koko-aio"){
					var contrast = $("#contrasts option:selected").val();
					if(contrast < 1){
						rSetting = (((hexToRgb(hex).r - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .1 + .105) + (contrast * .01 + .0105))) / 128)).toFixed(10);
						gSetting = (((hexToRgb(hex).g - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .1 + .105) + (contrast * .01 + .0105))) / 128)).toFixed(10);
						bSetting = (((hexToRgb(hex).b - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .01 + .055) + (contrast * .001 + .0055))) / 128)).toFixed(10);
					}
					else{
						rSetting = (((hexToRgb(hex).r - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .01 + .105) + (contrast * .001 + .0105))) / 128)).toFixed(10);
						gSetting = (((hexToRgb(hex).g - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .01 + .105) + (contrast * .001 + .0105))) / 128)).toFixed(10);
						bSetting = (((hexToRgb(hex).b - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .001 + .055) + (contrast * .0001 + .0055))) / 128)).toFixed(10);
					}
					
					contrastSetting = contrast+"0000";
					$(".conversion").text('BEZEL_R = "'+rSetting+'"\nBEZEL_G = "'+gSetting+'"\nBEZEL_B = "'+bSetting+'"\nBEZEL_CON = "'+contrastSetting+'"');
				}
				else{
					mbzHSB = rgbToHSB(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
				}
				
				$(".square").css("box-shadow", "0px 0px 14px 4px rgba("+hexToRgb(hex).r+", "+hexToRgb(hex).g+", "+hexToRgb(hex).b+", 0.25)");
				$(".square").css("background", "#"+hex);
				
				$("#copy").prop("disabled", false);
				colorMessage(hex);
			}
			
			if(hexError == "true"){
				$(".message").html("HEX needs to be <strong>RRGGBB</strong> value");
				$(".message").addClass("error");
				$(".info").empty();
			}
			else{
				$(".message").removeClass("error");
			}
			
			$(".contrast input, .hex input").blur();
		}
		else{
			var r = parseInt($(".rgb input[name='red']").val()),
			g = parseInt($(".rgb input[name='green']").val()),
			b = parseInt($(".rgb input[name='blue']").val()),
			rgb = "rgb("+r+", "+g+", "+b+")";
			
			if(r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255){
				rgbError = "true";
			}
			else if(Number.isInteger(r) == false || Number.isInteger(g) == false || Number.isInteger(b) == false){
				rgbError = "true";
			}
			else{
				rgbError = "false";
				
				if(bezelStyle == "koko-aio"){
					var contrast = $("#contrasts option:selected").val();
					if(contrast < 1){
						rSetting = (((r - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .1 + .105) + (contrast * .01 + .0105))) / 128)).toFixed(10);
						gSetting = (((g - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .1 + .105) + (contrast * .01 + .0105))) / 128)).toFixed(10);
						bSetting = (((b - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .01 + .055) + (contrast * .001 + .0055))) / 128)).toFixed(10);
					}
					else{
						rSetting = (((r - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .01 + .105) + (contrast * .001 + .0105))) / 128)).toFixed(10);
						gSetting = (((g - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .01 + .105) + (contrast * .001 + .0105))) / 128)).toFixed(10);
						bSetting = (((b - 128) * (0.395 - (contrast - 1.30) * ((3.75 - contrast) * (contrast * .001 + .055) + (contrast * .0001 + .0055))) / 128)).toFixed(10);
					}
					
						contrastSetting = contrast+"0000";
						$(".conversion").text('BEZEL_R = "'+rSetting+'"\nBEZEL_G = "'+gSetting+'"\nBEZEL_B = "'+bSetting+'"\nBEZEL_CON = "'+contrastSetting+'"');
				}
				else{
					mbzHSB = rgbToHSB(r, g, b);
				}
				
				$(".square").css("box-shadow", "0px 0px 14px 4px rgba("+r+", "+g+", "+b+", 0.25)");
				$(".square").css("background", rgb);
				
				$("#copy").prop("disabled", false);
				colorMessage(rgb);
			}
			
			if(rgbError == "true"){
				$(".message").text("RGB has to be numerical values between 0 to 255");
				$(".message").addClass("error");
				$(".info").empty();
			}
			else{
				$(".message").removeClass("error");
			}
			
			$(".contrast input, .rgb input").blur();
		}
		
		if(bezelStyle == "mbz" && hexError == "false" && rgbError == "false"){
			var hue = Math.round(mbzHSB[0]),
				saturation = Math.round(mbzHSB[1]),
				brightness = Math.round(mbzHSB[2]);
			
			if(imageType == "yellow"){
				if(hue < 52 && $(".layer input").val() != "1"){
					hue = hue + 308;
				}
				else if($(".layer input").val() != "1"){
					hue = hue - 52;
				}
				
				switch($(".layer input").val()){
					case "1":
						$(".conversion").text('HSM_BZL_COLOR_HUE = "'+hue+'.000000"\nHSM_BZL_COLOR_SATURATION = "'+saturation+'.000000"\nHSM_BZL_COLOR_VALUE = "'+brightness+'.000000"');
						break;
					case "2":
						$(".conversion").text('HSM_BG_HUE = "'+hue+'.000000"\nHSM_BG_SATURATION = "'+saturation+'.000000"\nHSM_BG_BRIGHTNESS = "'+brightness+'.000000"\nHSM_BG_GAMMA = "0.450000"');
						break;
					case "3":
						$(".conversion").text('HSM_LED_HUE = "'+hue+'.000000"\nHSM_LED_SATURATION = "'+saturation+'.000000"\nHSM_LED_BRIGHTNESS = "'+brightness+'.000000"\nHSM_LED_GAMMA = "0.450000"');
						break;
					case "4":
						$(".conversion").text('HSM_DEVICE_HUE = "'+hue+'.000000"\nHSM_DEVICE_SATURATION = "'+saturation+'.000000"\nHSM_DEVICE_BRIGHTNESS = "'+brightness+'.000000"\nHSM_DEVICE_GAMMA = "0.450000"');
						break;
					case "5":
						$(".conversion").text('HSM_DEVICELED_HUE = "'+hue+'.000000"\nHSM_DEVICELED_SATURATION = "'+saturation+'.000000"\nHSM_DEVICELED_BRIGHTNESS = "'+brightness+'.000000"\nHSM_DEVICELED_GAMMA = "0.450000"');
						break;
					case "6":
						$(".conversion").text('HSM_DECAL_HUE = "'+hue+'.000000"\nHSM_DECAL_SATURATION = "'+saturation+'.000000"\nHSM_DECAL_BRIGHTNESS = "'+brightness+'.000000"\nHSM_DECAL_GAMMA = "0.450000"');
						break;
					case "7":
						$(".conversion").text('HSM_TOP_HUE = "'+hue+'.000000"\nHSM_TOP_SATURATION = "'+saturation+'.000000"\nHSM_TOP_BRIGHTNESS = "'+brightness+'.000000"\nHSM_BRIGHTNESS_GAMMA = "0.450000"');
						break;
					case "8":
						$(".conversion").text('HSM_CAB_GLASS_HUE = "'+hue+'.000000"\nHSM_CAB_GLASS_SATURATION = "'+saturation+'.000000"\nHSM_CAB_GLASS_BRIGHTNESS = "'+brightness+'.000000"\nHSM_CAB_GLASS_GAMMA = "0.450000"');
						break;
				}
			}
			else{
				switch($(".layer input").val()){
					case "1":
						$(".conversion").text('HSM_BZL_COLOR_HUE = "'+hue+'.000000"\nHSM_BZL_COLOR_SATURATION = "'+saturation+'.000000"\nHSM_BZL_COLOR_VALUE = "'+brightness+'.000000"');
						break;
					case "2":
						$(".conversion").text('HSM_BG_HUE = "'+hue+'.000000"\nHSM_BG_SATURATION = "'+saturation+'.000000"\nHSM_BG_BRIGHTNESS = "'+brightness+'.000000"');
						break;
					case "3":
						$(".conversion").text('HSM_LED_HUE = "'+hue+'.000000"\nHSM_LED_SATURATION = "'+saturation+'.000000"\nHSM_LED_BRIGHTNESS = "'+brightness+'.000000"');
						break;
					case "4":
						$(".conversion").text('HSM_DEVICE_HUE = "'+hue+'.000000"\nHSM_DEVICE_SATURATION = "'+saturation+'.000000"\nHSM_DEVICE_BRIGHTNESS = "'+brightness+'.000000"');
						break;
					case "5":
						$(".conversion").text('HSM_DEVICELED_HUE = "'+hue+'.000000"\nHSM_DEVICELED_SATURATION = "'+saturation+'.000000"\nHSM_DEVICELED_BRIGHTNESS = "'+brightness+'.000000"');
						break;
					case "6":
						$(".conversion").text('HSM_DECAL_HUE = "'+hue+'.000000"\nHSM_DECAL_SATURATION = "'+saturation+'.000000"\nHSM_DECAL_BRIGHTNESS = "'+brightness+'.000000"');
						break;
					case "7":
						$(".conversion").text('HSM_TOP_HUE = "'+hue+'.000000"\nHSM_TOP_SATURATION = "'+saturation+'.000000"\nHSM_TOP_BRIGHTNESS = "'+brightness+'.000000"');
						break;
					case "8":
						$(".conversion").text('HSM_CAB_GLASS_HUE = "'+hue+'.000000"\nHSM_CAB_GLASS_SATURATION = "'+saturation+'.000000"\nHSM_CAB_GLASS_BRIGHTNESS = "'+brightness+'.000000"');
						break;
				}
			}
		}

		event.preventDefault();
		
	});
});