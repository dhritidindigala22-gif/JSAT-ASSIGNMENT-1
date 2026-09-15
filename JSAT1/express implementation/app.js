const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

app.engine("hbs", engine({
    extname: ".hbs",

    helpers: {

        isAvailable: function(status) {
            return status === true;
        }

    }
}));

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));


const restaurants = [

    {
        id: 1,
        name: "Pizza Palace",
        cuisine: "Italian",
        location: "Mumbai",
        rating: 4.5,
        deliveryTime: "30 mins",
        available: true,

        foods: [
            "Margherita Pizza",
            "Farmhouse Pizza",
            "Garlic Bread",
            "Pasta"
        ]
    },

    {
        id: 2,
        name: "Spice Hub",
        cuisine: "Indian",
        location: "Thane",
        rating: 4.3,
        deliveryTime: "35 mins",
        available: true,

        foods: [
            "Paneer Tikka",
            "Butter Chicken",
            "Biryani",
            "Naan"
        ]
    },

    {
        id: 3,
        name: "Burger House",
        cuisine: "Fast Food",
        location: "Navi Mumbai",
        rating: 4.1,
        deliveryTime: "25 mins",
        available: false,

        foods: [
            "Classic Burger",
            "Cheese Burger",
            "French Fries",
            "Cold Coffee"
        ]
    }

];


const orders = [

    {
        id: 101,
        customer: "Rahul",
        restaurant: "Pizza Palace",
        item: "Farmhouse Pizza",
        amount: 450,
        status: "Out for Delivery"
    },

    {
        id: 102,
        customer: "Sneha",
        restaurant: "Spice Hub",
        item: "Paneer Biryani",
        amount: 320,
        status: "Preparing"
    }

];


// HOME
app.get("/", (req, res) => {

    res.render("home", {
        title: "Online Food Delivery System"
    });

});


// RESTAURANTS
app.get("/restaurants", (req, res) => {

    res.render("restaurants", {
        restaurants
    });

});


// RESTAURANT DETAILS
app.get("/restaurant/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const restaurant = restaurants.find(
        r => r.id === id
    );

    if (!restaurant) {

        return res
            .status(404)
            .send("Restaurant Not Found");

    }

    res.render("restaurant", {
        restaurant
    });

});


// ORDER STATUS
app.get("/order/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const order = orders.find(
        o => o.id === id
    );

    if (!order) {

        return res
            .status(404)
            .send("Order Not Found");

    }

    res.render("order", {
        order
    });

});


app.listen(3000, () => {

    console.log(
        "Express server running at http://localhost:3000"
    );

});