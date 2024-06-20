const socket = io('https://xpwgcnd.localto.net/')
const regBtn = document.getElementById('registerRg'),
formSub = document.getElementById('form-submit'),
logForm = document.getElementById('login-form'),
dash = document.querySelector('.dashboard'),
footer = document.getElementById('footer'),
menu = document.querySelector('.menu-list'),
displayMenu= document.querySelector('#pagesToDisplay'),
channels = document.querySelector('.channel-lists'),
forgot = document.querySelector('.forgotInfo'),
channels_display = document.querySelector('.channels-display'),
userprofile = document.getElementById('user_profile'),
userprofileDiv = document.querySelector('.user_profile'),
subTopic = document.getElementById('onsubmit'),
topi = document.getElementById('topic'),
result = document.getElementById('result'),
feedform = document.querySelector('.feedform'),
app = document.getElementById('appoint'),
fb = document.querySelector('#feedback'),
divMenu = document.querySelector('.displayview'),
dateDash = document.querySelector('.date_dash'),
logout = document.querySelector('#logout'),
langSet = document.querySelector('.languageSettings'),
myBtn = document.getElementById('myBtn'),
commentForm = document.querySelector('.comment_data'),
creatAcc = document.querySelector('.createAcc'),
editP =document.querySelector('.edit_Prof'),
commentDisplay =  document.querySelector('.commentDisplay'),
usersList = document.querySelector('.usersList'),
holdArr = [],
cartAlog = []
const defaultOptions = {},
caLog = [],
chanArray = [],
dateArray = []
const video = document.getElementById("player")
//const videoid = document.getElementById('videoid')
//const skippa = document.querySelector('.skippa')
//const adVideo = document.getElementById('vid1')
//const adVideoVid = document.getElementById('video_container')
const videoContainer =document.querySelector('.videocontainer')

var totalPrice = 0
var tray = []
function navOnline(){
  if(navigator.onLine === true || navigator.onLine === 'true'){
   document.querySelector('.notifydiv').style.display="none"
  }else{
    document.querySelector('.notifydiv').style.display="block"
  document.querySelector('.notifydiv').innerHTML='<i class="fas fa-wifi text-danger m-1"></i>You are offline...'
   
  }
}
setInterval(() => {
  navOnline()
}, 2000);
document.querySelector('#log').addEventListener('click',()=>{  
  document.querySelector('.regDiv').style.display="none"
  document.querySelector('.loginDiv').style.display="block"
})
forgot.addEventListener('click',()=>{
  var email = document.getElementById("email").value
  if(email === ''){
    document.getElementById('alertAll').innerHTML="<span class='text-danger'>Enter your email.</span>"
  }else{
   
    const data = {
      em:email
    }
    socket.emit('forgot-account',data)

  }
})
function removeChan(){
   
    document.querySelector('.reportChannel').innerHTML='Please understand that Blitz TV is a streaming service and user-uploaded platform that sourced channels/content on the web in align with guidelines and content policies, by this we assume that the channels/content are available to the general public for viewing. Notwithstanding, we take the priviledge of obliging to channels/content owners to take down any channels/content that has breached their terms of service, policies, copyrights etc. that has with or without a prior noticed been changed. Blitz Tv takes all channel removal requests seriously in order to avoid LEGAL SUIT, our dedicated support team works around the clock to quickly process and remove such channel(s)/content.<br/> For channels/content take-down, kindly send us a message to the following email addresses<p>       * <a href="mailto:blitzviews360@gmail.com">Blitz Tv</a></p>'
}
socket.on('forgot-account', (data)=>{
   
  var des = JSON.parse(data)
  
  if(des === "0" || des === 0 ){
    document.getElementById('alertAll').innerHTML="<span class='text-danger'>Invalid email,</span>"
  }else if(des === "1" || des === 1){
    document.getElementById('alertAll').innerHTML="<span class='text-success'>Check your inbox or spam messages.</span>"
  }
})
regBtn.addEventListener('click', regbtn)
function regbtn(){
  document.querySelector('.loginDiv').style.display="none"
    document.querySelector('.regDiv').style.display="block"
}
socket.on('region',(data)=>{
  chanArray.length = 0
 chanArray.push(JSON.parse(data))
})
/*
window.addEventListener('storage',()=>{
  var fi = JSON.parse(window.sessionStorage.getItem('url'))
  if(fi === ''){
     
  }else{
      menu.style.marginTop="1em"
      var frame = document.getElementById('iframePlayer')
      frame.style.display="block"
      frame.width = '367'
       frame.height ='188'
      frame.src="https://zjsdv.localtonet.com/?user="+fi
  }
})
*/

formSub.addEventListener('submit', (e)=>{
    e.preventDefault()
    var fname = document.getElementById("fname").value
    var lname = document.getElementById("lname").value
    var email = document.getElementById("email_create").value
    var passwordC = document.getElementById("password_create").value
    var cnt = document.querySelector(".country").value

            if(fname === ""){
             document.getElementById('fname').style.border="1px solid red"
             }else{
               document.getElementById('fname').style.border="1px solid blue"
             }
             if(lname === ""){
               document.getElementById('lname').stfyle.border="1px solid red"
             }else{
               document.getElementById('lname').style.border="1px solid blue"  
             }
             if(email === ""){
               document.getElementById('email_create').style.border="1px solid red"
             }else{
               document.getElementById('email_create').style.border="1px solid blue"
             }
             
             if(passwordC === ""){
               document.getElementById('password_create').style.border="1px solid red"
             }else{
               document.getElementById('password_create').style.border="1px solid blue"
             }
             if(cnt === "Choose Country"){
              document.querySelector('.country').style.border="1px solid red"
            }else{
              document.querySelector('.country').style.border="1px solid blue"
            }
             if(fname !== "" && lname !== "" && email !== "" && passwordC !== "" && cnt !== "Choose Country"){
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/            
               if(email.match(mailformat))
               {
                  
                        const data = {
                           fname:fname,
                           lname:lname,
                           email: email,
                           password:CryptoJS.MD5(passwordC).toString(),
                           country:cnt,                   
                           date_joined: new Date,
                           id: Math.floor((Math.random()* 1000000000) +1),
                           is_loggedIn:false,
                           verified:false,
                           subscription:1
                        }  
                       var newData = JSON.stringify(data)
                       document.getElementById('myBtn').disabled=true
                       
                       
                        var n=1; //number of days to add. 
                        var today=new Date(); //Today's Date
                        var requiredDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+n)
                      
                      const paydata = {
                        id:Number(data.id),
                        days:n,
                        start:today,
                        terminate:requiredDate,
                        agent:"",
                        texxt:Math.floor((Math.random() * 1000000000) + 1),
                        gateway:'Free'
                      }
                      socket.emit('registration', data)
                      socket.emit('payment-successful', paydata)
                
                
             } else {
                  document.getElementById('email_create').style.border="solid red"
               return false 
               }
           
            }
})

feedform.addEventListener('submit',(e)=>{
  e.preventDefault()
  var fback = document.querySelector('.fback').value
  if(fback === ''){
    document.querySelector('.fback').style.border="1px border red"
  }else{
    document.querySelector('.fback').style.border=""
    const data = {
      userid:window.localStorage.getItem('user_num'),
      feed:fback
    }
    socket.emit('feed-back', data)
    document.querySelector('.fback').value=""
  }
  
})
logForm.addEventListener('submit', (e)=>{
    e.preventDefault()
  
    footer.style.display="block"
    langSet.style.display="none"
    var mail = document.getElementById("email").value
    var pass = document.getElementById("password").value
        if(mail === ""){
        document.getElementById('email').style.border="1px solid red"
        }else{
          document.getElementById('email').style.border="1px solid blue"
        }
        if(pass === ""){
          document.getElementById('password').style.border="1px solid red"
        }else{
          document.getElementById('password').style.border="1px solid blue"  
        }
        if(mail !== "" && pass !== "" ){
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/            
           if(mail.match(mailformat))
           {
            const data = {
                email:mail,
                password:CryptoJS.MD5(pass).toString(),
                device:window.navigator.userAgent
            }  
           
           
           document.getElementById('logBtn').disabled=true
            socket.emit('login', data)
            document.getElementById("email").value = ''
            document.getElementById("password").value = ''
         } else {
              document.getElementById('email').style.border="1px solid red"
           return false 
           }
       
        }
})
socket.on('login',(data)=>{
  var de = JSON.parse(data)
  document.getElementById('logBtn').disabled=false
  if(de === 'Account not verified'){
    document.getElementById('alertAll').innerHTML="<span class='text-warning'>Please verify your account, check your Inbox or Spam mail...</span>"
   
  }else if(de === 'Email not found'){
    document.getElementById('alertAll').innerHTML="<span class='text-danger'>Email not found...</span>"
  }else if(de === 'incorrect'){
    document.getElementById('alertAll').innerHTML="<span class='text-danger'>Incorrect Details...</span>"
  }else{
   
    if(de.is_loggedin == true){
       document.getElementById('alertAll').innerHTML="<span class='text-danger'>User already loggedin...</span>"
    }else{      	    
      myuser_logs(data)      
    }
  }
})
window.addEventListener('mouseover',()=>{
  if(window.localStorage.getItem('user_num') === '') {}
  else socket.emit('check-sub', Number(window.localStorage.getItem('user_num')))
})
function checksubscriber(params) {
  socket.emit('check-sub',params)
}
socket.on('check-sub',(data)=>{
  if(data === null){
   runafterload()
  }else if(data !== null){
     $('#pagesToDisplay').addClass('d-flex justify-content-center')
    displayMenu.style.display="block"
    document.getElementById('mysubscription').style.display="none"
  }
})
function runPlay(code){
  /*var idplay = document.getElementById('hideValue').value
      if(Hls.isSupported()){
          const hls = new Hls()
  
      video.muted=false 
      hls.loadSource(url)        
      hls.on(Hls.Events.MANIFEST_PARSED,(event,data)=>{           
       const availableQualities = hls.levels.map((l)=> l.height)
        defaultOptions.controls = [
                  'play-large',
                  'restart',
                  'rewind',
                  'play',
                  'fast-forward',
                  'progress',
                  'current-time',
                  'duration',
                  'mute',
                  'volume',
                  'captions',
                  'settings',
                  'pip',
                  'airplay',
                  'autoPlay',
                  'fullscreen'
        ];
        new Plyr(video, defaultOptions)
        
      })       
     hls.attachMedia(video)              
     window.hls = hls
  }
  const iframe = document.createElement('iframe')
  iframe.src=url
  iframe.width='100%'
  iframe.height="50%"
  iframe.scrolli=*/
  document.querySelector('#iframeLivePlayer').src='https://pv0wr7s.localto.net//media/?url_code='+code
}
function userdetails(id){
  const data ={ id:id}
  socket.emit('userdetails', data)
}
socket.on('userdetails',(data)=>{

})
function audiocast(){
  document.querySelector('.webcast').innerHTML="hello"
}
function listeningroom(){
  document.querySelector('.webcast').innerHTML="Listening Room"
}
function liveTV(){
  
    document.querySelector('.castView').style.display="none"
    document.querySelector('.list_of_webcast').style.display="block"
    document.querySelector('.list_of_webcast').innerHTML='<div class="container-fluid row d-flex"><div class="col"><span onclick="goback()" class="text-light">&larr;</span></div> <div class="col" align="right"><form id="formj"><input type="text" class="form-control chaname text-light bg-transparent border-0" placeholder="Channel Name" required/></form></div> </div> <hr/><div class="container-fluid molly"></div>'
     document.querySelector('.molly').innerHTML='<center><img src="img/loader.gif" class="img-responsive m-1" width="33"/></center>'
    socket.emit('fetch-users-livetv-data',"")
    document.querySelector('#formj').addEventListener('submit',(e)=>{
        e.preventDefault()
      var chaname = document.querySelector('.chaname').value
      if(chaname === ''){
          
      }else{
          runChannelSearch(chaname)
          document.querySelector('.chaname').value=''
      }
    })
}
socket.on('fetch-users-livetv-data',(data)=>{
    const res = JSON.parse(data)
      var ht = ''
    if(res.length > 0){
         $.each(res,(index,value)=>{
        ht += '<div class="row mb-1"><div class="container-fluid appendVideo"></div><div class="col"><img src="'+value.image+'" class="m-1 img-responsive" width="100" height="50"/></div><div class="col"><a href="javascript:void(0)" class="btn btn-primary p-1" onclick="playee(\''+value.stream+'\')"><i class="fas fa-play-circle rounded"></i></a></div><p>'+value.channelname+'</p><div>'
        })
    }else{
        ht="<span class='row d-flex justify-content-center text-danger'>No Data, Visit https://drellon.com and start streaming.</span>"
    }
    document.querySelector('.molly').innerHTML=ht
})
function playee(url){
  document.querySelector('.appendVideo').innerHTML=""
    var frame = document.createElement('iframe')
       frame.width = frame.contentWindow.document.body.scrollWidth;
       frame.height = frame.contentWindow.document.body.scrollHeight;
        frame.id="iframePlayer"
        frame.allowFullscreen=true
        frame.style.border="none"
        frame.style.position="relative"
      frame.src="https://byspx.localto.net/?user="+url
    document.querySelector('.appendVideo').append(frame)
}
function runChannelSearch(chaname){
   const data = JSON.parse(window.localStorage.getItem('all_channels'))
   for(let i=0;i<data.length;i++){
       if(chaname === data[i].channelname){
          // alert(data[i].channelname)
       }
   }
}

function goback(){
 document.querySelector('.list_of_webcast').innerHTML=""
 document.querySelector('.castView').style.display="block"
 document.querySelector('.list_of_webcast').style.display="none"
}
function musicfiles(){
  document.querySelector('.webcast').innerHTML="Music <button class='btn btn-sm btn-primary'>Test</button>"
}

function getApprovedStreams(res){
    const data = JSON.parse(res)
   
   //document.querySelector('.molly').innerHtml=data
}
function myuser_logs(data){ 
 var newData = JSON.parse(data)
  if( newData !== null){      	
    document.querySelector('.regDiv').style.display="none"
    document.querySelector('.loginDiv').style.display="none" 
    document.getElementById('footer').style.display="none"
    langSet.style.display='none'
  
    
      setCookie('cog_log_dsnfdsvdsbjfbds', newData.id, 30);
      window.localStorage.setItem('user_num', newData.id)
      window.localStorage.setItem('email', newData.email)
      window.localStorage.setItem('fullname', newData.fname+" "+newData.lname)
      window.localStorage.setItem('countryName', newData.country)
      document.getElementById('up').innerText=newData.fname+" "+newData.lname
      document.getElementById('fnameupdate').value=newData.fname
      document.getElementById('lnameupdate').value=newData.lname
      document.getElementById('oldemail').value=newData.email
      socket.emit('user_connected', newData.id)

      dash.style.display="block"
      const newdataa = {
        fname:newData.fname,
        lname:newData.lname,
        email: newData.email,
        password:newData.password,
        country:newData.country,                   
        date_joined:newData.date_joined,
        id: newData.id,
        is_loggedIn:true,
        verified:newData.verified,
        subscription:newData.subscription
      }
      socket.emit('update-login', newdataa)


    
   
  }else{
      var cooki = getCookieForAutoLogin('cog_log_dsnfdsvdsbjfbds')
      const userLog = {id:cooki}
      var ress = JSON.stringify(userLog) 
      socket.emit('logout', ress)
      document.cookie = "cog_log_dsnfdsvdsbjfbds=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";     
  }
}
function runafterload() {
    $('#pagesToDisplay').removeClass('d-flex justify-content-center')
    displayMenu.style.display="none"
    document.getElementById('mysubscription').style.display="block"
  if(window.localStorage.getItem('countryName') === 'Nigeria'){
    var name = window.localStorage.getItem('fullname')
    document.getElementById('mysubscription').innerHTML='<form  class="d-block justify-content-center row payform"><div class="form-group col-lg"><input type="hidden" class="userid"/><input type="tel"  value="'+name+'" class="form-control bg-transparent text-white" disabled/></div><div class="form-group col-lg"><select class="form-control bg-transparent mt-3 text-white"  id="item-option"><option value="Choose Plan">Choose Plan</option><option value="1000">Monthly - 1000 NGN</option></select></div><div class="form-submit"><button type="button" onclick="payform()" class="btn btn-sm btn-success mt-3 text-uppercase">pay</button></div></form>'
    const pf = document.querySelector('.payform')
    pf.addEventListener('click', payform, false)
 }else{
   document.getElementById('paypa').innerHTML='<div id="smart-button-container"><div style="text-align: center;"><div style="margin-bottom: 1.25rem;"><select class="form-control form-control-user bg-transparent mt-3 text-white"  id="item-options"><option value="Monthly" price="1.5">Monthly - 1.5 USD</option></select><select style="visibility: hidden;" id="quantitySelect"></select></div><div id="paypal-button-container"></div></div></div>'
    initPayPalButton()
   // document.getElementById('mysubscription').innerHTML=''
  }
}
socket.on('user_connected',(data)=>{
  
})
function payform(){
 // e.preventDefault()
  var planprice = document.querySelector('#item-option').value
  if(planprice === 'Choose Plan'){
    document.querySelector('#item-option').style.border='1px solid red'
  }else{
    let handler = PaystackPop.setup({
      key:'pk_live_c03716a93c872a0cb37b90ba2488fbbeb7de7529',
      amount: planprice *100,
      email:window.localStorage.getItem('email'),
      ref: ''+Math.floor((Math.random() * 1000000000) + 1),
      onClose: function(){
       document.querySelector('.notifydiv').style.display="block"
       document.querySelector('.notifydiv').innerHTML="<i class='fas fa-money-bill-alt text-danger m-1'></i> Closed."
       go_off()
      },
      callback:function (response) {
        document.querySelector('.notifydiv').style.display="block"
        document.querySelector('.notifydiv').innerHTML="<i class='fas fa-money-bill-alt text-success m-1'></i> Succesful."
        go_off()
        if(planprice === 1000 || planprice === '1000'){
          var n=30; //number of days to add. 
          var today=new Date(); //Today's Date
          var requiredDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+n)
        }else{}        
        const paydata = {
          id:Number(window.localStorage.getItem('user_num')),
          days:n,
          start:today,
          terminate:requiredDate,
          agent:"",
          texxt:Math.floor((Math.random() * 1000000000) + 1),
          gateway:'PayStack '+planprice
        }
        socket.emit('payment-successful', paydata)
      }
    })
    handler.openIframe()
  }
  
}
socket.on('payment-successful', (res)=>{
  var jsondata = JSON.parse(res)
  if(jsondata === 'successful'){
    document.querySelector('.notifydiv').style.display="block"
    document.querySelector('.notifydiv').innerHTML="<i class='fas fa-money-bill-alt text-success m-1'></i> Successful"
    go_off()
    const data ={id:window.localStorage.getItem('user_num')}
  socket.emit('check-subscription', data)
  }
})
function accept(val){
 
  var dtime = document.querySelector('.timeArrangement'+val).value
  var hiddenId = document.querySelector('.hiddenId'+val).value
  if(dtime === ''){
     document.querySelector('.timeArrangement'+val).style.display="1px solid red"  
  }else{
    const data = {
      d_time:dtime,
      user:window.localStorage.getItem('user_num'),
      id:hiddenId,
      name:window.localStorage.getItem('fullname'),
      type:'accept',
      amount:'2.1'
    }
   socket.emit('schedule', data)
   dateArray.splice(val, 1)
  dateArr(dateArray)
  }
}
function reject(val) { 
  dateArray.splice(val, 1)
  dateArr(dateArray)
}

logout.addEventListener('click',()=>{
  document.cookie = "cog_log_dsnfdsvdsbjfbds=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  window.localStorage.removeItem('app_date')
  window.localStorage.removeItem('countryName')
  window.localStorage.removeItem('datedash')
  window.localStorage.removeItem('email')
  window.localStorage.removeItem('fullname')
  window.localStorage.removeItem('post_creator')
  window.localStorage.removeItem('receiver')
  window.localStorage.removeItem('roomId')
  window.localStorage.removeItem('usersDatingAcc')
  loadCooki() 
})
function setCookie(cName, cValue, expDays) {
  document.cookie='username=John'
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}
window.addEventListener('load',loadCooki)
function loadCooki(){
    
  var cooki = getCookieForAutoLogin('cog_log_dsnfdsvdsbjfbds')
  var data = window.localStorage.getItem('myuser_logs')
          if(cooki !== ''){
          
           myuser_logs(data)
          }else{
            
            const userLog = {id:window.localStorage.getItem('user_num')}
            if(userLog.id === null){
                        dash.style.display="none"
                        langSet.style.display="none"
                        document.querySelector('.webcast').style.display="none"
                        window.localStorage.removeItem('user_num')
                        window.localStorage.removeItem('myuser_logs')
                        // document.getElementById('paypal-button-container').innerHTML=""
                        document.querySelector('.loginDiv').style.display="block"
            }else{
             socket.emit('logout', userLog)
            }           
           
            
          }
}
socket.on('logout', ()=>{
    dash.style.display="none"
    langSet.style.display="none"
     document.querySelector('.webcast').style.display="none"
    window.localStorage.removeItem('user_num')
    window.localStorage.removeItem('myuser_logs')
   // document.getElementById('paypal-button-container').innerHTML=""
    document.querySelector('.loginDiv').style.display="block"
  
})
fb.addEventListener('click',()=>{
  divMenu.style.display="none"  
  userprofileDiv.style.display="none"
  dateDash.style.display="none"
  creatAcc.style.display="none"
  document.querySelector('.community').style.display="none"
  document.querySelector('.watchingembed').style.display="none"
  document.querySelector('.appoint').style.display="none"
  document.querySelector('.feedback').style.display="block"
  document.querySelector('.webcast').style.display="none"
})
  function getCookieForAutoLogin(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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
function channelNo(num){
  checksubscriber(window.localStorage.getItem('user_num'))
  switch(num){
    case 1:
      tvchannels(num)
      break
    case 2:
      tvchannels(num)
      break
    case 3:
      tvchannels(num)
      break
    case 4:
      watching()
      break
    case 5:
      webCast()
      break
    case 6:
      vod()
      break
    case 7:
      socials()
      break
    case 8:
      checkUserDatingReg()
      break
  }
 // displayMenu.style.display="none"
 // channels.style.display="flex"
 const data ={id:window.localStorage.getItem('user_num')}
  socket.emit('check-subscription', data)
}
function vod(){
     document.querySelector('.displayview').style.display="none"
  document.querySelector('.watchingembed').style.display="none"
  document.querySelector('.vod').style.display="block"
        
        socket.emit('fetch-movies', '')
           
}
socket.on('fetch-movies', (data)=>{
  
    var ht = ''
  if(data.length > 0){
    for (let i = 0; i < data.length; i++) {
      ht += '<div class="col"><img onclick="clickPlayMovies(\''+data[i].url+'\',\''+data[i].title+'\')" width="80" height="109" src="'+data[i].img+'" class="rounded m-1"/><p class="text-light" style="font-size:12px;">'+data[i].title+'['+data[i].year+']</p></div>'
      
    }
   
  }
   document.getElementById('vod_set').innerHTML=ht
})
function watching() {
    socket.emit('get-channels','')
    
  document.querySelector('.displayview').style.display="none"
  document.querySelector('.watchingembed').style.display="block"
  
}
function openVoD(val){
     document.querySelector('.vod').innerHTML="<p><span onclick='returnback()'>&larr;</span></p><div id='vid'></div><div class='vidList w-100'></div>"
     document.querySelector('.vidList').innerHTML='<div class="d-flex justify-content-center"><img src="./img/loader.gif" class="img-responsive m-1" width="33"/></div>'
      
      
      const data = {
          vae:val
      }
      socket.emit('fetch-users-vod', data)
    
}
socket.on('get-channels',(data)=>{
  var ht = ''
 
  var ress = data.sort()
  if(ress.length > 0){
    for (let i = 0; i < ress.length; i++) {
          ht += '<li class="col bg-dark m-2 p-2" onclick="runPlay(\''+ress[i].m3url+'\')"><img width="48" src="'+ress[i].image+'" class="rounded"/><p class="text-light" style="font-size:12px;">'+ress[i].ChannelName+'</p></li>'
         
    }
    document.querySelector('.views').innerHTML=ht
  }
})
socket.on('fetch-users-vod',(data)=>{
    var res = JSON.parse(data)
    var hd = '' 
       document.querySelector('.vidList').innerHTML=''
        if(res.length > 0){
            for(let i=0;i<res.length;i++){
                if(res[i].img === ''){
                    var imagee = './img/vod.PNG'
                }else{
                    var imagee = res[i].img
                }
                 hd += '<div class="row"><div class="col"><span  class="m-2"><img width="106" class="rounded" src="'+imagee+'" /><p>'+res[i].title+'</p></span></div><div align="right" class="col col-lg"><br><a href="javascript:void()" onclick="playVideo(\''+res[i].content+'\')" class="p-2 mt-1 btn btn-primary"><i class="fas fa-play"></i></a><p><i class="fas fa-plus m-1 text text-info" data-toggle="modal" data-target="#videoDes" onclick="descriptionMontrer(\''+res[i].description+'\')"></i></p></div></div>'
            }
        }else{
              hd = '<span class="row d-flex justify-content-center text-danger">No Data, Visit https://drellon.com and start streaming.</span>'
        }
        
        document.querySelector('.vidList').innerHTML='<div class="container-fluid">'+hd+'</div>'
})
function descriptionMontrer(bio){
   document.querySelector('.videoDescription').innerText=bio
}
/* function clickPlay(link,name) {
    document.querySelector('.cplay').innerHTML='<iframe src="'+link+'" width="100%" height="200" id="iframePlayerMain" style="position:relative;" scrolling="no" frameBorder="0" allowfullscreen></iframe>'
    
 // document.querySelector('#iframePlayerMain').src='https://byspx.localto.net/?use='+newOne
   let newOne
    $.get("https://ipinfo.io", function(response) {
   newOne = link+'&&name-'+name+'|location#'+response.city+'@'+response.country+'@'+response.timezone
     document.querySelector('.cplay').innerHTML='<strong>'+name+'</strong>'
  document.querySelector('#iframePlayerMain').src='https://byspx.localto.net/?use='+newOne
}, "jsonp");

  
}*/
function clickPlayMovies(link,name) {
    document.querySelector('.mplay').innerHTML='<iframe src="'+link+'" width="100%" height="200" id="iframePlayerMain" style="position:relative;" scrolling="no" frameBorder="0" allowfullscreen></iframe>'
    /*
    <a class="btn btn-warning p-1" href="VLC://'+link+'">VLC</a>
    let newOne
    $.get("https://ipinfo.io", function(response) {
   newOne = link+'&&name-'+name+'|location#'+response.city+'@'+response.country+'@'+response.timezone
     document.querySelector('.mplay').innerHTML='<strong>'+name+'</strong>'
  document.querySelector('#iframePlayerMovie').src='https://byspx.localto.net/?use='+newOne
}, "jsonp");
*/
  
}
function returnback(){
   
    document.querySelector('.vod').innerHTML='<div class="mb-1"><div class="col"><form id="formVod"><input type="text" class="form-control chaname text-light bg-transparent border-0" placeholder="Channel Name" required/></form></div></div><div class="container-fluid list_of_vodchannel"></div>'
  document.querySelector('.list_of_vodchannel').innerHTML='<div class="row d-flex justify-content-center"><img src="img/loader.gif" class="img-responsive m-1" width="33"/></div>'
  
       socket.emit('fetch-users-vodfiles','')
        
}
function playVideo(link){
   
    document.getElementById('vid').innerHTML=""
    var frame = document.createElement('iframe')
       frame.width = frame.contentWindow.document.body.scrollWidth;
       frame.height =frame.contentWindow.document.body.scrollHeight;
        frame.id="iframePlayer"
        frame.allowFullscreen=true
        frame.style.border="none"
        frame.style.position="relative"
      frame.src="https://byspx.localto.net/?user="+link
    document.getElementById('vid').append(frame)
}
function webCast() {
  //Audio Stream
  //Music Stream  
  document.querySelector('.displayview').style.display="none"
  document.querySelector('.webcast').style.display="block"
}
editP.addEventListener('click', ()=>{
  dateDash.style.display="none"
  creatAcc.style.display="block"
})
socket.on('topics',(res)=>{
  document.getElementById('result').innerHTML= ""
  var elem = ''
  var data = JSON.parse(res)
  if(data.length > 0){
    for (let i = 0; i < data.length; i++) {
    
      elem += '<span class="text text-white mb-3 d-block" id="listItems" onclick="setMe(\''+data[i].roomid+'\',\''+data[i].userid+'\')">'+data[i].topic+'</span>'
    }
    document.getElementById('result').innerHTML+=elem
  }else{
    document.getElementById('result').innerHTML="No Data"
  }
  
  
 
})
socket.on('schedule', (data)=>{
  cartAlog.length = 0
  cartAlog.push(data)  
  var ht = ''
  var nt = ''
  for (let i = 0; i < cartAlog.length; i++) { 
    const productTotal = cartAlog.length * cartAlog[i].amount;
    totalPrice = totalPrice + productTotal;
    document.getElementById("amountCart").value=totalPrice
    ht += '<li>'+cartAlog[i].name+'| '+cartAlog[i].d_time+'</li>'
    nt += '<li>'+cartAlog[i].name+' has accepted your request, you have been scheduled for '+cartAlog[i].d_time+'</li>'
    document.querySelector('.notifydiv').style.display="block"
    document.querySelector('.notifydiv').innerHTML= cartAlog[i].name+' has accepted your request, you have been scheduled for '+cartAlog[i].d_time+', setup a zoom video chat and forward, your cart has been updated. Thank you'
    go_off()
    window.localStorage.setItem('receiver',cartAlog[i].user)
    window.localStorage.setItem('app_date',cartAlog[i].d_time)
    const da = {
      sender:window.localStorage.getItem('user_num'),
      receiver:cartAlog[i].user,
      date:cartAlog[i].d_time,
      code:'',
      status:''
    }
    socket.emit('calendaSetting', da)
  }
  document.querySelector('.btnCart').style.display="block"
  document.querySelector('.panelCart').innerHTML=ht
  document.getElementById('alertDropdown').innerHTML=nt 
  document.querySelector('.notifyList').innerText= cartAlog.length
  document.querySelector('.zoomList').innerText= cartAlog.length
 
})
socket.on('calendaSetting', (data)=>{
})
socket.on('refresh-comments', (data)=>{
   setMe(data.room,data.to)
})
function setMe(roomid,user){
  holdArr.length = 0
  const data = {
    room: roomid
  }
  window.localStorage.setItem('post_creator',user)
  var inputHid = '<input type="hidden" value="'+roomid+'" class="hiddenRoomId"/>'
  document.querySelector('.hidfield').innerHTML=inputHid
  document.querySelector('.enlever').style.display="none"
  document.getElementById('result').style.display="none"
  document.querySelector('.comments').style.display="block"
  document.querySelector('.comntSectn').innerHTML="<span class='text-danger m-2' onclick='undoWork()'><i class='fas fa-undo'></i></span> <i class='fas fa-comment-alt text-primary'></i> <span class='float-right commentsize'></span> <i class='fas fa-users text-primary'></i> <span class='float-right commentOnlineUsers'></span>"
  
  socket.emit('getTopicDetails', data)
  
 }
 socket.on('user-connected', (data)=>{  
   window.localStorage.setItem('roomId', data)
 })
 function displayoutCommentForm() {
   document.querySelector('.comment_data').style.display="flex"
 }
 commentForm.addEventListener('submit',(e)=>{
   e.preventDefault()
   var comInput = document.querySelector('.inputcomment').value
   var hiddenRoom = document.querySelector('.hiddenRoomId').value
   var nam = document.getElementById('up').textContent
      if(comInput === ''){

      }else{
       
          const data = {
            comment:comInput,
            from:window.localStorage.getItem('user_num'),
            to:window.localStorage.getItem('post_creator'),
            room:hiddenRoom,
            name:nam,
            type_:'1',
            date_added:new Date()
          }
       
            socket.emit('comments', data)
            document.querySelector('.inputcomment').value=""
            document.querySelector('.comment_data').style.display="none"
      }
 })
 
 socket.on('comments', (ddd)=>{ 
  commentDisplay.innerHTML="" 
  const data = JSON.parse(ddd)
  var elem = ''
  if(data.length > 0){
          for (let i = 0; i < data.length; i++) {   
           
              var res = data[i].name
            if(data[i].type_ === '1' || data[i].type_ === 1){
              elem += '<div class="p-2 bg-transparent border border-primary border-top-0 mb-2" style="font-size:12px;"><div class="row d-flex"><div class="col-8">'+res+'<span class="text-warning">&larr;</span> </div><div class="col-3 float-right">~'+data[i].date_added+'</div></div>'+data[i].comment+'</div>' 
              }else if(data[i].type_ === '2' || data[i].type_ === 2){
              elem += '<div class=" p-2 bg-transparent border border-primary border-top-0 mb-2" style="font-size:12px;"><div class="row d-flex"><div class="col-8">'+res+' <span>&larr;</span></div><div class="col-3 float-right"> ~'+data[i].date_added+'</div></div><img src="'+data[i].comment+'" class="card-img-top img-responsive" height="60"/></div>' 
            }
            
          }                                              
  }else{
        elem = 'No Data'
  }
   
  
   document.querySelector('.commentsize').innerText=data.length
   commentDisplay.innerHTML=elem
   scrollToBottom()
 })
function scrollToBottom(){    
  commentDisplay.scrollTo(0, commentDisplay.scrollHeight)
}
function reply(name){
  document.querySelector('.inputcomment').value+="@"+name
}
 socket.on('total-numbers', (data)=>{
  document.querySelector('.commentOnlineUsers').innerText=data
 })
 socket.on('datedash', (data)=>{ 
   var ht = ''
   for (let i = 0; i < data.length; i++) {
     if(data[i].sex === 1 || data[i].sex === '1'){
       var sex_type = '<i class="fas fa-male text-primary"></i>'
     }else if(data[i].sex === 2 || data[i].sex === '2'){
      var sex_type = '<i class="fas fa-female text-danger"></i>'
     }else{}
     
      ht += '<div class="card bg-transparent m-1 border border-primary colored_card" style="width:10rem;"><img src="'+data[i].profilepic+'" class="card-img-top img-responsive"/><div class=""><h9>'+data[i].name+'</h9><div class="row"><div class="col">'+sex_type+' '+data[i].country+'</div></div></div><span class="btn btn-sm btn-primary text-white" onclick="contactme(\''+data[i].id+'\',\''+data[i].name+'\')">Send</span></div>'
      
   }
   usersList.innerHTML=ht
 })
 
 function date_dasher() {
   var data = JSON.parse(window.localStorage.getItem('usersDatingAcc'))
   var ht = ''
    if(data === null){
        alert('Chike')
    }else{
      alert('Chike 2')
                if(data.length > 0 ){
                        for (let i = 0; i < data.length; i++) {
                            if(data[i].sex === 1 || data[i].sex === '1'){
                              var sex_type = '<i class="fas fa-male text-primary"></i>'
                            }else if(data[i].sex === 2 || data[i].sex === '2'){
                              var sex_type = '<i class="fas fa-female text-danger"></i>'
                            }else{}
                            
                              ht += '<div class="card bg-transparent m-1 colored_card" style="width:10rem;"><img src="'+data[i].profilepic+'" class="card-img-top img-responsive"/><div class=""><h9>'+data[i].name+'</h9><div class="row"><div class="col">'+sex_type+' '+data[i].country+'</div></div></div><span class="btn btn-sm btn-primary text-white" onclick="contactme(\''+data[i].id+'\',\''+data[i].name+'\')">Send</span></div>'
                              
                          }
                  }else{
                    alert('Chike 4')
                  }
    }
   
  
   
   usersList.innerHTML=ht 
 }
 socket.on('registration',(data)=>{
  var d = JSON.parse(data)
  document.getElementById('myBtn').disabled=false
    if(d == "created"){
      var alert = '<span class="text-success">Your account has been created.</span>'
      setTimeout(() => {
        window.location.href='index.html'
      }, 3000);
    }else if(d == "Email exist"){
     var alert = '<span class="text-danger">Sorry, this email already exist in our system</span>'
    }else if(d == "Not sent"){
      var alert = '<span class="text-danger">We could not send a confirmation code to your email for verification.</span>'
    }
    document.querySelector('.alertRep').innerHTML=alert
    document.getElementById("fname").value=""
    document.getElementById("lname").value=""
    document.getElementById("email_create").value=""
    document.getElementById("password_create").value=""
 })
 socket.on('report_message', (data)=>{
  
   dateArray.push(data)
    dateArr(dateArray)
   document.querySelector('.timeArrange').style.display='block'
   document.querySelector('.notifydiv').style.display="block"
  document.querySelector('.notifydiv').innerHTML=data.name+' wants to have a video chat with you'
  go_off()
 })
 function dateArr(value) {
   var elem = ""
   if(value.length > 0){
     for (let i = 0; i < value.length; i++) {
      
     elem +='<li class="m-1">'+value[i].name+' <img src="'+value[i].profilepic+'" class="img-responsive iamgePic" width="44"><input type="datetime-local" class="form-control-user timeArrangement'+i+'"><input type="hidden" class="form-control-user hiddenId'+i+'" value="'+value[i].from+'"> <button type="button" class="btn btn-sm btn-danger m-1 reject'+i+'" onclick="reject(\''+i+'\')">No</button><button type="button" class="btn btn-sm btn-success accept'+i+'" onclick="accept(\''+i+'\')">Yes</button></li>'
     }
    document.querySelector('.classy').innerHTML=elem
   }else{
     document.querySelector('.timeArrange').style.display="none"
   }
 }
 function contactme(id,nam) {
  
   var nam = document.getElementById('up').textContent
   var pic = document.querySelector('.hiddenPicDetails').value
   const data = {
     to:id,
     from:window.localStorage.getItem('user_num'),
     name:nam,
     profilepic:pic
   }
   socket.emit('report_message', data)
   document.querySelector('.notifydiv').style.display="block"
  document.querySelector('.notifydiv').innerHTML= 'Notification sent, awaiting response...'
 go_off()  
  
 }
 function postImage() {
  
  var hiddenRoom = document.querySelector('.hiddenRoomId').value
  var nam = document.getElementById('up').textContent
  var filesSelected = document.getElementById("hiddenImage").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
       
        const data = {      

          comment:srcData,
          from:window.localStorage.getItem('user_num'),
          to:window.localStorage.getItem('post_creator'),
          room:hiddenRoom,
          name:nam,
          type_:'2',
          date_added:new Date()
        }
     socket.emit('comments', data)
     window.localStorage.removeItem('post_creator')
      }
      fileReader.readAsDataURL(fileToLoad);
    }
 }
 function undoWork(){
  document.querySelector('.enlever').style.display="block"
  document.getElementById('result').style.display="block"
  document.querySelector('.comments').style.display="none"
  document.querySelector('.comntSectn').innerHTML="Topics"
  commentDisplay.innerHTML=""
  
 }
function returnHome(){
  divMenu.style.display="block"  
  document.querySelector('.feedback').style.display="none"
  document.querySelector('.webcast').style.display="none"
  document.querySelector('.vod').style.display="none"
  userprofileDiv.style.display="none"
    menu.style.marginTop="5em"
  dateDash.style.display="none"
  creatAcc.style.display="none"
  document.querySelector('.appoint').style.display="none"
  document.querySelector('.community').style.display="none"
  document.querySelector('.watchingembed').style.display="none"
 //document.querySelector('#iframePlayer').style.display="none"
  var today=new Date(); //Today's Date
  var requiredDate=new Date(today.getFullYear(),today.getMonth(),today.getDate())
  const data ={id:window.localStorage.getItem('user_num')}
  socket.emit('check-subscription', data)
 
}
function socials(){
  divMenu.style.display="none"
  
  dateDash.style.display="none"
  document.querySelector('.community').style.display="block"
  socket.emit('get-topics','')
}
function checkUserDatingReg(){
 var ddash = window.localStorage.getItem('datedash')
 alert(ddash)
 if(ddash === 0 || ddash === '0' || ddash === undefined || ddash === 'undefined' || ddash=== null){   
   divMenu.style.display="none"
  
  dateDash.style.display="none"
  creatAcc.style.display="block"
 }else if(ddash === 1 || ddash === '1'){
  date_()
  date_dasher()
 }
}
function date_(){
  divMenu.style.display="none"
  
  creatAcc.style.display="none"
  dateDash.style.display="block"  
}

function picUpload() {
  var filesSelected = document.getElementById("profilepic").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

       document.querySelector('.hiddenPicDetails').value=srcData

      }
      fileReader.readAsDataURL(fileToLoad);
    }
}
function createDash(){
  var gender = document.querySelector('.gender')
  var pic = document.querySelector('.hiddenPicDetails').value
    if(gender.value === 'Select Gender'){
      gender.style.border='1px solid red'
      document.querySelector('.notifydiv').style.display="block"
      document.querySelector('.notifydiv').innerHTML="<i class='fas fa-male text-danger m-1'></i><i class='fas fa-female text-danger m-1'></i> Gender"
      
    }
    if(pic === ""){
      document.querySelector('.notifydiv').style.display="block"
      document.querySelector('.notifydiv').innerHTML="<i class='fas fa-image text-danger m-1'></i> Profile Image"
     
      }
    if(gender.value !== 'Select Gender' && pic != ""){
      //go_off()
      gender.style.border=''
      var name = document.getElementById('up').textContent
        
      var data = {
        name:name,
        id:window.localStorage.getItem('user_num'),
        sex:gender.value,
        profilepic:pic,
        country:window.localStorage.getItem('countryName'),
        notice:[]
      }
      //window.localStorage.setItem('datedash', 1)
      socket.emit('dating-account', data)
      //checkUserDatingReg()
    }
}

function displaySearchBar(){
  document.getElementById('searchBar').style.display="flex"
  document.getElementById('sidebarToggle').style.display="none"
  dateDash.style.display="none"
  document.getElementById('hidesidebarToggle').style.display="inline-block"
}
function hideSearchBar(){
  document.getElementById('searchBar').style.display="none"
  document.getElementById('hidesidebarToggle').style.display="none"
  dateDash.style.display="none"
  document.getElementById('sidebarToggle').style.display="inline-block"

}
userprofile.addEventListener('click', ()=>{

  document.querySelector('.watchingembed').style.display="none"
  divMenu.style.display="none"
  creatAcc.style.display="none"
  document.querySelector('.appoint').style.display="none"
  document.querySelector('.feedback').style.display="none"
  document.querySelector('.webcast').style.display="none"
  dateDash.style.display="none"
  document.querySelector('.community').style.display="none"
  userprofileDiv.style.display="block"

})

subTopic.addEventListener('submit', (e)=>{
  e.preventDefault()
  
  if(topi.value === ""){
    topi.style.border="1px solid red"
  }
  
  if(topi.value !== ""){
    topi.style.border=""
    const delta = {
      topic:topi.value,
      userid:window.localStorage.getItem('user_num'),
      date_created:new Date
    }
    socket.emit('topics', delta)
    topi.value="";
    hideSearchBar()
  }
})
function langa(val) {
  location.hash = val
  location.reload()
}
document.querySelector('.female_').addEventListener('click', ()=>{ 
  findUserSexFemale()
})
document.querySelector('.everyone').addEventListener('click', ()=>{ 
  var getUserData = JSON.parse(window.localStorage.getItem('usersDatingAcc'))
  
  var ht = ''
   for (let i = 0; i < getUserData.length; i++) {
     if(getUserData[i].sex === 1 || getUserData[i].sex === '1'){
       var sex_type = '<i class="fas fa-male text-primary"></i>'
     }else if(getUserData[i].sex === 2 || getUserData[i].sex === '2'){
      var sex_type = '<i class="fas fa-female text-danger"></i>'
     }else{}
     if(getUserData[i].country === null){
         var newOne = ''
     }else{
         var newOne = getUserData[i].country
     }
      ht += '<div class="card bg-transparent m-1 border border-primary colored_card" style="width:10rem;"><img src="'+getUserData[i].profilepic+'" class="card-img-top img-responsive"/><div class=""><h9>'+getUserData[i].name+'</h9><div class="row"><div class="col">'+sex_type+' '+newOne+'</div></div></div><span class="btn btn-sm btn-primary text-white" onclick="contactme(\''+getUserData[i].id+'\',\''+getUserData[i].name+'\')">Send</span></div>'
      
   }
   usersList.innerHTML=ht
})
document.querySelector('.male_').addEventListener('click', ()=>{ 
 findUserSexMale()
})
function findUserSexMale(){
 
  var getUserData = JSON.parse(window.localStorage.getItem('usersDatingAcc'))
 
  var ht = ''
   for (let i = 0; i < getUserData.length; i++) {
     if(getUserData[i].sex === 1 || getUserData[i].sex === '1'){
        if(getUserData[i].country === null){
         var newOne = ''
     }else{
         var newOne = getUserData[i].country
     }
       var sex_type = '<i class="fas fa-male text-primary"></i>'
       ht += '<div class="card bg-transparent m-1 border border-primary colored_card" style="width:10rem;"><img src="'+getUserData[i].profilepic+'" class="card-img-top img-responsive"/><div class=""><h9>'+getUserData[i].name+'</h9><div class="row"><div class="col">'+sex_type+' '+newOne+'</div></div></div><span class="btn btn-sm btn-primary text-white" onclick="contactme(\''+getUserData[i].id+'\',\''+getUserData[i].name+'\')">Send</span></div>'
     }
   }
   usersList.innerHTML=ht

}
function findUserSexFemale(){
  
  var ht = ''
  var getUserData = JSON.parse(window.localStorage.getItem('usersDatingAcc'))
 
   for (let i = 0; i < getUserData.length; i++) {
     if(getUserData[i].sex === '2' || getUserData[i].sex === 2){
     
     if(getUserData[i].country === null){
         var newOne = ''
     }else{
         var newOne = getUserData[i].country
     }
       var sex_type = '<i class="fas fa-female text-danger"></i>'
       ht += '<div class="card bg-transparent m-1 border border-primary colored_card" style="width:10rem;"><img src="'+getUserData[i].profilepic+'" alt="'+getUserData[i].name+'" class="card-img-top img-responsive" data-toggle="modal" data-target="#exampletest"/><div class=""><h9>'+getUserData[i].name+'</h9><div class="row"><div class="col">'+sex_type+' '+newOne+'</div></div></div><span class="btn btn-sm btn-primary text-white" onclick="contactme(\''+getUserData[i].id+'\',\''+getUserData[i].name+'\')">Send</span></div>'
     }
     
      
      
   }
   usersList.innerHTML=ht

}
function updateUserName(){
  const send_data ={
    user:window.localStorage.getItem('user_num'),
    email:window.localStorage.getItem('email')   
  }
  socket.emit('send-message-for-user-account-update', send_data)
}
function updateUserEmail(){
  const send_data ={
    user:window.localStorage.getItem('user_num'),
    email:window.localStorage.getItem('email')   
  }
  socket.emit('send-message-for-user-email-update', send_data)
}
function updateUserPass(){
  const send_data ={
    user:window.localStorage.getItem('user_num'),
    email:window.localStorage.getItem('email')   
  }
  socket.emit('send-message-for-user-pass-update', send_data)
}
socket.on('send-message-for-user-account-update', ()=>{
  document.querySelector('.notifydiv').style.display="block"
  document.querySelector('.notifydiv').innerHTML="<i class='fas fa-user-check text-success'></i> Petition has been submitted, an agent will respond to you through your email."
        go_off()
})
var language = {
	eng: {
		welcome: "Welcome to the GeeksforGeeks " +
		"Portal! You can choose any language " +
		"using the buttons above!"
	},
	es: {
		welcome: "¡Bienvenido al portal GeeksforGeeks! " +
		"¡Puedes elegir cualquier idioma usando " +
		"los botones de arriba!",
    index:"¿No tienes cuenta aún?",
    register:"Registrarse aquí",
    login:"entrar",
    create:"Crear una cuenta"
	},
	hin: {
		welcome: "GeeksforGeeks पोर्टल पर आपका स्वागत है! " +
		"आप ऊपर दिए गए बटन का उपयोग करके किसी भी " +
		"भाषा को चुन सकते हैं!"
	},
	pr: {
		welcome: "GeeksforGeeks Obrigado " +
		"आप ऊपर दिए गए बटन का उपयोग करके किसी भी " +
		"भाषा को चुन सकते हैं!",
		ball: "we dey play ball"
	}
	}
/*
tongue.addEventListener('click', ()=>{
  var lOpt = document.querySelector('.langOpt').value
 if(lOpt === 'en'){
  location.hash = lOpt
	location.reload()
 }else if(lOpt === 'fr'){
  location.hash = lOpt
	location.reload()
 }else if(lOpt === 'es'){
  location.hash = lOpt
	location.reload()
 }else if(lOpt === 'ar'){
  location.hash = lOpt
	location.reload()
}else if(lOpt === 'lt'){
  location.hash = lOpt
	location.reload()
}else if(lOpt === 'pr'){
  location.hash = lOpt
	location.reload()
}
})
if (window.location.hash) {

	// Set the content of the webpage
	// depending on the hash value
	if (window.location.hash == "#fr") {
		siteContent.textContent = language.fr.welcome
	} 
	else if (window.location.hash == "#es") {
		siteContent.textContent = language.es.index
    registerRg.textContent =language.es.register
    logBtn.textContent =language.es.login
    log.textContent =language.es.login
    myBtn.textContent =language.es.create  
    document.querySelector('#header').style.display="none"
    document.querySelector('.loginDiv').style.display="block"
	}else if (window.location.hash == "#ar") {
		siteContent.textContent = language.ar.welcome
	}else if (window.location.hash == "#lt") {
		siteContent.textContent = language.lt.welcome
	}
	else if (window.location.hash == "#pr") {
		siteContent.textContent = language.pr.welcome
		siteContent2.textContent = language.pr.ball
	}
	}
*/
  
function initPayPalButton() {
  var refnum = Math.floor(Math.random() * 10000000000) + 1;
  var shipping = 0;
  var itemOptions = document.querySelector("#smart-button-container #item-options");
  var quantity = parseInt();
  var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
  if (!isNaN(quantity)) {
    quantitySelect.style.visibility = "visible";
  }
  var orderDescription = refnum;
  if(orderDescription === '') {
    orderDescription = 'Item';
  }
  paypal.Buttons({
    style: {
      color: 'blue',
      shape: 'pill',
      label: 'pay',
      layout: 'vertical',
      
    },
    createOrder: function(data, actions) {
      var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
      var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
      var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0)/100));
      if(quantitySelect.options.length > 0) {
        quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
      } else {
        quantity = 1;
      }

      tax *= quantity;
      tax = Math.round(tax * 100) / 100;
      var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
      priceTotal = Math.round(priceTotal * 100) / 100;
      var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

      return actions.order.create({
        purchase_units: [{
          description: orderDescription,
          amount: {
            currency_code: 'USD',
            value: priceTotal,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: itemTotalValue,
              },
              shipping: {
                currency_code: 'USD',
                value: shipping,
              },
              tax_total: {
                currency_code: 'USD',
                value: tax,
              }
            }
          },
          items: [{
            name: selectedItemDescription,
            unit_amount: {
              currency_code: 'USD',
              value: selectedItemPrice,
            },
            quantity: quantity
          }]
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
      var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
        if(selectedItemPrice === 1.5 || selectedItemPrice === '1.5'){
          var n=30; //number of days to add. 
          var today=new Date(); //Today's Date
          var requiredDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+n)
        }else{}                  
        // Full available details
        
        // Show a success message within this page, e.g.
        document.querySelector('.notifydiv').style.display="block"
        document.querySelector('.notifydiv').innerHTML="<i class='fas fa-money-bill-alt text-success m-1'></i> Successful"
        go_off()
        const paydata = {
          id:Number(window.localStorage.getItem('user_num')),
          days:n,
          start:today,
          end:requiredDate,
          agent:"",
          texxt:refnum,
          gateway:'PayPal '+selectedItemPrice
        }
        socket.emit('payment-successful', paydata)

      });
    },
    onError: function(err) {
      console.log(err);
    },
  }).render('#paypal-button-container');
}
 

    //initPayPalButton();
app.addEventListener('click', ()=>{
  mejvod()
})
function mejvod(){
   const data = {
    id:window.localStorage.getItem('user_num'),
  }
  socket.emit('get-appointments',data)
}
socket.on('get-appointments',(data)=>{
  divMenu.style.display="none"
  document.querySelector('.feedback').style.display="none"
  document.querySelector('.webcast').style.display="none"
  userprofileDiv.style.display="none"
  dateDash.style.display="none"
  creatAcc.style.display="none"
  document.querySelector('.community').style.display="none"
  document.querySelector('.watchingembed').style.display="none"
  document.querySelector('.appoint').style.display="block"
 var res = JSON.parse(data)
 let element = ''
 if(res.length > 0){
   for (let i = 0; i < res.length; i++) {
     if(res[i].userid === window.localStorage.getItem('user_num')){
              if(res[i].zoom === ""){
                var dis = '<input type="text" class="bg-transparent text-white form-control w-50 zcode'+res[i].dd_id+'" placeholder="Zoom Code" /><button type="button" class="btn btn-sm btn-warning" onclick="sendCode(\''+res[i].dd_id+'\',\''+res[i].receiver+'\')">Send</button>'
              }else{
                var dis = res[i].zoom
              }
     }else if(res[i].receiver === window.localStorage.getItem('user_num')){
            if(res[i].zoom === ""){
              var dis = 'awaiting zoom code...'
            }else{
              var dis = res[i].zoom
            }
     }
     
     element += '<div class=""><strong>'+res[i].fname+" "+res[i].lname+'</strong><br/>Zoom Code: '+dis+', Date: '+res[i].appointment+'</div>'     
   }
 }else{
   element="No Data"
 }
 document.querySelector('.appoint').innerHTML=element
})
socket.on('check-subscription', (data)=>{
  window.localStorage.setItem('myuser_logs', data)
    myuser_logs(data)
})
function sendCode(val,receiver) {
 var code = document.querySelector('.zcode'+val).value
  if(code === ""){
    document.querySelector('.zcode'+val).style.border="1px solid red"
  }else{
    document.querySelector('.zcode'+val).style.border=""
    const data = {
      zcode:code,
      z_id:val,
      to:receiver
    }
   socket.emit('send-zcode', data)
  }
}
socket.on('send-zcode', ()=>{  
  document.querySelector('.notifydiv').style.display="block"
  document.querySelector('.notifydiv').innerHTML="<i class='fas fa-envelope-open-text text-success m-1'></i> Code sent"
 go_off()
 mejvod()
})
socket.on('send-zcode-receive', (data)=>{  
  document.querySelector('.notifydiv').style.display="block"
  document.querySelector('.notifydiv').innerHTML="<i class='fas fa-envelope-open-text text-success m-1'></i>"+data+" Code received"
 go_off()
 mejvod()
})
socket.on('delete-account',(data)=>{
  alert('Account Deleted')
  document.cookie = "cog_log_dsnfdsvdsbjfbds=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  window.localStorage.removeItem('app_date')
  window.localStorage.removeItem('countryName')
  window.localStorage.removeItem('datedash')
  window.localStorage.removeItem('email')
  window.localStorage.removeItem('fullname')
  window.localStorage.removeItem('post_creator')
  window.localStorage.removeItem('receiver')
  window.localStorage.removeItem('roomId')
  window.localStorage.removeItem('usersDatingAcc') 
  dash.style.display="none"
  langSet.style.display="none"
  document.querySelector('.webcast').style.display="none"
  window.localStorage.removeItem('user_num')
  window.localStorage.removeItem('myuser_logs')
  document.querySelector('.loginDiv').style.display="block"
})
function deleteAccount() {
  var data = window.localStorage.getItem('myuser_logs')
  socket.emit('delete-account', JSON.parse(data))
}
function go_off() {
  setTimeout(() => {
    document.querySelector('.notifydiv').style.display="none"
  }, 20000);
}
