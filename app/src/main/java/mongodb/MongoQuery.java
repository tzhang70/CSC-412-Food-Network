package mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import dao.Recipe;
import dao.User;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class MongoQuery {

    public static User findUserByUsername(String username) {
        DBCollection collection = Mongo.getCollection(Mongo.USER_COLLECTION);
        DBObject query = new BasicDBObject("username", username);
        DBCursor cursor = collection.find(query);

        return cursor.size() == 0 ? null : new User(username, (String) cursor.one().get("password"));
    }

    public static boolean addUser(User user) {
        DBCollection collection = Mongo.getCollection(Mongo.USER_COLLECTION);
        User dbUser = MongoQuery.findUserByUsername(user.getUsername());

        if (dbUser != null) return false;

        DBObject userDocument = new BasicDBObject("username", user.getUsername())
                .append("password", user.getPassword());
        collection.insert(userDocument);
        return true;
    }

    public static void addRecipe(Recipe recipe) {
        DBCollection collection = Mongo.getCollection(Mongo.RECIPE_COLLECTION);
        DBObject recipeDocument = new BasicDBObject("title", recipe.getTitle())
                .append("description", recipe.getDescription())
                .append("ingredients", recipe.getIngredients())
                .append("instructions", recipe.getInstructions())
                .append("user", recipe.getUser());
        collection.insert(recipeDocument);
    }

    public static List<Recipe> findAllRecipes() {
        DBCollection collection = Mongo.getCollection(Mongo.RECIPE_COLLECTION);
        return fetchRecipes(collection.find());
    }

    public static List<Recipe> findByTitleLike(String titlePart) {
        DBCollection collection = Mongo.getCollection(Mongo.RECIPE_COLLECTION);
        DBObject query = new BasicDBObject("title", Pattern.compile(titlePart));
        return fetchRecipes(collection.find(query));
    }

    private static List<Recipe> fetchRecipes(DBCursor cursor) {
        List<Recipe> list = new ArrayList<>();
        while (cursor.hasNext()) {
            DBObject recipe = cursor.next();
            list.add(new Recipe(
                    (String) recipe.get("title"),
                    (String) recipe.get("description"),
                    (String) recipe.get("ingredients"),
                    (String) recipe.get("instructions"),
                    (String) recipe.get("user")
            ));
        }
        return list;
    }
}
