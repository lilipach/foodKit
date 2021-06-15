function showRecipe(identifier){
    console.log(`you want to show recipe ${identifier}`); 
    console.log($(`#${identifier}-card`).offset().top + $("#home-recipes").scrollTop());
    $("#home-recipes").animate(
        {
          scrollTop: $(`#${identifier}-card`).offset().top + $("#home-recipes").scrollTop()
        },
        800 //speed
    )



    //$("#home-recipes").scrollTop($(`${identifier}-card`));
}

function addRecipe(identifier){
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${identifier}`,
        type: 'GET',
        success: function(data){
          addCard(data);
        },
        error: function() {
            alert(`failed`);
        }
    });
}

function addCard(recipe){
    recipeData = getData(recipe);
    var ingredientHTML = '<table class="table"><tbody>';
    for(var i = 0; i < recipeData["ingredients"].length; i ++){
        if(recipeData["ingredients"][i]["ingredient"] == "" ){
            break;
        }
        
        ingredientHTML = ingredientHTML + 
                        `<tr>` +
                            `<th scope="row">${recipeData["ingredients"][i]["measurement"]}</th>` +
                            `<td>${recipeData["ingredients"][i]["ingredient"]}</td>` +
                        `</tr>`;
    }
    ingredientHTML = ingredientHTML + "</tbody></table>";
    
    $("#recipe-browser-nav").append(
        `<li class="text-white"> <p><a href="#" onclick="showRecipe('${recipeData["recipeID"]}')" class="text-white">${recipeData["title"]}</a></p></li>`
    );


    $("#recipe-display").append(
        `<div class="card mb-4" id="${recipeData["recipeID"]}-card" style="max-width: 700px; overflow: contain;">` +
            `<img class="card-img-top" src="${recipeData["imageURL"]}" alt="${recipeData["title"]}">` +
            `<div class="card-body">` +
                `<div class="display-4 d-flex flex-wrap">${recipeData["title"]}</div>` +
                `<div class="d-flex">` +
                    `<div class = "dflex flex-column w-50 p-4">` + 
                        `<h1 class="lead font-weight-bold">Ingredients</h1>`+
                        ingredientHTML + 
                    `</div>` + 
                    `<div class = "dflex flex-column w-50 p-4">` + 
                        `<h1 class="lead font-weight-bold">Cooking Instructions</h1>`+
                        `<p class="card-text">${recipeData["instructions"]}</p>`+
                        `<div class="d-flex">` +
                            `<div onclick='openInNewTab(${recipeData["videoURL"]})' class="btn btn-outline-success mr-2">video Help</div>` + 
                            `<button onclick='removeFavorite("${recipeData["title"]}", "${recipeData["recipeID"]}")' class="btn btn-outline-success" id="${recipeData["recipeID"]}">Remove Favorite</button>` +    
                       `</div>` +
                    `<div>` +
                `</div>` +
            `</div>` +
        `</div>`
    )
}

function getData(recipe){
    var ingredients = [
        {
            "ingredient": recipe.meals[0].strIngredient1,
            "measurement": recipe.meals[0].strMeasure1,
        },
        {
            "ingredient": recipe.meals[0].strIngredient2,
            "measurement": recipe.meals[0].strMeasure2,
        },
        {
            "ingredient": recipe.meals[0].strIngredient3,
            "measurement": recipe.meals[0].strMeasure3,
        },
        {
            "ingredient": recipe.meals[0].strIngredient4,
            "measurement": recipe.meals[0].strMeasure4,
        },
        {
            "ingredient": recipe.meals[0].strIngredient5,
            "measurement": recipe.meals[0].strMeasure5,
        },
        {
            "ingredient": recipe.meals[0].strIngredient6,
            "measurement": recipe.meals[0].strMeasure6,
        },
        {
            "ingredient": recipe.meals[0].strIngredient7,
            "measurement": recipe.meals[0].strMeasure7,
        },
        {
            "ingredient": recipe.meals[0].strIngredient8,
            "measurement": recipe.meals[0].strMeasure8,
        },
        {
            "ingredient": recipe.meals[0].strIngredient9,
            "measurement": recipe.meals[0].strMeasure9,
        },
        {
            "ingredient": recipe.meals[0].strIngredient10,
            "measurement": recipe.meals[0].strMeasure10,
        },
        {
            "ingredient": recipe.meals[0].strIngredient11,
            "measurement": recipe.meals[0].strMeasure11,
        },
        {
            "ingredient": recipe.meals[0].strIngredient12,
            "measurement": recipe.meals[0].strMeasure12,
        },
        {
            "ingredient": recipe.meals[0].strIngredient13,
            "measurement": recipe.meals[0].strMeasure13,
        },
        {
            "ingredient": recipe.meals[0].strIngredient14,
            "measurement": recipe.meals[0].strMeasure14,
        },
        {
            "ingredient": recipe.meals[0].strIngredient15,
            "measurement": recipe.meals[0].strMeasure15,
        },
        {
            "ingredient": recipe.meals[0].strIngredient16,
            "measurement": recipe.meals[0].strMeasure16,
        },
        {
            "ingredient": recipe.meals[0].strIngredient17,
            "measurement": recipe.meals[0].strMeasure17,
        },
        {
            "ingredient": recipe.meals[0].strIngredient18,
            "measurement": recipe.meals[0].strMeasure18,
        },
        {
            "ingredient": recipe.meals[0].strIngredient19,
            "measurement": recipe.meals[0].strMeasure19,
        },
        {
            "ingredient": recipe.meals[0].strIngredient20,
            "measurement": recipe.meals[0].strMeasure20,
        },
    ];

    data = {
        "title": recipe.meals[0].strMeal,
        "recipeID": recipe.meals[0].idMeal,
        "instructions": recipe.meals[0].strInstructions,
        "ingredients": ingredients,
        "imageURL": recipe.meals[0].strMealThumb,
        "videoURL": recipe.meals[0].strYoutube, 
    }
    return data;
}

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function addFavorite(title, identifier){
    
    const csrftoken = getCookie('csrftoken');
    var userID = $("#userID").html();
    console.log(`Recipe to add: ${title} ${identifier}`);
    console.log(`user id from javascript: ${userID}`)
    //update button styling to remove favorite
    $(`#${identifier}`).removeClass("btn-success");
    $(`#${identifier}`).addClass("btn-outline-success");
    $(`#${identifier}`).html("Remove Favorite");
    $(`#${identifier}`).attr("onclick", `removeFavorite("${title}","${identifier}")`);
    
    //add recipe to user recipe list database
    $.ajax({
        url: '/addFavorite',
        type: 'POST',
        headers:{
            "X-CSRFToken": csrftoken
             },
        data:{
            "title":title,
            "identifier": identifier,
            "userID": userID,
        },
        success: function(){
            console.log("Recipe has been added to favorites. Probably....")
        },
        error: function() {
            alert(`failed to add recipe to favorites`);
            $(`#${identifier}`).addClass("btn-success");
            $(`#${identifier}`).removeClass("btn-outline-success");
            $(`#${identifier}`).html("Favorite");
            $(`#${identifier}`).attr("onclick", `addFavorite("${title}","${identifier}")`);
        }
    });

}

function removeFavorite(title, identifier){
    const csrftoken = getCookie('csrftoken');
    var userID = $("#userID").html();
    console.log(`Recipe to add: ${title} ${identifier}`);
    console.log(`user id from javascript: ${userID}`)
    console.log(`Recipe to remove: ${title} ${identifier}`)
    //update button styling to remove favorite
    $(`#${identifier}`).addClass("btn-success");
    $(`#${identifier}`).removeClass("btn-outline-success");
    $(`#${identifier}`).html("Favorite");
    $(`#${identifier}`).attr("onclick", `addFavorite("${title}","${identifier}")`);

    $.ajax({
        url: '/removeFavorite',
        type: 'POST',
        headers:{
            "X-CSRFToken": csrftoken
             },
        data:{
            "title":title,
            "identifier": identifier,
            "userID": userID,
        },
        success: function(){
            console.log("Recipe has been removed from favorites. Probably....")
        },
        error: function() {
            alert(`failed to add recipe to favorites`);    
            $(`#${identifier}`).removeClass("btn-success");
            $(`#${identifier}`).addClass("btn-outline-success");
            $(`#${identifier}`).html("Remove Favorite");
            $(`#${identifier}`).attr("onclick", `removeFavorite("${title}","${identifier}")`);
        }
    });
}