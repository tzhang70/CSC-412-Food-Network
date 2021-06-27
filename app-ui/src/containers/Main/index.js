import React from "react";
import Recipe from "./Recipe";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            recipeTitle: "",
            recipeDescription: "",
            recipeIngredients: "",
            recipeInstructions: "",
            recipes: [],
            submitRecipe: false,
            errorMsg: ""
        };
    }

    conn = new WebSocket("ws://localhost:4567/recipe");
    search = new WebSocket("ws://localhost:4567/search");

    componentDidMount() {
        this.conn.onmessage = (message) => {
            console.log(message.data);
            this.setState({ recipes: [...this.state.recipes, JSON.parse(message.data)] });
        };
        this.search.onmessage = (message) => {
            this.setState({ recipes: [...this.state.recipes, JSON.parse(message.data)] });
        }
    }

    componentWillUnmount() {
        this.conn.close();
        this.search.close();
    }

    submitRecipe = () => {
        if (this.state.recipeTitle.length > 0 && this.state.recipeDescription.length > 0 && this.state.recipeIngredients.length > 0 && this.state.recipeInstructions.length > 0) {

            this.conn.send(JSON.stringify({
                title: this.state.recipeTitle,
                description: this.state.recipeDescription,
                ingredients: this.state.recipeIngredients,
                instructions: this.state.recipeInstructions,
                user: this.state.username
            }));

            this.setState({ recipeTitle: "" });
            this.setState({ recipeDescription: "" });
            this.setState({ recipeIngredients: ""});
            this.setState({ recipeInstructions: ""});
            this.setState({ submitRecipe: false });

            return null;
        }
        this.setState({ errorMsg: "Please, fill all fields !" });
    }

    logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        this.props.history.push("/");
    }

    toggleSubmitForm = () => {
        if(this.state.submitRecipe){
            this.setState({ submitRecipe: false });
        } else {
            this.setState({ submitRecipe: true });
        }
    }
    hideSubmitForm = () => {
        this.setState({ recipeTitle: "" });
        this.setState({ recipeDescription: "" });
        this.setState({ recipeIngredients: ""});
        this.setState({ recipeInstructions: ""});
        this.setState({ submitRecipe: false });
    }

    handleSearch = event => {
        this.setState({ recipes: [] });
        this.search.send(event.target.value);
    }

    handleChange = event => {
        this.setState({ errorMsg: "" });
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <div >
                <h1 className="text">Recipes</h1>
            <div className="container">
                <div className="text-right">
                    {this.state.username} &nbsp;
                    <button className="top-button top-submit" onClick={this.toggleSubmitForm}>SUBMIT A RECIPE</button> &nbsp;
                    <button className="top-button" onClick={this.logout}>LOGOUT</button>
                </div>
                <br />
                <input type="text" onChange={this.handleSearch} className="search" autoFocus placeholder="Search" />
                {this.state.submitRecipe && (
                    <div className="recipe-form">
                        {this.state.errorMsg.length > 0 && (
                            <p className="error">{this.state.errorMsg}</p>
                        )}
                        <label htmlFor="recipeTitle">Recipe Title</label>
                        <input type="text" id="recipeTitle" value={this.state.recipeTitle} onChange={this.handleChange} autoFocus autoComplete="off" />
                        <label htmlFor="recipeDescription">Recipe Description</label>
                        <textarea id="recipeDescription" value={this.state.recipeDescription} onChange={this.handleChange} rows="10"></textarea>
                        <label htmlFor="recipeIngredients">Recipe Ingredients (Each seperated by a " , ")</label>
                        <textarea id="recipeIngredients" value={this.state.recipeIngredients} onChange={this.handleChange} rows="5"></textarea>
                        <label htmlFor="recipeInstructions">Recipe Instructions (Each seperated onto a different line)</label>
                        <textarea id="recipeInstructions" value={this.state.recipeInstructions} onChange={this.handleChange} rows="10"></textarea>
                        <button onClick={this.submitRecipe}>Submit</button>
                        <button onClick={this.hideSubmitForm}>Cancel</button>
                    </div>
                )}
                {this.state.recipes.length === 0 && (
                    <div className="recipe">
                        <p>There is no recipes !</p>
                    </div>
                )}
                {this.state.recipes.map(item =>
                    <Recipe item={item} key={item.title} />
                )}
            </div>
            </div>
        );
    }
}

export default Main;
