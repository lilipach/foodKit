from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from django.contrib.messages import get_messages
import bcrypt
from .models import  user, recipe
import re
import json
from django.core.serializers.json import DjangoJSONEncoder


# Create your views here.
def index(request): 
    context={
        "messages": get_messages(request),
    }

    return render(request, "index.html", context)

def authenticate(request):
    emailLogin = user.objects.filter(email=request.POST['email'])

    if emailLogin: 
        logged_user = emailLogin[0] 
        if bcrypt.checkpw(request.POST['password'].encode(), logged_user.password.encode()):
            request.session['userid'] = logged_user.id
            return redirect('/home')

    messages.add_message(request, messages.INFO, "Email or Password is not valid!", extra_tags="fail")
    return redirect("/")

def signUp(request):
    context={
        "messages": get_messages(request),
    }
    return render(request, "signUp.html", context)

def createAccount(request):
    #Validate Data
    if(isValid(request)):
        print("Data Valid Creating Account")
        messages.add_message(request, messages.INFO, "User account successfully created!", extra_tags="success")
        createUser(request)
        return redirect("/")
    else:
        print("ERROR: data is not valid")
        return redirect("/signUp")


def isValid(request):
    valid = True

    #Check user name to only be a-z chars only valid special characters "-", "'" and single space
    if ((not (re.fullmatch("^[a-zA-Z'-]{1,45}$", request.POST["firstName"] ))) or (not (re.fullmatch("^[a-zA-Z'-]{1,45}$", request.POST["lastName"] )))):
        valid = False
        messages.add_message(request, messages.INFO, "invalid first/last name.")
    #Check email isn't already used
    if(user.objects.filter(email=request.POST["email"]).exists()):
        valid = False
        messages.add_message(request, messages.INFO, "Email already in use. Need help reseting your password?", extra_tags="resetPassword")
    #Check for passwords to match, password min length of 8 char
    if request.POST["password"] != request.POST["repassword"]:
        messages.add_message(request, messages.INFO, "passwords do not match.")
        valid = False
    if len(request.POST["password"]) < 6:
        messages.add_message(request, messages.INFO, "password must be 6 characters minimum.")
        valid = False
    #Check email format
    if not re.match(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$', request.POST["email"]):
        messages.add_message(request, messages.INFO, "Invalid email format.")
        valid = False

    return valid 

def createUser(request):
    password = request.POST['password']
    pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user.objects.create(first_name=request.POST['firstName'], last_name=request.POST['lastName'], email=request.POST['email'], password=pw_hash)
    

def home(request):
    if "userid" not in request.session:
        return redirect('/')
    
    userObject = user.objects.get(id=request.session['userid']) 
    context = {
        "user": userObject,
        "recipes": userObject.recipes.all(),
    }
    
    return render(request, "home.html", context)

def recipeBrowser(request):
    if "userid" not in request.session:
        return redirect('/')

    userObject = user.objects.get(id=request.session['userid']) 

    recipeList = userObject.recipes.values_list("identifier", flat=True)
    recipes_json =  json.dumps(list(recipeList), cls=DjangoJSONEncoder)
    
    context = {
        "user": userObject,
        "recipes": recipes_json,
    }
    
    return render(request, "recipeBrowser.html", context)

def sessionRecipes(request):
    if "userid" not in request.session:
        return redirect('/')

    if "recipes" not in request.session:
        request.session['recipes'] = []
    
    request.session['recipes'].append(request.POST["identifier"])

    print("this is sessionRecipes")
    print(request.session["recipes"])
    print(f"recipe to add: " + request.POST["identifier"])
    return HttpResponse("Recipe added to session.")

def addFavorite(request):
    userObject = user.objects.get(id=request.POST["userID"])
    #create recipe will create item only if it doesn't already exist
    recipeObject = createRecipe(request.POST["title"], request.POST["identifier"])
    userObject.recipes.add(recipeObject)

    return HttpResponse("Recipe Added to Favorites.")

def removeFavorite(request):
    userObject = user.objects.get(id=request.POST["userID"])
    #create recipe will create item only if it doesn't already exist NOTE: object in remove should always exits
    recipeObject = createRecipe(request.POST["title"], request.POST["identifier"])
    userObject.recipes.remove(recipeObject)

    return HttpResponse("Recipe removed from favorites");

def createRecipe(rpTitle, rpIdentifier):
    recipeObject = recipe.objects.filter(identifier=rpIdentifier)

    #create recipe object in database if it doesn't already exist
    if(not recipeObject.exists()):
        return recipe.objects.create(title=rpTitle, identifier=rpIdentifier)
        
    else:
        return recipe.objects.filter(identifier=rpIdentifier)[0]

def deleteAccount(request):
    if "userid" not in request.session:
        return redirect('/')

    temp = user.objects.get(id=request.session["userid"])
    print(temp.last_name + temp.first_name + temp.email + "being deleted")
    temp.delete()
    messages.add_message(request, messages.INFO, "Your account has been deleted", extra_tags="fail")

    try:
        del request.session['userid']
    except KeyError:
        pass


    return redirect("/")

def logout(request):
    try:
        del request.session['userid']
    except KeyError:
        pass
    messages.add_message(request, messages.INFO, "You have been logged out.", extra_tags="success")
    return redirect("/")
    


