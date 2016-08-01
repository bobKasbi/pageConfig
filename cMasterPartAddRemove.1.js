(function($) {
			
    /* Pre Settings */
    var TbObjConfig = {
        w: '320px',
        h: '400px',
        fm: 'configData',
        partCMS: '',
        
        funca: function() {},
        funcb: function() {}
    };
    var configObj = Object.create(TbObjConfig);
    var TbObjResult = function(arg){
        return{
            constructor: function(){},
            funca: function() {},
            funcb: function() {}
        };
    };
    var resultObj = new TbObjResult('');
    var $root = 'htmlCode/';
    var $temp = $('.h2-temp').attr('data-template');
    var $elTbl;
    var $chLeft;
    var $part, $ableCheck;
	
	function getDefaults(tb){
		var tb = tb;
		switch (tb.attr('title')){
			case 'Preheader_and_Header':
			   snippetTextColor = $('.part-text-snippet').css('color');
			   snippetTextSize = $('.part-text-snippet').css('font-size');
			   browserTextColor = $('.part-text-browser').css('color');
			   browserTextSize = $('.part-text-browser').css('font-size');
			   phTextColor = $('.part-text-normal').css('color');
			   textSize = $('.part-text-normal').css('font-size');
			break;					
			case 'Navigation':
			   navTextColor = $('.part-navigation-elem').css('color');
			   navTextSize = $('.part-navigation-elem').css('font-size');
			   navBgColor = $('.part-bg-color-navigation').css('background-color');
			break;
			case 'Headline_and_Subheadline':
			   bgColor = $('.hdln_subhdln').css('background-color');
			   fontColor = $('.am-hdln-01').css('color');
			break;						
			case 'Editorial_and_TOC':
				anredeFontSize = $('.part-text-anrede-toc').css('font-size');
				anredeFontColor = $('.part-text-anrede-toc').css('color');
				hdlnFontSize = $('.part-hdln-text-toc').css('font-size');
				hdlnFontColor = $('.part-hdln-text-toc').css('color');
				tocBgColor = $('.TOC_Background_Color').css('background-color');
				tocFontSize = $('.TOC_Text_Font_Size').css('font-size');
				tocFontColor = $('.TOC_Text_Font_Color').css('color');
			break;
			case 'Editorial_and_Ad':
				anredeFontSize = $('.part-text-anrede-ad').css('font-size');
				anredeFontColor = $('.part-text-anrede-ad').css('color');
				hdlnFontSize = $('.part-hdln-text-ad').css('font-size');
				hdlnFontColor = $('.part-hdln-text-ad').css('color');
				textFontSize = $('.Ad_Text_Font_Size').css('font-size');
				textOddColor = $('.Ad_Text_uneven_Color').css('color');
				textEvenColor = $('.Ad_Text_even_Color').css('color');
				btnOddColor = $('.Ad_Background_uneven_Color').css('background-color');
				btnEvenColor = $('.Ad_Background_even_Color').css('background-color');
			break;
			case '3_img_headline_right':
				partBgColor = $('.part-bg-color-THREE-img-hdln-RIGHT').css('background-color');
				hdlnFontColor = $('.part-headline-color-THREE-img-hdln-RIGHT').css('color');
			break;
			case '3_img_headline_left':
				partBgColor = $('.part-bg-color-THREE-img-hdln-LEFT').css('background-color');
				hdlnFontColor = $('.part-headline-color-THREE-img-hdln-LEFT').css('color');
			break;
			case '3_img_headline_top':
				partBgColor = $('.part-bg-color-THREE-img-hdln-TOP').css('background-color');
				hdlnFontColor = $('.part-headline-color-THREE-img-hdln-TOP').css('color');
			break;
			case '2_img_headline':
				partBgColor = $('.part-bg-color-TWO-images-hdln').css('background-color');
				hdlnFontColor = $('.part-headline-color-TWO-images-hdln').css('color');
			break;
			case '1_img_box_right_headline':
				partBgColor = $('.part-bg-color-ONE-image-box-RIGHT-hdln').css('background-color');
				subhdlnFontColor = $('.am-hdln-02').css('color');
				textFontColor = $('.am-txt-main-1-img-right-hdln').css('color');
				btnBgColor = $('.am-btn-1-img-right-hdln').css('background-color');
				btnTextColor = $('.am-btn-txt-1-img-right-hdln').css('color');
			break;
			case '1_img_box_left_headline':
				partBgColor = $('.part-bg-color-ONE-image-box-LEFT-hdln').css('background-color');
				subhdlnFontColor = $('.am-hdln-02').css('color');
				textFontColor = $('.am-txt-main-1-img-left-hdln').css('color');
				btnBgColor = $('.am-btn-1-img-left-hdln').css('background-color');
				btnTextColor = $('.am-btn-txt-1-img-left-hdln').css('color');
			break;
			case 'Footer':
				partBgColor = $('.part-bg-color-footer').css('background-color');
				footerTextColor = $('.part-text-footer').css('color');
				footerTextSize = $('.part-text-footer').css('font-size');
			break;
			case 'Footnote':
				partBgColor = $('.part-bg-color-footnote').css('background-color');
				footnoteTextColor = $('.part-text-footnote').css('color');
				footnoteTextSize = $('.part-text-footnote').css('font-size');
			break;
			case 'Copyright':
				copyTextColor = $('.part-text-copyright').css('color');
				copyTextSize = $('.part-text-copyright').css('font-size');
			break;
		}			
	};
	
	function setDefaults(tb){
		var tb = tb;
		switch (tb.attr('title')){
			case 'Preheader_and_Header':
			   $('input[name=Snippet_Text_Font_Color]').val(hexc(snippetTextColor));	
			   $('select[name=Snippet_Text_Font_Size]').val(snippetTextSize);
			   $('input[name=Browser_Text_Font_Color]').val(hexc(browserTextColor));
			   $('select[name=Browser_Text_Font_Size]').val(browserTextSize);
			   $('input[name=Text_Font_Color]').val(hexc(phTextColor));
			   $('select[name=Text_Font_Size]').val(textSize);
			break;
			case 'Navigation':
			   $('input[name=Navi_Text_Font_Color]').val(hexc(navTextColor));								   
			   $('select[name=Navi_Text_Font_Size]').val(navTextSize);
			   $('input[name=Navi_Background_Color]').val(hexc(navBgColor));
			break;
			case 'Headline_and_Subheadline':						   
			   $('input[name=Background_Color]').val(hexc(bgColor));
			   $('input[name=Head_Subheadline_Font_Color]').val(hexc(fontColor));	
			break;
			case 'Editorial_and_TOC':						   
			   $('select[name=Salutation_Text_Font_Size]').val(anredeFontSize);
			   $('input[name=Salutation_Text_Font_Color]').val(hexc(anredeFontColor));
			   $('select[name=TOC_Headline_Font_Size]').val(hdlnFontSize);
			   $('input[name=TOC_Headline_Font_Color]').val(hexc(hdlnFontColor));
			   $('select[name=TOC_Text_Font_Size]').val(tocFontSize);
			   $('input[name=TOC_Text_Font_Color]').val(hexc(tocFontColor));
			   $('input[name=TOC_Background_Color]').val(hexc(tocBgColor));
			break;
			case 'Editorial_and_Ad':						   
				$('select[name=Salutation_Text_Font_Size]').val(anredeFontSize);
				$('input[name=Salutation_Text_Font_Color]').val(hexc(anredeFontColor));
				$('select[name=Ad_Headline_Font_Size]').val(hdlnFontSize);
				$('input[name=Ad_Headline_Font_Color]').val(hexc(hdlnFontColor));
				$('select[name=Ad_Text_Font_Size]').val(textFontSize);
				$('input[name=Ad_Text_Font_Color_odd]').val(hexc(textOddColor));
				$('input[name=Ad_Background_Color_odd]').val(hexc(btnOddColor));
				$('input[name=Ad_Text_Font_Color_even]').val(hexc(textEvenColor));
				$('input[name=Ad_Background_Color_even]').val(hexc(btnEvenColor));
			break;
			case '3_img_headline_right':	
				$('input[name=Background_Color]').val(hexc(partBgColor));
				$('input[name=Head_Subheadline_Font_Color]').val(hexc(hdlnFontColor));	
			break;
			case '3_img_headline_left':	
				$('input[name=Background_Color]').val(hexc(partBgColor));
				$('input[name=Head_Subheadline_Font_Color]').val(hexc(hdlnFontColor));
			break;
			case '3_img_headline_top':	
				$('input[name=Background_Color]').val(hexc(partBgColor));
				$('input[name=Head_Subheadline_Font_Color]').val(hexc(hdlnFontColor));
			break;
			case '2_img_headline':									
				$('input[name=Background_Color]').val(hexc(partBgColor));
				$('input[name=Head_Subheadline_Font_Color]').val(hexc(hdlnFontColor));				
			break;
			case '1_img_box_right_headline':	
				$('input[name=Background_Color]').val(hexc(partBgColor));
				$('input[name=Head_Subheadline_2_Font_Color]').val(hexc(subhdlnFontColor));
				$('input[name=Text_Font_Color_Left]').val(hexc(textFontColor));
				$('input[name=Button_Background_Color_Left]').val(hexc(btnBgColor));
				$('input[name=Button_Text_Font_Color_Left]').val(hexc(btnTextColor));
			break;
			case '1_img_box_left_headline':									
				$('input[name=Background_Color]').val(hexc(partBgColor));
				$('input[name=Head_Subheadline_2_Font_Color]').val(hexc(subhdlnFontColor));
				$('input[name=Text_Font_Color_Right]').val(hexc(textFontColor));
				$('input[name=Button_Background_Color_Right]').val(hexc(btnBgColor));
				$('input[name=Button_Text_Font_Color_Right]').val(hexc(btnTextColor));
			break;
			case 'Footer':
				$('input[name=Background_Color]').val(hexc(partBgColor));
				$('input[name=Footer_Text_Font_Color]').val(hexc(footerTextColor));								   
			   $('select[name=Footer_Text_Font_Size]').val(footerTextSize);
			break;
			case 'Footnote':									
				$('input[name=Background_Color]').val(hexc(partBgColor));
				$('input[name=Footnote_Text_Font_Color]').val(hexc(footnoteTextColor));								   
			   $('select[name=Footnote_Text_Font_Size]').val(footnoteTextSize);
			break;
			case 'Copyright':									
				$('input[name=Copyright_Text_Font_Size]').val(hexc(copyTextColor));								   
			   $('select[name=Copyright_Text_Font_Color]').val(copyTextSize);
			break;
		}		
	};
    
    
    $('table').each(function() {
        if ($(this).attr('title')) {
            $elTbl = $(this);
            $('.control-parts').append(
                    '<table border="0" cellpadding="0" cellspacing="0" width="240">'
                        + '<tr><td width="20"></td>'
                        + '<td width="195" height="32" style="width:195px; height:32px; font-size:11px; color:#000; font-weight:bold;">'
                        +  $elTbl.attr('title')
                        + '</td></tr>'
                        + '<tr>'
                            + '<td width="20"></td>'
                            + '<td width="25"><input type="checkbox" name="' 
                            + $elTbl.attr('title') 
                            + '" value="add" class="' 
                            + $elTbl.attr('title') 
                            + '" data-add="add_' 
                            + $elTbl.attr('title') 
                            + '" style="display:none; float:left; margin:0; cursor:pointer;">'
                            + '<label style="display:block; cursor:pointer; width:250px; background-repeat:no-repeat;"></label></td>'
                        + '</tr>'
                    + '</table>'
                    );
            $elTbl.before(
                    '<table border="0" cellpadding="0" width="300" cellspacing="0" align="center" bgcolor="#ffffff" class="w100 add_'
                    + $elTbl.attr('title') + '"><tr><td>'
                    + '</td></table>'
                    );

            $elTbl.click(function(event){
                event.preventDefault();
                if( jsonData.template === undefined ){
                   //alert('EMPTY'); 
                   $('#catch-error').popup('show');
                   return false;
                }else{
					var renderFormPart;
                    var tb = $(this);
                    var url = $root + $temp + '/' + $(this).attr('title') + '.jsp?locale=de&part=' + tb.attr('title');
                    var $partFormWrapper = $('.block-details');
                    getDefaults(tb);
                    var renderPart = $.get(url, function(data) {
                        $partFormWrapper.next('div').html( data ).css({'margin': '70px 0 20px 60px'});    
                    });
					
                    $.when(renderPart).then(function(){						
						renderFormPart = $partFormWrapper.load('inc/configPart.jsp?locale=de&part=' + tb.attr('title'), function(data){
						$('.part-settings-inner-form').find('input[type=text]').each( function(){
						var theEl = $(this);
						setDefaults(tb);
						
						$(this).minicolors({
								control: 'hue',
								defaultValue: theEl.val(),
								opacity: false,
								position: $(this).attr('data-position') || 'top right',
								change: function(hex, opacity) {
									if( !hex ) return;
									if( opacity ) hex += ', ' + opacity;
									if( typeof console === 'object' ) {
										console.log(hex);
									}
								}
							});
						});
					});
					});
				}
            });

            if($elTbl.attr('data-part-active') === 'no'){
                $elTbl.remove();
            }

                
            if($elTbl.attr('data-part-active') === 'no'){
                    $part = $(this);
                    $.each( $('.control-parts').find( 'input[type=checkbox]' ), function(){
                        $chLeft = $(this);
                        if( $chLeft.attr('name') === $part.attr('title') ){
                            //$chLeft.data('info', 'inactive');
                            $chLeft.prop("checked", false);
                        }
                    }); 
			}else{
				$ableCheck = $(this);
				$.each( $('.control-parts').find( 'input[type=checkbox]' ), function(){
					if( $(this).attr('name') === $ableCheck.attr('title') ){
						//$chLeft.data('info', 'active');
						$(this).prop("checked", true);
					}
				}); 
			}
            effect($elTbl);
        }
    });
	
	$('#btn_load_gl_settings').on('click', function(){
        $('#catch-error').popup('hide');
        $('#globalSettings').popup('show');
    });
	
	$('.catch-error-close').on('click', function(){
        $('#catch-error').popup('hide');
    });
    
    $('input[type=checkbox]').next('label').each(function() {
        var $checkBox = $(this);
        if( $checkBox.prev().is(':checked') ){
            $checkBox.css({
                'background-image': 'url("img/all/' + $checkBox.prev().attr('name') + '_Checked.jpg?locale=de")', 
                'width':'250px'
            });
            
            imgUrl = $checkBox.css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
            $("<img/>").attr("src", imgUrl).load(function(){
                $checkBox.css({
                    'width':this.width, 'height': this.height, 
                    'border':'5px solid #ef8a1e'
                });
            });
            
            $checkBox.hover(
                function() {
                    $checkBox.css({'cursor':'url(img/hover_deactivate_part.png?locale=de), pointer'});
                },
                function() {}
            );
        }else{
            $checkBox.css({
                'background-image': 'url("img/all/' + $checkBox.prev().attr('name') + '.jpg?locale=de")', 
                'width':'250px'
            });
            imgUrl = $checkBox.css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
            $("<img/>").attr("src", imgUrl).load(function(){
                $checkBox.css({
                    'width':this.width, 
                    'height': this.height, 'border': '0'
                });
            });
            //$checkBox.css('background-image', 'url("img/' + $('.h2-temp').attr('data-template') + '/' + $checkBox.prev().attr('name') + '.jpg?locale=de")');
            $checkBox.hover(
                function() {
                    $checkBox.css({'cursor':'url(img/hover_activate_part.png?locale=de), pointer'});
                },
                function() {}
            );
        }
    
        $checkBox.hover(
            function() {
                if ($('.result').find($('table#angled')).length) {} 
                else if ($('.result').find($('table#onBoarding')).length) {}
            },
            function() {}
        ); 
        
        $checkBox.click(function(e) {
			e.preventDefault();
			if(!$checkBox.prev().is(":checked")){ 
                $checkBox.prev().prop('checked', true);
             
                $checkBox.css({
                    'background-image': 'url("img/all/' + $checkBox.prev().attr('name') + '_Checked.jpg?locale=de")', 
                    'width': '250px'
                });
                imgUrl = $checkBox.css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
                
                $("<img/>").attr("src", imgUrl).load(function(){
                    $checkBox.css({
                        'width':this.width, 'height': this.height, 
                        'cursor':'url(img/hover_deactivate_part.png?locale=de), pointer', 
                        'border':'5px solid #ef8a1e'
                    });
                });
                
                $checkBox.hover(
                    function() {
                        $checkBox.css({'cursor':'url(img/hover_deactivate_part.png?locale=de), pointer'});
                    },
                    function() {}
                );
                
			//	alert ($checkBox.prev().attr('name')+'!!');
				
                if($('td.' + $checkBox.prev().attr('name') + '_Added').length <= 0){
                    $('#overLayTab tr:first').before('<tr><td class="tblLabOverLay">' 
                            + $checkBox.prev().attr('name') 
                            + ' : </td><td class="' 
                            + $checkBox.prev().attr('name') 
                            + '_Added" style="font-size:16px; color:#fff;">Ja</td></tr><tr class="hdlnGap"><td colspan="2" height="6"></td></tr>');

					$("#globalForm input[name="+$(this).prev().attr('name')+"]").val('true');
					var ap_checked = parseInt($('input[name=active_paragraphen]').val());
					$('input[name=active_paragraphen]').val(ap_checked+1);
                } else{
                    $('td.' + $checkBox.prev().attr('name') + '_Added').html('Ja');
                }
                $('td#' + $(this).prev().attr('name')).css('display', 'block');                
				
                getHTMLLoaded( 'htmlCode/' + $('.h2-temp').attr('data-template') + '/' + $checkBox.prev().attr('name') + '.jsp?locale=de', $( 'table.' + $checkBox.prev().attr('data-add')));
                
                if( jsonData.template !== undefined ){
					$.each(window.jsonData.template.style, function( k, v) {
						console.log('item: ' + k + ' ... ' + v);
					});
					var el;
					var partName= $(this).prev().attr('name');
					
					$.each(window.jsonData.template.paragraphs, function(k, v) {
						if( v.name === partName ){
							v.active = 'true';
							el = true;
							return false;
						}
						if( v.name !== partName ){
							el = false;
						}
					});
				}
			
            }else{
                $checkBox.prev().prop('checked', false);
                $('td.' + $checkBox.prev().attr('name') + '_Added').html('Nein');
                $('table[title="' + $checkBox.prev().attr('name') + '"]').remove();
                $checkBox.css({
                    'background-image': 'url("img/all/' + $checkBox.prev().attr('name') + '.jpg?locale=de")', 
                    'cursor':'url(img/hover_activate_part.png?locale=de), pointer', 
                    'border':'0'
                });
                imgUrl = $checkBox.css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
               
			   $("#globalForm input[name="+$(this).prev().attr('name')+"]").val('false');
				var ap_unchecked = parseInt($('input[name=active_paragraphen]').val());
				$('input[name=active_paragraphen]').val(ap_unchecked-1);
                $checkBox.hover(
                    function() {
                        $checkBox.css({'cursor':'url(img/hover_activate_part.png?locale=de), pointer'});
                    },
                    function() {}
                );
                var partName= $(this).prev().attr('name');
                
                if( jsonData.template !== undefined ){
					$.each(window.jsonData.template.paragraphs, function(k, v) {
						if( v.name === partName ){
							v.active = 'false';
							v.style = {};
							
						}
					});
				}
            }
        });

    });

	
    function effect(el){
        var $el = el;
        $.each( $el, function(){
            $(this).hover(function(){
                if( $(this).attr('data-edit') === 'yes' ){
                    $(this).attr('width', $(this).outerWidth() + 10);
                    $(this).css({'width': $(this).outerWidth() + 10, 'max-width': $(this).outerWidth() + 10 });
                    $(this).css({'border':'5px solid #ef8a1e', 'cursor':'url(img/hover_edit.png?locale=de), pointer' });
                }else{
                    $(this).attr('width', $(this).outerWidth());
                    $(this).css({'width': $(this).outerWidth(), 'max-width': $(this).outerWidth() });
                    $(this).css({'border':'0'});
                }
              
            }, function() {
                if( $(this).attr('data-edit') === 'yes' ){
                    $(this).attr('width', $(this).outerWidth() - 10);
                    $(this).css({'width': $(this).outerWidth() - 10, 'max-width': $(this).outerWidth() - 10 });
                    $(this).css({'border':'0'});
                }else{
                    $(this).attr('width', $(this).outerWidth());
                    $(this).css({'width': $(this).outerWidth(), 'max-width': $(this).outerWidth() });
                    $(this).css({'border':'0'});
                }  
            });
        });
    };
        
    function getHTMLLoaded(url, el) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'html',
            success: function(data){
                el.after(data);
                getHTML( $('.block-details') );
            }
        });
    };
    
    function getHTML(el) {
        var url;
        var $el = el;
        var $temWraper = $('.result').find( 'table[title]' );
        effect($temWraper);
        $temWraper.each(function(){
            var $this = $(this);
            $this.click(function(){
                var renderFormPart;
				var tb = $(this);
				console.log(tb);
                var $partFormWrapper = $('.block-details');
                url = $root + $temp + '/' + $this.attr('title') + '.jsp?locale=de';
                getDefaults(tb);
				
                var renderPart = $.get(url, function(data) {
                    $el.next('div').html( data ).css({'margin': '70px 0 20px 60px'});    
                });
                $.when(renderPart).then(function(){
                    $partFormWrapper.load('inc/configPart.jsp?locale=de&part=' + tb.attr('title'), function(data){
						$('.part-settings-inner-form').find('input[type=text]').each( function(){
						var theEl = $(this);
						setDefaults(tb);
						
						$(this).minicolors({
								control: 'hue',
								defaultValue: theEl.val(),
								opacity: false,
								position: $(this).attr('data-position') || 'top right',
								change: function(hex, opacity) {
									if( !hex ) return;
									if( opacity ) hex += ', ' + opacity;
									if( typeof console === 'object' ) {
										console.log(hex);
									}
								}
							});
						});
						
					});
                });

            });
        });
		
    };
    
    $('.btn-reset-part').click(function(){
		
        var $currentTable = $('.content-block').find( 'table[title]' ).attr('title');
        var $whereToAdd = $('.result').find( 'table.add_' + $currentTable );
        var $currentPath = $root + $temp + '/' + $currentTable + '.jsp?locale=de';
        $('.content-block').load( $currentPath );
        $('.result').find( 'table[title=' + $currentTable + ']' ).remove();
        getHTMLLoaded( $currentPath , $whereToAdd );
		getDefaults($currentTable);
		setDefaults($currentTable);
        $.each(window.jsonData.template.paragraphs, function(k, v) {
            if( v.name === $currentTable ){
                v.style = {};
            }
        });
		
        $('.close')[0].click();
    });
	
}) (jQuery);

