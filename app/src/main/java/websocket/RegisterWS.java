package websocket;

import dao.User;
import helper.JSON;
import mongodb.MongoQuery;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;

@WebSocket
public class RegisterWS {


    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        User user = JSON.parseUser(message);

        if (!MongoQuery.addUser(user)) {
            session.getRemote().sendString("Username already exists !");
            return;
        }
        session.getRemote().sendString("ok");
    }
}
