(function($) {
    'use strict';
    sliders = [];
    window.jsonData = new Object();
    var partJsonData = new Object();
    
    var mainTempBgColor, partBgColor,tlBgColor,
    hdln_01_Color, subHdln_01_Color,
    hdln_02_Color, subHdln_02_Color, 
    txtColor, btnTxtColor, btnBgColor,
    gapLineColor;
    
    u = 'schablone/' + $('.h2-temp').attr('data-template') + '.jsp';
    
    getCookie = document.cookie;
            
    function getTag(name) { 
        index = getCookie.indexOf(name + "=");
        if (index === -1){
            return null;
        }
        startVal = getCookie.indexOf("=", index) + 1;
        finishVal = getCookie.indexOf(";", startVal);
        if (finishVal === -1){
            finishVal = getCookie.length;
        }
        return unescape(getCookie.substring(startVal, finishVal)); 
    }
    
    if (!getTag("firstVisit")) {
        $('#outer-wrapper-help').popup('show');
        $('.inner-wrapper-help').delegate('input[name=no_more_help]', 'click' ,function(e){
            if( $(this).is(':checked') ){
                document.cookie = "firstVisit=true";
            }else{
                delete_cookie('firstVisit');
            }
        });
    }else{
        $('input[name=no_more_help]').attr( "checked", true );
    }
	
    $('.logo-and-co, .selected-temp').click( function(event){
        event = event || window.event;
        //IE uses srcElement as the target
        var target = event.target || event.srcElement;
        
        //alert( 'TEST: ' + this.className );
        
        if( this.className === 'logo-and-co' ){
            switch( target.className ){
                case "help-me":
                   // alert( 'CLICKE ELEMANT: ' + target.className);
					$('#outer-wrapper-help').popup('show');
                    break;
                case "history-back":
					//alert( 'CLICKE ELEMANT: ' + target.className);                   
				   $('#outer-wrapper-leavepage').popup('show');
                    break;
                /*case "get-global-settings":
                    alert( 'CLICKE ELEMANT: ' + target.className);
                    break;*/
                case "resP":
                   // alert( 'CLICKE ELEMANT: ' + target.className);
					showMobile();
                    break;
                case "show-settings":
                    //alert( 'CLICKE ELEMANT: ' + target.className);
					break;
            }
        }
        
        if( this.className === 'selected-temp popup_content' ){
            switch( target.className ){
            case "btn-temp-preview-close":
                //alert( 'CLICKE ELEMANT: ' + target.className);
                $('.selected-temp').popup('hide');
                break;
            }
        }
        
    });

    $('.help-close').click(function(){
        $('#outer-wrapper-help').popup('hide');
    });
	$('.config-close').click(function(){
        $('.selected-temp').popup('hide');
    });
    
    $('.global-settings-close, .btn-reject-global-settings').on('click', function(){

        $('#globalSettings').popup('hide');
    });
    
    $('.confirm-global-settings-close').on('click', function(){
        $('#showGlobalSettings').popup('hide');
    });
    
    $('.close, .close-part-settings').click(function(){
        $('#my_popup').popup('hide');
    });
    
    $('#btn_load_gl_settings, .catch-error-go-to-config').on('click', function(){
        $('#catch-error').popup('hide');
        $('#globalSettings').popup('show');
    });
	
	$('.catch-error-close').on('click', function(){
        $('#catch-error').popup('hide');
    });
	
	 $('.leavepage-close').on('click', function(){
        $('#outer-wrapper-leavepage').popup('hide');
    });

    /*
     * Globale Settings
     * @type HELP FUNCTIONS 
     */
    
    function hexc(colorval) {
        if(colorval !== undefined){
            var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            delete(parts[0]);
            for (var i = 1; i <= 3; ++i) {
                parts[i] = parseInt(parts[i]).toString(16);
                if (parts[i].length === 1) parts[i] = '0' + parts[i];
            }
            color = '#' + parts.join('');
            return color;
        }
        
    }
    
    function ConvertFormToJSON(form){
        var array = $(form).find(':input:not([readonly])').serializeArray();
        var json = {};
        $.each(array, function() {
            if(this.value === 'Preheader_and_Header'){
                //alert('People');
            }
            json[this.name] = this.value || '';
        });
        partJsonData = json;
        return json;
    }
    
    function showMobile(){
        var w = window.open('', 'title', 'width=410, height=700,scrollbars=yes,directories=no,menubar=no,toolbar=no,location=no');
        var html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
                + '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">'
                + '<html><head>'
                + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
                + '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>'
                + '<meta name="format-detection" content="telephone=no"/>'
                + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />'
                + '<title>Print Your Recipe</title>'
                + '<body style="PADDING-BOTTOM:0px; MARGIN:0px; PADDING-LEFT:0px; PADDING-RIGHT:0px; PADDING-TOP:0px; -webkit-text-size-adjust:none;pointer-events: none; cursor: default;" bgcolor="#353535">'
                + $('<div />').append($('.result').clone()).html()
                + '</div></body></html>';
        w.document.open();
		w.focus();
        w.document.write(html);
        w.document.close();
        return false;
    }
    
    /*
     * 
     * @type End Help Functions
     */
    

    var rq_html = $.get(u + '?locale=de', function(data) {
        $(".result").html('');
        $(".result").append(data);
    });
    

	function getGlobalSettings(){
		/**
         * Assigning values from CMaSter Template to the variables
        */
		
        mainTempBgColor = $('.main-td-wrapper').attr( 'bgcolor');
        hdln_01_Color = $('.am-hdln-01').css('color');
        subHdln_01_Color = $('.am-sub-hdln-01').css('color');
        hdln_02_Color = $('.am-hdln-02').css('color');
        subHdln_02_Color = $('.am-sub-hdln-02').css('color');
        btnTxtColor = hexc($('.am-btn-txt').css('color'));
        btnBgColor = $('.am-btn').attr( 'bgcolor');
        gapLineColor = $('.am-trennlinie').css( 'border-bottom-color');
		tlBgColor = $('.borderB').css( 'border-bottom-color');
		
		
        $.each($('.result').find('table[title]'), function(){
            console.log( 'TITEL: ' + $(this).attr('title') );
            partBgColor = hexc($(this).css('background-color'));
            txtColor = hexc($(this).css('color'));
        });
        
		
        var globalSettingsContainer = $('.global-settings-inner-form'); 
        globalSettingsContainer.load( 'inc/configGlobalSettings.jsp?locale=de', function( response, status, xhr ) {

            $('input[name=Newsletter_Background_Color]').val( mainTempBgColor );
            $('input[name=Paragraph_Background_Color]').val( partBgColor ); 			
            $('input[name=Headline_Font_Color]').val( hexc( hdln_01_Color ) );
            $('input[name=Subheadline_Font_Color]').val( hexc( subHdln_01_Color ) );
            $('input[name=Headline_2_Font_Color]').val( hexc( hdln_02_Color ) );
            $('input[name=Subheadline_2_Text_Color]').val( hexc( subHdln_02_Color ) );
            $('input[name=Text_Font_Color]').val( txtColor );
            $('input[name=Button_Text_Font_Color]').val( btnTxtColor );
            $('input[name=Button_Background_Color]').val( btnBgColor );
            $('input[name=Separator_Color]').val(hexc( gapLineColor) );
            $('input[name=Separator_Color]').val(hexc( tlBgColor) ); 
			
			
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                //alert( msg + xhr.status + " " + xhr.statusText );
            }
        });	
	}
	
	function setGlobalSettings(){
		 $('#globalSettings').find('input[type=text]').not('.tpl_name').each( function(){
                    var theEl = $(this);
					
                    //alert( $(this).next('input').val() )

                    $(this).minicolors({
                        defaultValue: theEl.val(),
                        opacity: false,
                        position: 'top right',
                        change: function(hex, opacity) {
                            if( !hex ) return;
                            if( opacity ) hex += ', ' + opacity;
                            if( typeof console === 'object' ) {
                                console.log(hex);
                            }
                        }
                    });
            });	
	}
    
    $.when(rq_html).then(function(){
        getGlobalSettings();
		
    }).then(function(){
        $('.get-global-settings, #btn_load_gl_settings').on('click', function(){
            $('#globalSettings').popup('show');
			setGlobalSettings();   
        });
        
            $.fn.serializeFormJSON = function () {
                var objJson = {};
                
                objJson = { "template":{
                    "style": 
                    {
                        "Template_Name":"",
                        "Newsletter_Background_Color": "",
                        "Paragraph_Background_Color": "",
                        "Headline_Font": "",
                        "Headline_Font_Style": "",
                        "Headline_Font_Size": "",
                        "Headline_Font_Color": "",
                        "Subheadline_Font": "",
                        "Subheadline_Font_Style": "",
                        "Subheadline_Font_Size": "",
                        "Subheadline_Font_Color": "",
                        "Headline_2_Font": "",
                        "Headline_2_Font_Style": "",
                        "Headline_2_Font_Size": "",
                        "Headline_2_Font_Color": "",
                        "Subheadline_2_Font": "",
                        "Subheadline_2_Font_Style": "",
                        "Subheadline_2_Font_Size": "",
                        "Subheadline_2_Text_Color": "",
                        "Text_Font": "",
                        "Text_Font_Style": "",
                        "Text_Font_Size": "",
                        "Text_Font_Color": "",
                        "Button_Text_Font": "",
                        "Button_Text_Font_Style": "",
                        "Button_Text_Font_Size": "",
                        "Button_Text_Font_Color": "",
                        "Button_Background_Color": "",
						"Link_Text_Font_Color": "",
                        "Separator_Color": ""
                    },
                    "paragraphs":
                    [
                        /*{
                            "name": "",
                            "visible": "",
                            "style": 
                            {
                                "txt_font_family": ""
                            }
                        },
                        {},
                        {}*/
                    ]
                }};
                
              //  alert('FISRT: ' + this.attr('name') );
                var a = this.serializeArray();
               // alert( 'A: ' + JSON.stringify(a) );
                //a = JSON.stringify(a);
                $.each(a, function () {
                    if (objJson[this.name]) {
                        if (!objJson[this.name].push) {
                            objJson[this.name] = [objJson[this.name]];
                        }
                        objJson[this.name].push(this.value || '');
                    } else {
                        //var tt = this.name;
						
						/*if (this.value === 'false' || this.value === 'true'){
                        alert('NAME: ' + this.name + '------Value: ' + this.value);
						}*/
						//alert('Value: ' + this.value);
                        if(this.value !== 'true' && this.value !== 'false'){
                            //alert('NONE OF THEM');
                            objJson['template']['style'][this.name] = this.name;
                            objJson['template']['style'][this.name] = this.value;
                        }else if(this.value === 'false'){
                            //alert('It\'s false');
                            var paragraph = {
                                "name": this.name,
                                "active": false,
                                "style":{}
                            };
                            objJson['template'].paragraphs.push(paragraph);
                        }else if(this.value === 'true'){
                            //alert('it\'s true');
                            var paragraph = {
                                "name": this.name,
                                "active": true,
                                "style":{}
                            };
                            objJson['template'].paragraphs.push(paragraph);
                        }
                    }
                });
                return objJson;
            };
    
           $('input[name=active_paragraphen]').val( $('.result').find('table[title]').length );
            $('.my-parts-wrapper').html('');
            
            $.each( $('.control-parts').find('input[type=checkbox]'), function(){
               // alert('NAME: ' + $(this).attr('name') + ': ' +  $(this).is(':checked') );
                
                $('<input>').attr({
                    type: 'hidden',
                    name: $(this).attr('name'),
                    value: $(this).is(':checked'),
                    style:'width:220px; height:20px; margin-bottom:5px; border:2px solid green;'
                }).appendTo('.my-parts-wrapper');
            });

    }).then(function() {
             
        $('#globalSettings, .block-details').delegate('input[type=text]','focusout',function(e){
            //alert( $(this).next('input[type=text]').attr('name') );
            $(this).next('input[type=text]').css({
                'background-color': $(this).val()
            });
        });
        
		function saveGlobalSettings(GlobalSettingsForm){
			
			var GlobalSettingsForm = GlobalSettingsForm;
			$.each( GlobalSettingsForm.find(':input:not([readonly])'), function(){
                var elInput = $(this);
                switch (elInput.attr('name')) {
                    case 'Newsletter_Background_Color':
                        $('.main-td-wrapper').css({ 'background-color': $(this).val() });
                        break;
                        
                    case 'Paragraph_Background_Color':
                        var inpEl = $(this);
                        $.each($('.result').find('table[title][title!="Navigation"]'), function(){
                            var partEl = $(this);
                            partEl.css('background-color', inpEl.val() );
                        });
						$('.header-part-bgcolor').css({ 'background-color': $(this).val() });
                        break;
					
            // Start Headline Formating
                    case 'Headline_Font':
                        $('.am-hdln-01').css({'font-family': $(this).val() });
                        break;
                        
                    case 'Headline_Font_Size':
                        $('.am-hdln-01').css({'font-size': $(this).val() + 'px' });
                        break;
                        
                    case 'Headline_Font_Style':
                        if( $(this).val() === 'italic bold' ){
                            $('.am-hdln-01').css({'font-style': 'italic', 'font-weight':'bold' });
                        }else{
                            $('.am-hdln-01').css({'font-style': $(this).val() });
                        }
                        break;
                        
                    case 'Headline_Font_Color':
                        $('.am-hdln-01').css({'color': $(this).val() });
                        break;
                    
            // Start Sub Headline Formating
                    case 'Subheadline_Font':
                        $('.am-sub-hdln-01').css({'font-family': $(this).val() });
                        break;
                        
                    case 'Subheadline_Font_Size':
                        $('.am-sub-hdln-01').css({'font-size': $(this).val() + 'px' });
                        break;
                        
                    case 'Subheadline_Font_Style':
                        if( $(this).val() === 'italic bold' ){
                            $('.am-sub-hdln-01').css({'font-style': 'italic', 'font-weight':'bold' });
                        }else{
                            $('.am-sub-hdln-01').css({'font-style': $(this).val() });
                        }
                        break;
                        
                    case 'Subheadline_Font_Color':
                        $('.am-sub-hdln-01').css({'color': $(this).val() });
                        break;
                    
            // Start Headline 2 Formating
                    case 'Headline_2_Font':
                        $('.am-hdln-02').css({'font-family': $(this).val() });
                        break;
                        
                    case 'Headline_2_Font_Size':
                        $('.am-hdln-02').css({'font-size': $(this).val() + 'px' });
                        break;
                        
                    case 'Headline_2_Font_Style':
                        if( $(this).val() === 'italic bold' ){
                            $('.am-hdln-02').css({'font-style': 'italic', 'font-weight':'bold' });
                        }else{
                            $('.am-hdln-02').css({'font-style': $(this).val() });
                        }
                        break;
                        
                    case 'Headline_2_Font_Color':
                        $('.am-hdln-02').css({'color': $(this).val() });
                        break;
                   
            // Start Subeadline 2 Formating
                    case 'Subheadline_2_Font':
                        $('.am-sub-hdln-02').css({'font-family': $(this).val() });
                        break;
                        
                    case 'Subheadline_2_Font_Size':
                        $('.am-sub-hdln-02').css({'font-size': $(this).val() + 'px' });
                        break;
                        
                    case 'Subheadline_2_Font_Style':
                        if( $(this).val() === 'italic bold' ){
                            $('.am-sub-hdln-02').css({'font-style': 'italic', 'font-weight':'bold' });
                        }else{
                            $('.am-sub-hdln-02').css({'font-style': $(this).val() });
                        }
                        break;
                        
                    case 'Subheadline_2_Text_Color':
                        $('.am-sub-hdln-02').css({'color': $(this).val() });
                        break;
						
            // Start Text Formating
                    case 'Text_Font':
                        $('.am-txt-main').css({'font-family': $(this).val() });
                        break;
                        
                    case 'Text_Font_Size':
                        $('.am-txt-main').css({'font-size': $(this).val() + 'px' });
                        break;
                        
                    case 'Text_Font_Style':
                        if( $(this).val() === 'italic bold' ){
                            $('.am-txt-main').css({'font-style': 'italic', 'font-weight':'bold' });
                        }else{
                            $('.am-txt-main').css({'font-style': $(this).val() });
                        }
                        break;
                        
                    case 'Text_Font_Color':
                        $('.am-txt-main').css({'color': $(this).val() });
                        break;
     
            
					
                }
            });
		}
		
        $('.btn-store-global-settings').click(function(e){
            e.preventDefault();
			saveGlobalSettings($('.global-settings-inner-form'));
            //delete jsonData.Paragraphs;
            //jsonData = JSON.stringify( $('#globalForm').find(':input:not([readonly])').serializeFormJSON());  //$(this).serializeFormJSON();
            jsonData =  $('#globalForm').find(':input:not([readonly])').serializeFormJSON();  //$(this).serializeFormJSON();
            //$('.myJson').html(jsonData);
            $('#globalSettings').popup('hide');
        });
        
         
    }).then(function(){
        $('.btn-store-part-settings, .btn-preview-part').click(function(){
            
            var elTarget = $(this);
        
            //alert( elTarget.attr('class') );
        
            //alert( 'JSON DATA: ' + typeof jsonData );
            var inputPart;
            var editablePart = $('input[name=paragraph]').val();
            $.each( $('form[name=part-form]').find(':input:not([readonly])'),function(){
                //alert( $(this).attr('name') );
                inputPart = $(this);

                //alert('NAME: ' + inputPart.attr('name'));

                if(editablePart === 'Preheader_and_Header'){
                    switch(inputPart.attr('name')) {
                        case 'Snippet_Text_Font_Color': $('.part-text-snippet').css({'color': $(this).val() });
                            break;
                        case 'Snippet_Text_Font_Size': $('.part-text-snippet').css({'font-size': $(this).val() });
                            break;
                        case 'Browser_Text_Font_Color': $('.part-text-browser').css({ 'color': $(this).val() });
                            break;
                        case 'Browser_Text_Font_Size': $('.part-text-browser').css({ 'font-size': $(this).val() });
                            break;
                        case 'Text_Font_Color': $('.part-text-normal').css({ 'color': $(this).val() });
                            break;
                        case 'Text_Font_Size': $('.part-text-normal').css({ 'font-size': $(this).val() });
                            break;
                    }
                }
                
                if(editablePart === 'Navigation'){
                    switch(inputPart.attr('name')) {
                        case 'Navi_Text_Font_Size': $('.part-navigation-elem').css({'font-size': $(this).val() });
                            break;
                        case 'Navi_Text_Font_Color': $('.part-navigation-elem').css({ 'color': $(this).val() });
                            break;
						 case 'Navi_Background_Color': $('.part-bg-color-navigation').css({ 'background-color': $(this).val() });
                            break;
                    }
                }
				
				if(editablePart === 'Headline_and_Subheadline'){
                    switch(inputPart.attr('name')) {
                        case 'Background_Color': $('.hdln_subhdln').css({'background-color': $(this).val()});
                            break;
                        case 'Head_Subheadline_Font_Color': $('.am-hdln-01').css({ 'color': $(this).val() });$('.am-sub-hdln-01').css({ 'color': $(this).val() });
                            break;
                    }
                }

                if(editablePart === 'Editorial_and_TOC'){
                    switch(inputPart.attr('name')) {
                        case 'Salutation_Text_Font_Size': $('.part-text-anrede-toc').css({'font-size': $(this).val() });
                            break;
                        case 'Salutation_Text_Font_Color': $('.part-text-anrede-toc').css({'color': $(this).val() });
                            break;
                        case 'TOC_Headline_Font_Size': $('.part-hdln-text-toc').css({ 'font-size': $(this).val() });
                            break;
                        case 'TOC_Headline_Font_Color': $('.part-hdln-text-toc').css({ 'color': $(this).val() });
                            break;
						case 'TOC_Text_Font_Size': $('.TOC_Text_Font_Size').css({ 'font-size': $(this).val() });
                            break;
                        case 'TOC_Text_Font_Color': $('.TOC_Text_Font_Color').css({ 'color': $(this).val() });
                            break;
						case 'TOC_Background_Color': $('.TOC_Background_Color').css({'background-color': $(this).val()});
                            break;	
                    }
                }
                
                
                if(editablePart === 'Editorial_and_Ad'){
                    switch(inputPart.attr('name')) {
						 case 'Salutation_Text_Font_Size': $('.part-text-anrede-ad').css({'font-size': $(this).val() });
                            break;
                        case 'Salutation_Text_Font_Color': $('.part-text-anrede-ad').css({'color': $(this).val() });
                            break;
						case 'Ad_Headline_Font_Size': $('.part-hdln-text-ad').css({ 'font-size': $(this).val() });
                            break;
                        case 'Ad_Headline_Font_Color': $('.part-hdln-text-ad').css({ 'color': $(this).val() });
                            break;
						case 'Ad_Text_Font_Size': $('.Ad_Text_Font_Size').css({ 'font-size': $(this).val() });
                            break;
                        case 'Ad_Text_Font_Color_odd': $('.Ad_Text_uneven_Color').css({'color': $(this).val() });
                            break;
                        case 'Ad_Text_Font_Color_even': $('.Ad_Text_even_Color').css({ 'color': $(this).val() });
                            break;
                        case 'Ad_Background_Color_odd': $('.Ad_Background_uneven_Color').css({ 'background-color': $(this).val() });
                            break;
                        case 'Ad_Background_Color_even': $('.Ad_Background_even_Color').css({'background-color': $(this).val() });
                            break;
                    }
                }
                
                if(editablePart === '3_img_headline_right'){
                    switch(inputPart.attr('name')) {
                        case 'Background_Color': $('.part-bg-color-THREE-img-hdln-RIGHT').css({'background-color': $(this).val() });
                            break;
                        case 'Head_Subheadline_Font_Color': $('.part-headline-color-THREE-img-hdln-RIGHT').css({ 'color': $(this).val() });
                            break;
                    }
                }
                if( editablePart === '3_img_headline_left'){
                    switch(inputPart.attr('name')) {
                        case 'Background_Color': $('.part-bg-color-THREE-img-hdln-LEFT').css({'background-color': $(this).val() });
                            break;
                        case 'Head_Subheadline_Font_Color': $('.part-headline-color-THREE-img-hdln-LEFT').css({ 'color': $(this).val() });
                            break;
                    }
                }
                if(editablePart === '3_img_headline_top'){
                    switch(inputPart.attr('name')) {
                        case 'Background_Color': $('.part-bg-color-THREE-img-hdln-TOP').css({'background-color': $(this).val() });
                            break;
                        case 'Head_Subheadline_Font_Color': $('.part-headline-color-THREE-img-hdln-TOP').css({ 'color': $(this).val() });
                            break;
                    }
                }
                if(editablePart === '2_img_headline'){
                    switch(inputPart.attr('name')) {
                        case 'Background_Color': $('.part-bg-color-TWO-images-hdln').css({'background-color': $(this).val() });
                            break;
                        case 'Head_Subheadline_Font_Color': $('.part-headline-color-TWO-images-hdln').css({ 'color': $(this).val() });
                            break;
                    }
                }
                if(editablePart === '1_img_box_right_headline'){
                    switch(inputPart.attr('name')) {
                        case 'Background_Color': $('.part-bg-color-ONE-image-box-RIGHT-hdln').css({'background-color': $(this).val() });
                            break;
                        case 'Head_Subheadline_2_Font_Color': $('.am-hdln-02').css({ 'color': $(this).val() });$('.am-sub-hdln-02').css({ 'color': $(this).val() });
                            break;
						case 'Text_Font_Color_Left': $('.am-txt-main-1-img-right-hdln').css({ 'color': $(this).val() });
                            break;   
						case 'Button_Text_Font_Color_Left': $('.am-btn-1-img-right-hdln').css({ 'color': $(this).val() });
                            break;		
                        case 'Button_Background_Color_Left': $('.am-btn-1-img-right-hdln').css({ 'background-color': $(this).val() });
                            break;
                    }
                }
                if(editablePart === '1_img_box_left_headline'){
                    switch(inputPart.attr('name')) {
                        case 'Background_Color': $('.part-bg-color-ONE-image-box-LEFT-hdln').css({'background-color': $(this).val() });
                            break;
                        case 'Head_Subheadline_2_Font_Color': $('.am-hdln-02').css({ 'color': $(this).val() });$('.am-sub-hdln-02').css({ 'color': $(this).val() });
                            break;
						case 'Text_Font_Color_Right': $('.am-txt-main-1-img-left-hdln').css({ 'color': $(this).val() });
                            break;   
						case 'Button_Text_Font_Color_Right': $('.am-btn-txt-1-img-left-hdln').css({ 'color': $(this).val() });
                            break;		
                        case 'Button_Background_Color_Right': $('.am-btn-1-img-left-hdln').css({ 'background-color': $(this).val() });
                            break;
                    }
                }
                
                if(editablePart === 'Footer'){
                    switch(inputPart.attr('name')) {
                        
                        case 'Background_Color': $('.part-bg-color-footer').css({'background-color': $(this).val() });
                            break;
                        case 'Footer_Text_Font_Size': $('.part-text-footer').css({ 'font-size': $(this).val() });
                            break;
                        case 'Footer_Text_Font_Color': $('.part-text-footer').css({ 'color': $(this).val() });
                            break;
                    }
                }
                if(editablePart === 'Footnote'){
                    switch(inputPart.attr('name')) {
                        case 'Background_Color': $('.part-bg-color-footnote').css({'background-color': $(this).val() });
                            break;
                        case 'Footnote_Text_Font_Size': $('.part-text-footnote').css({ 'font-size': $(this).val() });
                            break;
                        case 'Footnote_Text_Font_Color': $('.part-text-footnote').css({ 'color': $(this).val() });
                            break;
                    }
                }
                if(editablePart === 'Copyright'){
                    switch(inputPart.attr('name')) {
                        case 'Copyright_Text_Font_Size': $('.part-text-copyright').css({ 'font-size': $(this).val() });
                            break;
                        case 'Copyright_Text_Font_Color': $('.part-text-copyright').css({ 'color': $(this).val() });
                            break;
                    }
                }
            });
            
            
            if( elTarget.attr('class') === 'btn-store-part-settings'){

                ConvertFormToJSON( $('#part-form') );

                console.log('partJSON Before last Merge: ' + partJsonData);
                var el;
                $.each(jsonData.template.paragraphs, function(i, v) {

                    //alert('I: ' + i);
                    if (v.name === editablePart) {
                        //alert('The NAME is: ' + v.name);

                        //jsonData.template.paragraphs.style.push(partJsonData);
                        v.style = partJsonData;
                        el = true;
                        return false;
                    }
                    if (v.name !== editablePart) {
                        el = false;
                    }else{return false;};

                    //alert( 'v.name === editablePart: ' + v.name === editablePart );
                });

                //alert( 'myEL ###########: ' + el);
                //alert( 'EL: ' + el );
                if(!el){
                    var paragraph = {
                        "name": editablePart,
                        "style": partJsonData
                    };
                    jsonData.template.paragraphs.push(paragraph);
                }
                //jsonData.template.paragraphs.push(partJsonData);
                console.log('jsonData After last Merge: ' + jsonData);


                $('#my_popup').popup('hide');
            
            }
            
        });
        
    })
	
	  .then(function(){
        //JSON.stringify(obj) — converts an JavaScript object to a JSON string
        //JSON.parse(str) — converts a JSON string back to a JavaScript object
        /**
         * There is difference between push([{ and push({ 
         * (between pushing array, consists of one object, and pushing object)
        **/

        $('.show-settings').on('click', function(){
            
            /*if( jsonData.template.length > 0 ){
               alert('NOT EMPTY'); 
            }else{
                alert('EMPTY');
            }*/
            
            if( jsonData.template === undefined ){
               //alert('EMPTY'); 
               $('#catch-error').popup('show');
               return false;
            }else{

                var parts = $('.result').find('table[title]').length;
                var ar = '';
                $.each( $('.result').find('table[data-part-active=yes]'), function(){
                    ar += $(this).attr('title') + '<br/>' ;

                });

                output = '<ul style="clear:both; list-style-type:none; margin:0; padding:0; width:1000px; height:auto; min-height:700px;">'
                         +  '<li style="clear:both; float:left; width:300px; height:25px; font-weight:bold;">Anzahl der Paragraphen: </li>'
                         +  '<li style="float:left; display:block; width:690px; hegiht:auto; min-height:150px; padding-bottom:10px;" class="part-names"><span style="font-size:36px;">' 
                         + parts 
                         + '</span><br>' + ar + '</li><li style="clear:both; width:1000px; border-top:1px solid #fff;">&nbsp;</li>';
                $.each(jsonData.template.style, function(k, v) {
                    //alert('K: ' + v);
                    output  +='<li style="clear:both; float:left; width:300px; height:25px; font-size:15px; text-transform:capitalize;" class="json-first-li">' 
                            + k.replace(/_/g, ' ') 
                            + ': </li>'
                            + '<li style="float:left; width:690px; height:25px; color:#fff;">' 
                            + v
                            + '</li>';
                });

                output += '<li style="clear:both; width:990px; height:30px; padding:10px 0; font-family:Arial, Helvitica, sans-serif; font-size:20px; font-weight:bold; color:yellow; text-align:center;">Paragraphen Einstellungen:</li>';

                $.each(jsonData.template.paragraphs, function( k, v) {
                    //$.each(v.active, function(j, jVL){

                         var status = v.active;
                         //alert('STATUS: ' + status);
                    //});
                    //if(v.aktive === 'true'){
                        $.each(v.style, function(i, vl){

                            //alert('VL: ' + vl);

                            var b;
                            if(i === 'paragraph'){
                                //alert('I: ' + i + ' VL: ' + vl );  
                                b = "font-weight:bold; font-size:15px; text-decoration:underline;"; 
                            }else{ 
                                //alert('just: ' + vl); 
                                b = "font-weight:normal"; 
                            };

                            output  +='<li style="clear:both; float:left; width:495px; height:25px; font-size:15px; '
                                + b
                                + ' text-transform:capitalize;" class="json-first-li">' 
                                + i.replace(/_/g, ' ') 
                                + '</li>'
                                + '<li style="float:left; width:495px; height:25px;'
                                + b + '">' 
                                + vl
                                + '</li>';
                        });
                    //}
                });

                output += "</ul>";

                $('.show-global-setting-details').html(output);
                jsonData = JSON.stringify(jsonData);
                //alert('jsonData AFTER Stringify: ' + jsonData);
                var output,
                //res = jsonData,
                //parts = $('.result').find('table[data-part-active=yes]').length,
                dataGlobal = "text/json;charset=utf-8," + encodeURIComponent(jsonData);
                $('.download-config, .download-config-part').empty();
                $('<a href="data:' 
                        + dataGlobal 
                        + '" download="data.json"><img src="img/btn_OK.png?locale=de" width="276" height="34"></a>')
                        .appendTo('.download-config');
                jsonData = JSON.parse(jsonData);
                $('#showGlobalSettings').popup('show');
            }
        });
    }), function(){
        alert('Sorry, something is worng here');
        // this function is failure handler in case one of the requests fails
        // the other request may still be pending at this point,
        // you might want to cancel it or handle the situation in another way...
    };

    /**
     * @param {type} cmsOptions
     * @param {type} el
     * @returns {cMasterConfig_v1.2_L1.$.fn@call;each}
     */
    
    $.fn.cMasterConfig = function(cmsOptions, el) {
        //alert('XXXXX');
        var thatEl = $(this);
        var defaults = {
            //'elements': {
                //'$mainBgColor': '',
                //'$partColor': '',
                //'$fFamily': '',
                //'$hdlnColor': '',
                //'$sub_hdlnColor': ''
            //},
            'methods':{
                Configurator: function(){
                    
                    var obj = this;

                    // Public method
                    obj.passConfig = function(){
                        
                        $('.block-details').find('input[type=text]').each(function() {
                            $txtFld = $(this).attr('name');
                            alert('CCC');
                        });
                    };
                    
                }
            }
        };

        var options = $.extend(true, {}, defaults, cmsOptions);
        return this.each(function(){
            console.log( $(this).attr('class') );
            cMasterConfig = new options.methods.Configurator(this);
            var $radTem = $(this).find('input[name=template]');
            $.each($radTem, function() {
                var $elRad = $(this);
                $elRad.next('label').hover(function() {
                    $(this).css({'cursor':'url(img/hover_' + $(this).prev().val() + '.png?locale=de), pointer'});
                });
                $elRad.next('label').click(function() {
                    $(this).prev().prop('checked', true);
                    
                    if( $(this).prev().val() === 'automotive' ){sliders[0].goTo(0); $('.brand-name').html( '&nbsp;&nbsp;' + $(this).prev().val() ).css({'text-transform':'capitalize'});}
                    if( $(this).prev().val() === 'fashion' ){sliders[0].goTo(1); $('.brand-name').html( '&nbsp;&nbsp;' + $(this).prev().val() ).css({'text-transform':'capitalize'});}
                    if( $(this).prev().val() === 'retail' ){sliders[0].goTo(2); $('.brand-name').html( '&nbsp;&nbsp;' + $(this).prev().val() ).css({'text-transform':'capitalize'});}
                    if( $(this).prev().val() === 'finance' ){sliders[0].goTo(3); $('.brand-name').html( '&nbsp;&nbsp;' + $(this).prev().val() ).css({'text-transform':'capitalize'});}
                    if( $(this).prev().val() === 'travel' ){sliders[0].goTo(4); $('.brand-name').html( '&nbsp;&nbsp;' + $(this).prev().val() ).css({'text-transform':'capitalize'});}
                    if( $(this).prev().val() === 'custom' ){sliders[0].goTo(5); $('.brand-name').html( '&nbsp;&nbsp;' + $(this).prev().val() ).css({'text-transform':'capitalize'});}
                    $('button[name=zurKonfig]').on('click', function(){ doHTML('schablone/' + $elRad.val() + '.jsp', 'do.jsp?locale=de&t=' + $elRad.val(), $el, 'true'); });
                });
                $elRad.change(function() {
                    $('select[name=changeStyles]').attr('disabled', false);
                });
            });
            $('.enterStyle').show();
            function doHTML(url, target, id, schablone) {
                window.location.href = target;
                $.get(url + '?id=' + id + '&locale=de', function(data) {
                    if (schablone === 'true') {
                        $(".result").html('');
                        $(".result").append(data);
                    } else {
                        $("#ediTorial").after(data);
                    }
                });
            };

            function doJSON() {
                //var url = 'createXml/passJson.jsp';
                //var data = {};
                var j = $('.myJson').html();
                var json = $.parseJSON(j);
                
                $(json).each(function(i,val){
                    $.each(val,function(k,v){
                        //console.log(k+" : "+ v);    
                    });
                });

                
                var output;
                var res = $('.myJson').html();
               
                output = '<ul style="list-style-type:none; margin:0; padding:0; width:450px; border:1px solid green;">';
                $.each($.parseJSON(res), function(k, v) {
                    output+='<li style="clear:both; float:left; width:180px; border:1px solid orange;">' + k + ': </li><li style="float:left; width:200px; border:1px solid orange;">' + v + "</li>";
                });
                output += "</ul>";
                
                $('.show-global-setting-details').html(output);
                $('.showGlobalSettings').popup('show');
                //alert( $('.myJson').html() );

            };

            $('.getXML').click(function(){
                doJSON();
            });
            
            //var hm;
                                                                                           
            var Slider = function () {
                this.initialize.apply(this, arguments);
            };

            Slider.prototype = {
                initialize: function (slider) {
                    this.ul = slider.children[0];
                    this.li = this.ul.children;
                    this.ul.style.width = (this.li[0].clientWidth * this.li.length) + 'px';
                    this.currentIndex = 0;
                    //this.currentIndex = 1;

                    
                    //alert( 'currentIndex: ' + this.currentIndex );

                      $('.slider-arrow-left>a>img').hide();
					
                    var num = this.currentIndex;
                    var a = num.toString();
                    $.each( $('input[type=radio]'), function(){
                        var thatRadio = $(this);
                        if( thatRadio.attr('data-index') === a ){
                            thatRadio.prop('checked', true);
                            $('.brand-name').html( '&nbsp;&nbsp;' + thatRadio.attr('data-tempArt') );
                        }
                    });
                    
                    $.each( $('.inner-slider>li') , function(){
                        var liEL = $(this);
                        liEL.css({'cursor':'url(img/hover_select.png?locale=de), pointer'}).on('click', function(){
                            $('.selected-temp').popup('show');
                            $('.selected-temp').load('konfiguration-geladen.jsp?locale=de&temp=' + liEL.find('img').attr('alt'), function(data){});
                            //doHTML('schablone/' + liEL.attr('title') + '.jsp', 'do.jsp?locale=de&t=' + liEL.find('img').attr('title'), $el, 'true');
                        });
                    });
                },
                
                
                
                goTo: function (index) {
                    if (index < 0 || index > this.li.length - 1)
                        return;
                    this.ul.style.left = '-' +  (100 * index ) + '%';
                    this.currentIndex = index;
                    
                    $.each( $('.inner-slider>li') , function(){
                        var liEL = $(this);
                        liEL.css({'cursor':'url(img/hover_select.png?locale=de), pointer'}).on('click', function(){
                            $('.selected-temp').load('konfiguration-geladen.jsp?locale=de&temp=' + liEL.find('img').attr('alt'), function(data){});
                        });
                    });
                    //$('.slider').scrollTop(0); 
                    
                    $('.inner-slider>li').scrollTop(0);
                    
                    if(this.currentIndex === 0){
                        $('.slider-arrow-left>a>img').hide();
                        $('.slider-arrow-right').show();
                    }
                    if(this.currentIndex === 5){
                        $('.slider-arrow-left').show();
                        $('.slider-arrow-right').toggle();
                        $('.slider-arrow-left>a>img').show();
                    }
                    if(this.currentIndex <=4  && this.currentIndex >=1){
                        $('.slider-arrow-left, .slider-arrow-right').show();
                        $('.slider-arrow-left>a>img').show();
                    }
                },

                
                goToPrev: function () {
                    this.goTo(this.currentIndex - 1);
                    var num = this.currentIndex;
                    var a = num.toString();
                    
                    $.each( $('input[type=radio]'), function(){
                        var thatRadio = $(this);
                        if( thatRadio.attr('data-index') === a ){
                            thatRadio.prop('checked', true);
                            $('.brand-name').html( '&nbsp;&nbsp;' + thatRadio.attr('data-tempArt') );
                        }
                    });
                    $.each( $('.inner-slider>li') , function(){
                        var liEL = $(this);
                        liEL.css({'cursor':'url(img/hover_select.png?locale=de), pointer'}).on('click', function(){
                            $('.selected-temp').load('konfiguration-geladen.jsp?locale=de&temp=' + liEL.find('img').attr('alt'), function(data){});
                        });
                    });
                    //$('.slider').scrollTop(0);
                    
                    $('.inner-slider>li').scrollTop(0);
                    
                    if(this.currentIndex === 0){
                        $('.slider-arrow-left>a>img').hide();
                    }
                    if(this.currentIndex <=4  && this.currentIndex >=1){
                        $('.slider-arrow-left, .slider-arrow-right').show();
                    }
                },
                goToNext: function () {
                    this.goTo(this.currentIndex + 1);
                    var num = this.currentIndex;
                    var a = num.toString();
                    
                    $.each( $('input[type=radio]'), function(){
                        var thatRadio = $(this);
                        if( thatRadio.attr('data-index') === a ){
                            thatRadio.prop('checked', true);
                            $('.brand-name').html( '&nbsp;&nbsp;' + thatRadio.attr('data-tempArt') );
                        }
                    });
                    $.each( $('.inner-slider>li') , function(){
                        var liEL = $(this);
                        
                        liEL.css({'cursor':'url(img/hover_select.png?locale=de), pointer'}).on('click', function(){
                            $('.selected-temp').load('konfiguration-geladen.jsp?locale=de&temp=' + liEL.find('img').attr('alt'), function(data){});
                            //doHTML('schablone/' + liEL.attr('title') + '.jsp', 'do.jsp?locale=de&t=' + liEL.find('img').attr('title'), $el, 'true');
                        });
                    });
                    //$('.slider').scrollTop(0);
                    $('.inner-slider>li').scrollTop(0);
                    if(this.currentIndex <=4  && this.currentIndex >=1){
                        $('.slider-arrow-left, .slider-arrow-right').show();
                    }
                }
                
            };
            $('.slider').each(function () {
                sliders.push(new Slider(this)); 
            });
        });
    };
    
    
    /** Beginn Help functions
     * 
     */ 
        
    
    $formattedBody = '';

    $('.sendMail').click(function() {
        $formattedBody = $('.forward1').text() + '\n\n' + $('.forward2').text() + '\n\n' + 'Template: ' + $('.tempArt').text() + '\n';
        $.each($('#overLayTab tr').not('.trForward, .gapTr, .hdlnGap, .trGreetings, .trMail'), function() {
            $formattedBody = $formattedBody + $(this).find('td:nth-child(1)').text() + ': ' + $(this).find('td:nth-child(2)').text() + '\n';
        });
        $formattedBody = $formattedBody + $('.greetings').text();

        $(this).attr('href', 'mailto:Bitte tragen Sie Ihren Teradata-Ansprechpartner ein' //+ $('input[name=user]').val() 
                + '?subject=DMC Smart Start – Template Konfiguration'
                + '&body=' + encodeURIComponent($formattedBody));
    });
	
	
    

})(jQuery);

//var forCmConf = $('.firstOptions').cMasterConfig();
$('.wrapper-slide-radios, .main-elems').cMasterConfig();
//$('.block-details').blockConfig();
//var forColorPicker = $('.colpick').cMasterConfig().bar();
