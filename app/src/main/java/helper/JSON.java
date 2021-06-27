package helper;

import com.fasterxml.jackson.databind.ObjectMapper;
import dao.Recipe;
import dao.User;

import java.io.IOException;
import java.util.Map;

public class JSON {

    private static Map<String, String> parse(String json) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> map = mapper.readValue(json, Map.class);
        return map;
    }

    public static User parseUser(String json) throws IOException {
        Map<String, String> map = JSON.parse(json);
        String username = map.get("username");
        String password = map.get("password");
        return new User(username, password);
    }

    public static Recipe parseRecipe(String json) throws IOException {
        Map<String, String> map = JSON.parse(json);
        String title = map.get("title");
        String description = map.get("description");
        String ingredients = map.get("ingredients");
        String instructions = map.get("instructions");
        String user = map.get("user");
        return new Recipe(title, description, ingredients, instructions, user);
    }
}
