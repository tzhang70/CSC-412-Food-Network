package websocket;

import dao.Recipe;
import mongodb.MongoQuery;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;
import java.util.List;

@WebSocket
public class SearchWS {

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        List<Recipe> recipes = MongoQuery.findByTitleLike(message);
        for (int i = 0; i < recipes.size(); i++) {
            session.getRemote().sendString(recipes.get(i).toString());
        }
    }
}
