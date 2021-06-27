package websocket;

import dao.Recipe;
import helper.JSON;
import mongodb.MongoQuery;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebSocket
public class RecipeWS {

    private static final List<Session> sessions = new ArrayList<>();

    @OnWebSocketConnect
    public void connect(Session session) throws IOException {
        sessions.add(session);
        List<Recipe> recipes = MongoQuery.findAllRecipes();
        for (int i = 0; i < recipes.size(); i++) {
            session.getRemote().sendString(recipes.get(i).toString());
        }
    }

    @OnWebSocketClose
    public void close(Session session, int statusCode, String reason) {
        sessions.remove(session);
    }

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        Recipe recipe = JSON.parseRecipe(message);
        MongoQuery.addRecipe(recipe);
        for (int i = 0; i < sessions.size(); i++) {
            sessions.get(i).getRemote().sendString(message);
        }
    }
}
