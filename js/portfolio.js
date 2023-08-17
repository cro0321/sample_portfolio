const $CateList = document.querySelectorAll(".cateList li");
$CateList[0].classList.add("on")

const $container = document.querySelector(".port-content")

function PortfolioData(data){
    data.map((e,i)=>{
    // console.log(e)
    let div = document.createElement("div");
    div.className = "bg-white mb-8 pt-12 group px-8 pb-16 rounded-md flex border dark:bg-[#272929] dark:text-[#ebf4f1] felx-wrap";
    
    let div_child1 = document.createElement("div");
    div_child1.className = "basis-[48%] relative mokup-img group-even:order-1 xl:group-even:order-2";
    for(let a = 1; a <= 3; a++){
        let div_ = document.createElement("div");
        let img_ = document.createElement("img");
        img_.className = "w-full";
        img_.src = `images/mokup-${a}.png`;
        img_.alt = `mokup`

        div_.appendChild(img_);
        div_child1.appendChild(div_);
    }
    let div_child2 = document.createElement("div");
    div_child2.className = "basis-[52%] group-even:order-2 xl:group-even:order-1 pt-10";

    let h3 = document.createElement("h3");
    h3.className = "text-2xl font-bold pt-[10px] pb-[10px] lg:pl-[50px]";
    h3.textContent = e.descTitle
    div_child2.appendChild(h3)
    
    let descs = [
        e.desc,
        "키워드 : ",
        "컬러 : ",
        "폰트 : "+e.font,
        "사용툴 : ",
        "작업기간 : "+e.date,
        "기여도 : "+e.contribution 

    ]

    for(let a = 0; a< descs.length; a++){
        let p = document.createElement("p");
        p.className = "text-base pt-[10px] pb-[10px] lg:pl-[50px]";
        
        if(a === 1 && e.keyword){
            let text = "키워드 : ";
            e.keyword.forEach(el =>{
                text += el + " ";
                
            })
            p.textContent = text;

        }else if(a === 2 && e.color){
            let text = "컬러 : ";
            e.color.forEach(el =>{
                let span = document.createElement("span");
                span.className = "w-5 h-5 inline-block align-middle mr-2";
                span.style.backgroundColor = el;
                p.appendChild(span)
            })
            p.prepend(text)
            
        }else if(a === 4 && e.tools){
            let text = "사용툴 : ";
                text += e.keyword.join();
                // text += el + " ";
                p.textContent = text;
        
        }else{
            p.textContent = descs[a];
        }
        div_child2.appendChild(p);
    }
    let ul = document.createElement("ul");
    ul.className = "flex justify-center mt-6 "
    div_child2.appendChild(ul)

    const createList = (href, text) =>{
        let li = document.createElement("li");
        let a = document.createElement("a");
        // 다중으로 쓸때 ("","",'','') 큰/작따옴표 상관없이 써주면된다.
        a.classList.add("py-3","px-8","border","rounded-md","dark:bg-[#272929]",'dark:text-[#ebf4f1]','text-sm',);
        a.href = href;
        a.textContent = text;
        a.setAttribute("target" , "_blank");
        li.appendChild(a);
        return li;
    }


    if(e.original){

        ul.appendChild(createList(e.original,"Original"));

    }
    if(e.create){
        ul.appendChild(createList(e.create,"Create"));
        // ul.appendChild(li);
    }
    if(e.git){
        ul.appendChild(createList(e.git,"Git"));
        // ul.appendChild(li);
    }

    div.appendChild(div_child1)
    div.appendChild(div_child2)
    $container.append(div)
    })

}


$CateList.forEach((e,i)=>{
    // console.log(e,i)
    e.addEventListener("click", function(){
        $CateList.forEach((el,index)=>{
            $CateList[index].classList.remove("on")
            // console.log(el,index)
        })
        // data-type에 데이터를 가져오는것! e.getAttribute   type은 작명가능...
        const $attr = e.getAttribute("data-type");
        // alert($attr)
        $CateList[i].classList.add("on")

        axios.get("../data/data.json")
        .then(function(res){
            console.log(res)
            let PortData;
            if($attr === "전체"){
               PortData =  res.data.Portfolio

            }else{
                // 전체 item(작명)이 다 나오는것중에 item.type으로 json데이터에 type 을 걸러준것 중괄호를 하지않는 이유는 값을 바로 반환(값을 바로보낼때)할때는 {}없이 바로 ()하는것
              PortData = res.data.Portfolio.filter(item => item.type == $attr)
            }
            PortfolioData(PortData);
        })

        .catch(function(error){
            console.log(error)

        })
        // $container을 비우겠다. 라는 의미 = "" 웹앱클릭시 웹앱만 퍼블리싱 눌렀을땐 퍼블리싱만 프로젝트 눌렀을땐 프로젝트만 나오게 해주려고~
        $container.innerHTML = "";
    })

})

axios.get("../data/data.json")
.then(function(res){
    PortfolioData(res.data.Portfolio)
})

.catch(function(error){
console.log(error)


})