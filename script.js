const categories = ["Всё меню", "Шашлык и мангал", "Салаты", "Супы", "Горячее", "Выпечка"];
const dishes = [
  {name:"Люля-кебаб",category:"Шашлык и мангал",price:215,weight:"140 г",description:"Рубленое мясо, обжаренное на углях с ароматными специями.",sheet:"grill",cell:0,tag:"С МАНГАЛА"},
  {name:"Курица на мангале",category:"Шашлык и мангал",price:235,weight:"140 г",description:"Нежная курица с румяной корочкой и дымным ароматом.",sheet:"grill",cell:1},
  {name:"Говядина на мангале",category:"Шашлык и мангал",price:315,weight:"140 г",description:"Сочная говядина, приготовленная на открытом огне.",sheet:"grill",cell:2},
  {name:"Шашлык «Нежный»",category:"Шашлык и мангал",price:265,weight:"140 г",description:"Мягкий рубленый шашлык с добавлением курдюка.",sheet:"hot",cell:8},
  {name:"Баранина на мангале",category:"Шашлык и мангал",price:315,weight:"140 г",description:"Ароматная баранина с золотистой корочкой.",sheet:"hot",cell:8},
  {name:"Шашлык «Ханский»",category:"Шашлык и мангал",price:265,weight:"140 г",description:"Фирменный шашлык с восточными специями.",sheet:"grill",cell:2},
  {name:"Куриные крылышки",category:"Шашлык и мангал",price:215,weight:"140 г",description:"Крылышки с аппетитной хрустящей корочкой.",sheet:"hot",cell:6},
  {name:"Спинка баранья",category:"Шашлык и мангал",price:435,weight:"140 г",description:"Нежное мясо с мангала и румяной корочкой.",sheet:"hot",cell:8},
  {name:"Корейка баранья",category:"Шашлык и мангал",price:435,weight:"уточнить",description:"Баранья корейка, приготовленная на углях.",sheet:"hot",cell:8},
  {name:"Ачик-Чучук",category:"Салаты",price:280,weight:"180 г",description:"Помидоры, лук и зелень — свежий акцент к шашлыку.",sheet:"grill",cell:3},
  {name:"Долма на мангале",category:"Салаты",price:250,weight:"200 г",description:"Блюдо на мангале по меню кафе.",sheet:"hot",cell:7},
  {name:"Шурпа",category:"Супы",price:300,weight:"400 г",description:"Наваристый суп с мясом и овощами.",sheet:"hot",cell:3},
  {name:"Мастава",category:"Супы",price:285,weight:"400 г",description:"Сытный суп с рисом, овощами и ароматными специями.",sheet:"grill",cell:5},
  {name:"Лагман по-уйгурски",category:"Супы",price:350,weight:"400 г",description:"Ароматный лагман с мясом и овощами.",sheet:"hot",cell:2},
  {name:"Харчо",category:"Супы",price:285,weight:"уточнить",description:"Пряный горячий суп по меню кафе.",sheet:"hot",cell:3},
  {name:"Плов",category:"Горячее",price:310,weight:"уточнить",description:"Рассыпчатый рис, мясо и морковь с восточными специями.",sheet:"grill",cell:6,tag:"ВОСТОЧНАЯ КЛАССИКА"},
  {name:"Плов праздничный — под заказ",category:"Горячее",price:3600,weight:"3000 г",description:"Большое блюдо для семейного стола. Дополнения можно уточнить при заказе.",sheet:"grill",cell:6,tag:"ПОД ЗАКАЗ"},
  {name:"Жаркое",category:"Горячее",price:345,weight:"уточнить",description:"Сытное горячее блюдо с мясом и овощами.",sheet:"hot",cell:1},
  {name:"Казан-кебаб",category:"Горячее",price:485,weight:"400 г",description:"Сочное мясо и картофель с ароматом казана.",sheet:"hot",cell:1,tag:"ХИТ МЕНЮ"},
  {name:"Лагман жареный",category:"Горячее",price:350,weight:"уточнить",description:"Лапша, обжаренная с мясом и овощами.",sheet:"hot",cell:2},
  {name:"Манты",category:"Горячее",price:300,weight:"уточнить",description:"Сочные манты, приготовленные на пару.",sheet:"hot",cell:0},
  {name:"Самса",category:"Выпечка",price:120,weight:"165 г",description:"Румяная выпечка с сочной начинкой.",sheet:"hot",cell:4},
  {name:"Хачапури",category:"Выпечка",price:340,weight:"250 г",description:"Ароматная лепёшка с тягучим сыром.",sheet:"hot",cell:5},
  {name:"Дорадо на мангале",category:"Шашлык и мангал",price:195,weight:"за 100 г",description:"Свежая рыба с мангала, с лимоном и зеленью.",sheet:"grill",cell:8}
];

const positions = ["0% 0%","50% 0%","100% 0%","0% 50%","50% 50%","100% 50%","0% 100%","50% 100%","100% 100%"];
const tabs = document.getElementById("category-tabs");
const grid = document.getElementById("menu-grid");
const cart = new Map();
let activeCategory = "Всё меню";

function renderTabs(){
  tabs.innerHTML = categories.map((c,i)=>`<button class="tab ${i===0?"active":""}" type="button" data-category="${c}">${c}</button>`).join("");
  tabs.addEventListener("click",e=>{
    const button=e.target.closest("button[data-category]"); if(!button)return;
    activeCategory=button.dataset.category;
    tabs.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===button));
    renderDishes();
  });
}
function renderDishes(){
  const visible=activeCategory==="Всё меню"?dishes:dishes.filter(d=>d.category===activeCategory);
  grid.innerHTML=visible.map(d=>{
    const index=dishes.indexOf(d), sprite=d.sheet==="hot"?"food-atlas-hot.png":"food-atlas-grill.png";
    const qty=cart.get(index)||0;
    return `<article class="dish-card"><div class="dish-photo" role="img" aria-label="${d.name}" style="background-image:url('assets/${sprite}');background-position:${positions[d.cell]}">${d.tag?`<span class="dish-tag">${d.tag}</span>`:""}</div><div class="dish-info"><div class="dish-line"><h3>${d.name}</h3><span class="dish-weight">${d.weight}</span></div><p>${d.description}</p><div class="dish-bottom"><span class="dish-price">${d.price.toLocaleString("ru-RU")} <small>₽</small></span><button type="button" class="add-button ${qty?"added":""}" data-add="${index}">${qty?`Добавлено · ${qty}`:"+ В заказ"}</button></div></div></article>`;
  }).join("");
  grid.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>{
    const index=Number(btn.dataset.add); cart.set(index,(cart.get(index)||0)+1); updateCart(); renderDishes();
  }));
}
function updateCart(){
  const quantity=[...cart.values()].reduce((a,b)=>a+b,0);
  const total=[...cart.entries()].reduce((sum,[i,q])=>sum+dishes[i].price*q,0);
  document.getElementById("cart-count").textContent=quantity;
  document.getElementById("cart-total").textContent=total.toLocaleString("ru-RU")+" ₽";
  document.getElementById("cart-bar").classList.toggle("visible",quantity>0);
}
document.getElementById("send-order").addEventListener("click",()=>{
  const rows=[...cart.entries()].map(([i,q])=>`• ${dishes[i].name} — ${q} шт. × ${dishes[i].price} ₽ = ${dishes[i].price*q} ₽`);
  if(!rows.length)return;
  const total=[...cart.entries()].reduce((sum,[i,q])=>sum+dishes[i].price*q,0);
  const message=`Здравствуйте! Хочу оформить заказ:\n${rows.join("\n")}\nИтого: ${total.toLocaleString("ru-RU")} ₽`;
  window.open(`https://wa.me/79829854434?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
renderTabs();renderDishes();
