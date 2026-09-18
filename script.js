const PRODUCTS=[
{id:"dubai",name:"Dubai 310",price:310,img:"assets/dubai-310.jpg",tags:["chocolate"],desc:"A rich, textural signature built on our original frozen yogurt base, layered with dark chocolate and pistachio, then finished with crisp kataifi.",flavor:"Deep chocolate with roasted pistachio richness and a delicate crunchy finish.",ingredients:"Original Base • Dark Chocolate Sauce • Pistachio Sauce • Kataifi • Pistachio"},
{id:"cookie",name:"Cookie 280",price:280,img:"assets/cookie-280.jpg",tags:["chocolate","fruit"],desc:"Creamy frozen yogurt paired with double Biscoff sauce, banana and crushed Biscoff for a buttery, caramelized crunch.",flavor:"Caramelized cookie warmth balanced by sweet banana.",ingredients:"Original Base • Double Biscoff Sauce • Banana • Crushed Biscoff"},
{id:"uji",name:"Uji 280",price:280,img:"assets/uji-280.jpg",tags:["matcha","fruit"],desc:"A bright matcha-forward creation with rice crispies, lychee and mini mochi for contrasting textures.",flavor:"Earthy matcha, fresh lychee sweetness and chewy mochi.",ingredients:"Original Base • Matcha Sauce • Rice Crispies • Lychee • Mini Mochi"},
{id:"flurry",name:"Flurry 250",price:250,img:"assets/flurry-250.jpg",tags:["chocolate"],desc:"A creamy, cookies-and-cream inspired combination finished with cream cheese sauce and a generous double Oreo crust.",flavor:"Creamy cheesecake notes with a bold Oreo crunch.",ingredients:"Original Base • Cream Cheese Sauce • Double Oreo Crust"},
{id:"ferro",name:"Ferro 310",price:310,img:"assets/ferro-310.jpg",tags:["chocolate"],desc:"A hazelnut-lover's dream: original frozen yogurt, double hazelnut sauce, crisp rice and hazelnut pieces.",flavor:"Nutty, chocolatey and crunchy with a roasted hazelnut finish.",ingredients:"Original Base • Double Hazelnut Sauce • Rice Crispies • Hazelnut"},
{id:"bravo",name:"Bravo 250",price:250,img:"assets/bravo-250.jpg",tags:["chocolate","fruit"],desc:"Dark chocolate meets bright mango over our original base, finished with graham crust for a sweet-tart contrast.",flavor:"Rich chocolate, juicy mango and buttery graham.",ingredients:"Original Base • Dark Chocolate Sauce • Mango • Graham Crust"},
{id:"seongsu",name:"Seongsu 250",price:250,img:"assets/seongsu-250.jpg",tags:["coffee"],desc:"A coffee-based treat layered with cream cheese sauce and cornflake crunch, finished with a chewy butter mochi bite.",flavor:"Roasted coffee with creamy tang and playful crunch.",ingredients:"Coffee Base • Cream Cheese Sauce • Cornflake Crunch • Butter Mochi Toek"},
{id:"tiramisu",name:"Tiramisu 250",price:250,img:"assets/tiramisu-250.jpg",tags:["coffee","chocolate"],desc:"Our take on a café classic: coffee base, cream cheese sauce, graham crust and chocolate chips.",flavor:"Coffee-forward, creamy and chocolatey with a biscuit finish.",ingredients:"Coffee Base • Cream Cheese Sauce • Graham Crust • Choco Chip"}
];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const peso=n=>"₱"+n.toLocaleString("en-PH");
function render(filter="all"){
 const list=filter==="all"?PRODUCTS:PRODUCTS.filter(p=>p.tags.includes(filter));
 $("#productGrid").innerHTML=list.map(p=>`<article class="product"><img src="${p.img}" alt="${p.name}"><div class="product-body"><span class="tag">SIGNATURE TREAT</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-foot"><strong>${peso(p.price)}</strong><button class="view-btn" onclick="showProduct('${p.id}')">View details</button></div></div></article>`).join("");
}
function showProduct(id){
 const p=PRODUCTS.find(x=>x.id===id);
 $("#detailImg").src=p.img;$("#detailImg").alt=p.name;$("#detailName").textContent=p.name;$("#detailPrice").textContent=peso(p.price);$("#detailDesc").textContent=p.desc;$("#detailFlavor").textContent=p.flavor;$("#detailIngredients").textContent=p.ingredients;
 $("#detailFeedback").onclick=()=>{ $("#productModal").classList.remove("open"); $("#productTried").value=p.name; setTimeout(()=>$("#feedback").scrollIntoView({behavior:"smooth"}),50); };
 $("#productModal").classList.add("open");
}
$$(".filters button").forEach(b=>b.onclick=()=>{$$(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)});
$("#closeModal").onclick=()=>$("#productModal").classList.remove("open");
$("#productModal").onclick=e=>{if(e.target.id==="productModal")$("#productModal").classList.remove("open")};
function rating(group,input){
 group.querySelectorAll("button").forEach(btn=>btn.onclick=()=>{
  group.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));btn.classList.add("selected");input.value=btn.dataset.value||btn.dataset.score;
 });
}
rating(document.querySelector('.rating[data-name="productRating"]'),$("#productRating"));
rating(document.querySelector('.rating[data-name="serviceRating"]'),$("#serviceRating"));
rating(document.querySelector(".nps"),$("#visitScore"));
$("#surveyForm").onsubmit=e=>{
 e.preventDefault();
 if(!$("#productRating").value||!$("#serviceRating").value){alert("Please rate both the product and staff service.");return}
 const services=[...document.querySelectorAll('input[name="service"]:checked')].map(x=>x.value);
 const response={date:new Date().toISOString(),visitDate:$("#visitDate").value,store:$("#surveyStore").value,product:$("#productTried").value,productRating:Number($("#productRating").value),productComment:$("#productComment").value,serviceRating:Number($("#serviceRating").value),serviceHighlights:services,serviceComment:$("#serviceComment").value,visitScore:$("#visitScore").value,overallComment:$("#overallComment").value,followup:$("#followup").checked,email:$("#email").value};
 const all=JSON.parse(localStorage.getItem("cloudSurveyResponses")||"[]");all.push(response);localStorage.setItem("cloudSurveyResponses",JSON.stringify(all));
 $("#surveyForm").style.display="none";$("#success").classList.add("show");
};
$("#newSurvey").onclick=()=>{ $("#surveyForm").reset();$$(".rating button,.nps button").forEach(b=>b.classList.remove("selected"));$("#surveyForm").style.display="block";$("#success").classList.remove("show");};
$("#hamb").onclick=()=>alert("Use the navigation links to explore the site.");
const d=new Date();d.setDate(d.getDate()-365);$("#visitDate").max=new Date().toISOString().slice(0,10);
render();
