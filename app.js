const searchFood = async() =>{
    const saveFood = document.getElementById('Search-field');
    const saveFoodText = saveFood.value;
    // clear data
    saveFood.value = '';
    if(saveFoodText == ''){
        console.log('yeap')
    }
    else{
         // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${saveFoodText}`
    const res = await fetch(url);
    const data = await res.json();
    addfoods(data.meals)
    // fetch(url)
    // .then(res => res.json())
    // .then(data => addfoods(data.meals))

    }
    
   
};
const addfoods = meals => {
    const addFood = document.getElementById('add-foods');
    addFood.textContent = '';
    if(meals.length == 0){
        console.log('not')
    }
    meals.forEach(meal =>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div onclick="loadmealDetails(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            </div>
          </div>
        `;
        addFood.appendChild(div)
    })
}

const loadmealDetails = async detailsMeal =>{
    const urlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsMeal}`
    const res = await fetch(urlId);
    const data = await res.json();
    showDetailsId(data.meals[0]);

    // fetch(urlId)
    // .then(res => res.json())
    // .then(data =>showDetailsId(data.meals[0]))
}

const showDetailsId = mealId =>{
    const detailsCard = document.getElementById('details-id');
    detailsCard.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${mealId.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${mealId.strMeal}</h5>
      <p class="card-text">${mealId.strInstructions.slice(0,100)}</p>
      <a href="${mealId.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    
    `;
    detailsCard.appendChild(div)

}