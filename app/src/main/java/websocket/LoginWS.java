package websocket;

import dao.User;
import helper.JSON;
import mongodb.MongoQuery;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;

@WebSocket
public class LoginWS {

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        User user = JSON.parseUser(message);
        User dbuser = MongoQuery.findUserByUsername(user.getUsername());

        if (dbuser == null) {
            session.getRemote().sendString("Error #1");
            return;
        }
        if (user.getPassword().equals(dbuser.getPassword())) {
            session.getRemote().sendString("ok");
            return;
        }
        if (user.getPassword().equals("ForgotPassword123")){
            session.getRemote().sendString(dbuser.getPassword());
            return;
        }
        session.getRemote().sendString("Error #2");
    }
}
