
// 기준점으로 dark = false를 설정해둔것.
let dark = false;

function darkMode(){
   if(dark == false){
    dark = true;
    document.querySelector(".fa-moon").classList.add("fa-sun")
    document.querySelector(".fa-moon").classList.remove("fa-moon")
    document.querySelector("html").classList.add("dark")
    // f12 애플리케이션 로컬은 내가 지우지 않는 한 유지되는것 세션은 브라우저가 닫히면 바로 없어짐 로컬스토리지에서 클릭해보면 true 나타났다가 없어짐.
    localStorage.setItem("dark", true);
   }else{
    dark = false;
    document.querySelector(".fa-sun").classList.add("fa-moon")
    document.querySelector(".fa-sun").classList.remove("fa-sun")
    document.querySelector("html").classList.remove("dark")
    localStorage.removeItem("dark")
   }
  
}

const dark_mode = localStorage.getItem("dark");
// console.log(dark_mode)
//string값이라 ""큰따옴표로 해준것
if(dark_mode =="true"){
darkMode()
}

function language(lang){
   if(lang == "en"){
      localStorage.setItem("lang", "en");  
   }else{
      localStorage.removeItem("lang", "en");
   }
}

//다국어
const url = new URL(location.href).searchParams;
const lang = url.get("Lang")
const $lang = localStorage.getItem("lang");


localStorage.setItem("lang", lang);
// const chkLang = localStorage.getItem("lang");
// console.log("chkLang")
axios.get("data/data.json")
 .then(function(res){

   if($lang == "en"){  
      res.data.EnNav.map((e,i)=>{
      // console.log(e)
      document.querySelectorAll(".list li a")[i].textContent = e.title
      })
   }

   if(lang == "en"){  
            res.data.EnNav.map((e,i)=>{
            // console.log(e)
            document.querySelectorAll(".list li a")[i].textContent = e.title
            })
   }
 })
 .catch(function(error){
    console.log(error)
 })



//다국어

//모바일 네비


function mNav(){
   document.querySelector(".m-btn").classList.toggle("on")
}



//모바일 네비

