const $=id=>document.getElementById(id);
const toast=$('toast');let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
$('year').textContent=new Date().getFullYear();
function chooseMethod(method){const email=method==='email';$('emailForm').hidden=!email;$('phoneForm').hidden=email;$('emailTab').classList.toggle('active',email);$('phoneTab').classList.toggle('active',!email);$('emailTab').setAttribute('aria-selected',String(email));$('phoneTab').setAttribute('aria-selected',String(!email));clearErrors();if(!email)$('phone').focus();else $('email').focus()}
$('emailTab').addEventListener('click',()=>chooseMethod('email'));$('phoneTab').addEventListener('click',()=>chooseMethod('phone'));
function clearErrors(){['emailError','passwordError','phoneError','otpError'].forEach(id=>$(id).textContent='')}
function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)}
function validIndianMobile(value){return /^[6-9]\d{9}$/.test(value)}
$('email').addEventListener('input',()=>{$('emailError').textContent='';$('email').setAttribute('aria-invalid','false')});
$('password').addEventListener('input',()=>{$('passwordError').textContent='';$('password').setAttribute('aria-invalid','false')});
$('emailForm').addEventListener('submit',event=>{event.preventDefault();clearErrors();const email=$('email').value.trim(),password=$('password').value;let valid=true;if(!validEmail(email)){$('emailError').textContent='Enter a valid email address.';$('email').setAttribute('aria-invalid','true');valid=false}if(password.length<8){$('passwordError').textContent='Password must be at least 8 characters.';$('password').setAttribute('aria-invalid','true');valid=false}if(!valid)return;
notify('Input looks valid. Connect your authentication backend to verify the account.');});
$('togglePassword').addEventListener('click',()=>{const input=$('password'),show=input.type==='password';input.type=show?'text':'password';$('togglePassword').textContent=show?'Hide':'Show';$('togglePassword').setAttribute('aria-label',show?'Hide password':'Show password')});
$('forgotPassword').addEventListener('click',()=>notify('Password reset needs a backend email service. Add your registered email and use the Forgot Password flow.'));
$('phone').addEventListener('input',()=>{ $('phone').value=$('phone').value.replace(/\D/g,'').slice(0,10);$('phoneError').textContent='';$('phone').setAttribute('aria-invalid','false')});
$('otp').addEventListener('input',()=>{$('otp').value=$('otp').value.replace(/\D/g,'').slice(0,6);$('otpError').textContent=''});
$('phoneForm').addEventListener('submit',event=>{event.preventDefault();clearErrors();const phone=$('phone').value.trim();if(!validIndianMobile(phone)){$('phoneError').textContent='Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.';$('phone').setAttribute('aria-invalid','true');return}
if($('otpSection').hidden){$('otpSection').hidden=false;$('phone').readOnly=true;$('phoneSubmit').innerHTML='Verify and log in <span>→</span>';$('changeNumber').hidden=false;$('otp').focus();notify(`Phone number format is valid (+91 ${phone}). To send a real OTP, connect an SMS authentication provider.`);return}
const otp=$('otp').value.trim();if(!/^\d{6}$/.test(otp)){$('otpError').textContent='Enter the 6-digit verification code.';return}
notify('OTP format looks valid, but no code was sent or verified. Connect an SMS OTP provider before enabling login.');});
$('changeNumber').addEventListener('click',()=>{$('phone').readOnly=false;$('otpSection').hidden=true;$('otp').value='';$('phoneSubmit').innerHTML='Send verification code <span>→</span>';$('changeNumber').hidden=true;$('phone').focus();clearErrors()});
$('createAccount').addEventListener('click',event=>{event.preventDefault();notify('Registration page is not connected yet. Add a signup flow to create accounts.')});
document.querySelectorAll('[data-info]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();notify(`${link.dataset.info} page has not been added yet.`)}));
