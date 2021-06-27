package dao;

public class Recipe {

    private String title;
    private String description;
    private String ingredients;
    private String instructions;
    private String user;

    public Recipe(String title, String description, String ingredients, String instructions, String user) {
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "{\"title\": \"" + title + "\", " +
                "\"description\": \"" + description.replaceAll("\n", "LineBreak") + "\", " +
                "\"ingredients\": \"" + ingredients.replaceAll(",","anItem") + "\", " +
                "\"instructions\": \"" + instructions.replaceAll("\n", "LineBreak") + "\", " +
                "\"user\": \"" + user + "\"}";
    }
}
