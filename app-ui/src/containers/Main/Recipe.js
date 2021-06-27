import React from "react";

class Recipe extends React.Component {


    render() {
        console.log(this.props.item.description);
        return (
            <div className="recipe">
                <p className="recipe-title">¶ {this.props.item.title}</p>
                <p className="recipe-description"><b style={{fontSize:'15px'}}>Description :</b>{"\n"}{this.props.item.description.replace(/LineBreak/g, '\n')}</p>
                <p className="recipe-ingredients"><b style={{fontSize:'13px'}}>Ingredients :</b>{"\n"}{this.props.item.ingredients.replace(/anItem/g, '\n')}</p>
                <p className="recipe-instructions"><b style={{fontSize:'15px'}}>Instructions :</b>{"\n"}{this.props.item.instructions.replace(/LineBreak/g, '\n')}</p>
            
                <p className="recipe-user"> <hr/>author: {this.props.item.user}</p>
            </div>
        );
    }
}


export default Recipe;