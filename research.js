/***
 * Signin Box JavaScript code
 * Separated from phub.js due to caching issues.
 */
var signinbox = {
	hideTimeout: 0,
	logCount: 0,
	doingLogin: false,
	inputFocused: false,
	containerWidth: 889,
	log:function(msg){
		/*if(console){
			signinbox.logCount++;
			console.log(signinbox.logCount+': '+msg);
		}*/
	},
	show: function() {
		if (navigator.userAgent) {
			if (navigator.userAgent.match(/PLAYSTATION/) ) {
				document.location.assign("http://"+location.hostname+"/login");
				return false;
			}
		}
		if( $j('div#signinContainer').css('display') != 'block' && $j('a#headerLoginLink')[0] )
		{
			$j('div#signinContainer').css( {
				'top': (32+$j(document).scrollTop()<170?170:(32+$j(document).scrollTop()))+'px',
				'left': ( ($j(document).width()-this.containerWidth)/2) +'px'
			});
			if( $j.support.opacity )
				$j('div#signinContainer').fadeIn(400);
			else
				$j('div#signinContainer').show();
			this.hideTimeout = 600;
			setTimeout('signinbox.hideTimeout=0;',this.hideTimeout);
			$j('input#signinUsername').focus();
		}
	},
	hide: function() {
		if( this.hideTimeout )
			return false;
		if( $j('div#signinContainer').css('display') != 'none' )
		{
			if( $j.support.opacity )
				$j('div#signinContainer').fadeOut(500);
			else
				$j('div#signinContainer').hide();

			$j('div#signinBackground a').css('font-size','1em');
			$j('.signinError').hide();
			$j('input#signinUsername').val('');
			$j('input#signinPassword').val('');
			$j('input#signinRedirectTo').val('');
		}
	},
	doLogin: function(){
		if($j('input#signinPassword').val().length > 0 && $j('input#signinUsername').val().length > 0){
			//$j('div#signinSubmit').click();
			signinbox.log('ENTER PRESSED IN DOLOGIN WITH PASSWD ');
			signinbox.submit();
		} else if($j('input#signinPassword').val().length < 1 ){
			signinbox.log('ENTER PRESSED IN DOLOGIN WITHout PASSWD ');
			$j('input#signinPassword').focus();
		}

	},
	submit: function() {
		signinbox.log('LOGIN FUNC CALLED');
		if(signinbox.doingLogin){
			signinbox.log('Not running since another instance is on it');
			return false;
		}
		signinbox.doingLogin = true;
		$j('div#signinSubmit,.signinError').hide();
		$j('p#signinLoggingin').show();
		$j.post($j('input#signin_url').val(), {
			username: $j('input#signinUsername').val(),
			password: $j('input#signinPassword').val(),
			login_key: $j('input#login_key').val(),
			login_hash: $j('input#login_hash').val(),
			remember_me: $j('input#signinRemember').attr('checked'),
			redirectTo: $j('input#signin_redirectTo').val()
		}, signinbox.handleLogin );
	},
	handleLogin: function(data,status) {
		signinbox.log('request done. data:'+data+' // status:'+status);
		if (data.indexOf('http://') != -1 && data.length < 300) {
			signinbox.log('SUCCESS1');
			signinbox.log('Redirecting to '+data+' because of success');
			signinbox.redirectTo(data);
		} else {
			if (data.indexOf('/') == 0 && data.length < 300) {
				signinbox.log('SUCCESS2');
				signinbox.log('REDIRECTING TO '+data);
				signinbox.redirectTo(data);
			} else {
				$j('p#signinLoggingin').hide();
				signinbox.log('FAILED CON DATA'+data);
				signinbox.show();
				var x = parseInt($j('div#signinContainer').css('left'));
				var y = parseInt($j('div#signinContainer').css('top'));
				for(var i=1;i<10;i++)
					setTimeout(function() {
						$j('div#signinContainer').css('left',x-5+(Math.random()*11));
						$j('div#signinContainer').css('top',y-4+(Math.random()*9));
					},20*i);
				setTimeout(function() {
					$j('div#signinContainer').css('left',x);
					$j('div#signinContainer').css('top',y);
				},210);
				if (data == 2) {
					$j('p.signinError').text(emailNotConfirmed);
					$j('.signinError').show();
					$j('div#signinSubmit').show();
					$j('p#signin_loggingin').hide();
					$j('a#signin_forgotpassword').css('font-size','1em');
					$j('a#signin_confirmationemail').css('font-size','1.25em');
				} else {
					if (data==3){
						$j('p.signinError').text(error513);
					}else if(data==4){
						$j('p.signinError').text(error514);
					}else if(data==5){
						$j('p.signinError').text(error515);
                    }else if(data==10){
                        $j('p.signinError').text(accountDisabled);
                    }else{
						$j('p.signinError').text(loginError);
						$j("#signin_username").css({"border":"2px solid red"});
						$j("#signin_password").css({"border":"2px solid red"});
					}
					$j('.signinError').show();
					$j('div#signinSubmit').show();
					$j('p#signin_loggingin').hide();
					$j('a#signin_forgotpassword').css('font-size','1.25em');
					$j('a#signin_confirmationemail').css('font-size','1em');
				}
			}
			signinbox.doingLogin = false;
		}
	},
	redirectTo:function(url){
		signinbox.log('Redirecting to '+url);
		document.location.assign(url);
	}
}

// We need to handle this so the dimmed background works good.
function recalcSigninBox(e) {
	if( $j('div#signinContainer')[0] )
	{
		if( $j('div#signinContainer').css('display') != 'none' )
			$j('div#signinContainer').css( {
				'top': (32+$j(document).scrollTop()<170?170:(32+$j(document).scrollTop()))+'px',
				'left': ( ($j(document).width()-signinbox.containerWidth)/2) +'px'
			});
	}
}

$j(document).ready( function(e) {
	if( $j('div#signinContainer')[0]){
		$j(window).resize(recalcSigninBox);
		$j(window).scroll(recalcSigninBox);
		$j("input").focus(function() {
			signinbox.inputFocused = true;
		});
		$j("input").blur(function() {
			signinbox.inputFocused = false;
		});

		$j(document).click(function(e) {
			if( $j('div#signinContainer').css('display') != 'none' )
			{
				var pos = $j('div#signinContainer').offset();
				if( ( e.pageX < pos.left || e.pageX > pos.left+signinbox.containerWidth ||
					e.pageY < pos.top  || e.pageY > pos.top +$j('div#signinContainer').height() ) && !signinbox.inputFocused )
						signinbox.hide();
			}
		});
		$j(document).keypress(function(e) {
			if( e.keyCode == 27)
				signinbox.hide();
		});

		$j('div#signinSubmit').click(function(){ signinbox.doLogin(); return false;});

		$j('div#signupButtonId, div#signup_button_id').click(function(){signinbox.redirectTo($j('input#signup_url').val())});

		$j('input#signinUsername').keypress(function(e) {
			if( e.which == 13){
				signinbox.doLogin();
				return false;
			}
		});

		$j('input#signinPassword').keypress(function(e) {
			if( e.which == 13 ){
				signinbox.doLogin();
				return false;
			}
		});
		$j('div#signinClose').click(signinbox.hide);
		if( $j.support.opacity ){
			$j('div#signinContainer').draggable({
				cursor: 'move',
				handle: 'div.loginHeader',
				opacity: 0.85
			});
		}else{
			$j('div#signinContainer').draggable({
				cursor: 'move',
				handle: 'div.loginHeader'
				});
		}
		if( document.location.search.match(/showSigninBox=true/i) && $j('a#headerLoginLink')[0] ){
			signinbox.show();
		}
	}
});