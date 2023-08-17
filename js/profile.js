axios.get("../data/data.json")


.then(function(res){
    res.data.Profile.map((e,i)=>{
        // console.log(e);
        let div = document.createElement("div");
        // 테일윈드에서 html에서 안쓴 mb-8 인식 못해서 html에서 한번써주고 지워주면 인식 가능한
        div.className = "bg-white rounded-md border dark:bg-[#272929] dark:text-[#ebf4f1] p-5 mb-8 last:mb-0";

        let h3 = document.createElement("h3");
        h3.className = "text-base md:text-xl mb-4";
        h3.textContent = e.title;
        div.appendChild(h3)
        
        let p;
      
        if(e.desc){  
            p = document.createElement("p");
            p.innerHTML = `<span class = "font-bold">'${e.desc}'</span> ${e.desc2}`;
            p.className = "mb-2 last:mb-0 text-sm md:text-base";
            div.appendChild(p);
        }else{
            //object 안에서 또다른 반복문을 돌릴때는 이런식으로 쓴다 지금처럼if안에 map반복문
        e.date.map((el, index)=>{
            console.log(el)
            p = document.createElement("p");
            p.className = "mb-2 last:mb-0 text-sm md:text-base";
        // el은 map의 값이지만 e는 위의 데이터 인데 여기서 가져다 쓰고 index값은 현재 map안에 index값을 써준것.
            p.textContent = `${el} : ${e.dateDesc[index]}`;
            div.appendChild(p);
        })
        }


        document.querySelector(".profile-content").appendChild(div)
    })
})

.catch(function(error){
    console.log(error);

})