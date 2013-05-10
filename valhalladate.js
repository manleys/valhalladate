;(function($){
	$.fn.valhalladate = function(options){
				
		var options = $.extend({
			'requiredErrorClass' : 'invalid',
			'emailErrorClass' : 'invalid',
			'passwordErrorClass' : 'invalid',
			'passwordConfirmErrorClass' : 'invalid',
			'requiredValidClass' : 'valid',
			'emailValidClass' : 'valid',
			'passwordValidClass' : 'valid',
			'passwordConfirmValidClass' : 'valid',
			'errorRequiredText': 'This is a required field',
			'errorEmailText': 'This must be a valid email address',
			'passwordErrorText': 'Minimum 8 characters. Must include at least one upper and lower case letter and a number',
			'passwordConfirmErrorText': 'Password Confirm doesn\'t match Password',
			'ajaxRequest': false,
			'ajaxRequestHandler': function(){ alert("You must provide a function to handle the ajax request"); }
		}, options);
				
function checkRequired(el){
	if($(el).val().length < 1){
		$(el).addClass(options.requiredErrorClass);
		$(el).parent().children('.validation').addClass(options.requiredErrorClass);
		$(el).parent().children('.validation').text(options.errorRequiredText);
		return false;
	}else{
		$(el).removeClass(options.requiredErrorClass);
		$(el).parent().children('.validation').removeClass(options.requiredErrorClass);
		$(el).parent().children('.validation').text('');
		$(el).parent().children('.validation').addClass(options.requiredValidClass);
		return true;
	};
}

function checkEmail(el){
	$(el).unbind('keyup');
	
	var emailExp = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
	if(!emailExp.test($(el).val())){//First test of email address onblur of input field
		$(el).addClass('invalid');
		$(el).parent().children('.validation').addClass(options.emailErrorClass);
		$(el).parent().children('.validation').text(options.errorEmailText);
		
		$(el).keyup(function(event){//Add event handler to the input field to check on change of input
			if(emailExp.test($(el).val())){
				$(el).removeClass(options.emailErrorClass);
				$(el).parent().children('.validation').removeClass(options.emailErrorClass);//.attr('class', 'validation valid');
				$(el).parent().children('.validation').text('');
				$(el).parent().children('.validation').addClass(options.emailValidClass);
			};
		});
		
		return false;
	}else{
		return true;
	};
}

function checkPassword(el){
	
	var passwordExp = new RegExp(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
	if(passwordExp.test($(el).val())){
		$(el).addClass('valid');
		$(el).parent().children('.validation').addClass(options.passwordConfirmValidClass);
		$(el).parent().children('.validation').text('');
	}else{
		$(el).addClass('invalid');
		$(el).parent().children('.validation').addClass(options.passwordErrorClass);
		$(el).parent().children('.validation').text(options.passwordErrorText);
	}
}


function checkPasswordConfirm(el){
	$(el).unbind('keyup');
	
	if($(el).val() === $(el).parents('form').find('input.password').val() && $(el).parents('form').find('input.password').val().length > 0){
		$(el).addClass('valid');
		$(el).parent().children('.validation').addClass(options.passwordConfirmValidClass);
		$(el).parent().children('.validation').text('');
		return true;
	}else{
		$(el).addClass('invalid');
		$(el).parent().children('.validation').addClass(options.passwordConfirmErrorClass);
		$(el).parent().children('.validation').text(options.passwordConfirmErrorText);
		return false;
	};
}

function checkTextarea(el){
	if($(el).val().length > 0){
		$(el).removeClass('invalid');
		$(el).addClass('valid');
		$(el).removeClass(options.requiredErrorClass);
		$(el).parent().children('.validation').text('');
		$(el).parent().children('.validation').addClass('valid');
		allTextarea = true;
	}else{
		$(el).removeClass('valid');
		$(el).addClass('invalid');
		$(el).parent().children('.validation').addClass('invalid');
		$(el).parent().children('.validation').text(options.errorRequiredText);
		allTextarea = false;
		return false;
	};
};


/*

function checkEditor(el){
	//console.log($('#' + el));
	if(CKEDITOR.instances[el].getData().length > 0){
		$('#' + el).parent().children('span').css('border', '2px solid #D3D3D3');
		return true;
	}else{
		$('#' + el).parent().children('span').css('border', '2px solid #C73E14');
		$('#' + el).parent().children('span').css('border-bottom', '10px solid #C73E14');
		return false;
	};
};

*/


function checkSubmit(el){
	
	var allRequired = false;
	var allEmail = false;
	var passwordConfirm = false;
	var allTextarea = false;
	
	if($(el).find('input.required').length > 0){
		$(el).find('input.required').each(function(){
			if(checkRequired($(this))){
				allRequired = true;
			}else{
				allRequired = false;
				//return false;
			};			
		});
	}else{
		allRequired = true;
	};
	
	if($(el).find('textarea.required').length > 0){
		$(el).find('textarea.required').each(function(){
			if($(this).css('display') == 'none'){
				var currentInstance = $(this).parent().children('textarea').attr('id');
				if(CKEDITOR.instances[currentInstance].getData().length > 0){
					$(this).parent().children('span').css('border', '2px solid #D3D3D3');
					allTextarea = true;
				}else{
					$(this).parent().children('span').css('border', '2px solid #C73E14');
					$(this).parent().children('span').css('border-bottom', '10px solid #C73E14');
					allTextarea = false;
					return false;
				};
			}else{
				if($(this).val().length > 0){
					allTextarea = true;
				}else{
					allTextarea = false;
					return false;
				};
			};
		});
	}else{
		allTextarea = true;
	};
			
	if($(el).find('input.email').length > 0){
		$(el).find('input.email').each(function(){
			if(checkEmail($(this))){
				allEmail = true;
			}else{
				allEmail = false;
				return false;
			};
		});
	}else{
		allEmail = true;
	};
	
	if($(el).find('input.passwordConfirm').length > 0){
		$(el).find('input.passwordConfirm').each(function(){
			if(checkPasswordConfirm($(this))){
				passwordConfirm = true;
			}else{
				passwordConfirm = false;
				return false;
			};
		});
	}else{
		passwordConfirm = true;
	};
	
	if(allRequired && allEmail && passwordConfirm && allTextarea){
			
		if(options.ajaxRequest == true){
			options.ajaxRequestHandler();
			return false;
		}else{
			return true;
		}

	}else{
		return false;
	};
	
	return false;
	
};



//################################################
//
//	Assigning function to Elements via CSS Selectors
//
//################################################

$(this).find('input.required').blur(function(){
	return checkRequired($(this));
});

$(this).find('input.email').blur(function(){
	return checkEmail($(this));
});

$(this).find('input.passwordConfirm').blur(function(){
	return checkPasswordConfirm($(this));
});

$(this).find('input.password').blur(function(){
	return checkPassword($(this));
});

$(this).submit(function(){
	return checkSubmit($(this));
});

this.find('textarea.required').each(function(){
	////console.log($(this).css('visibility'));
	if($(this).css('visibility') == 'hidden'){
		var currentInstance = $(this).parent().children('textarea').attr('id');
		var editor = CKEDITOR.instances[currentInstance];
		editor.on('blur', function(){
			checkEditor(currentInstance);
		});
	}else{
		$(this).blur(function(){
			return checkTextarea($(this));
		});
	};
});

};
})(jQuery);