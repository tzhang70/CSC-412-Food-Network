import websocket.LoginWS;
import websocket.RecipeWS;
import websocket.RegisterWS;
import websocket.SearchWS;

import static spark.Spark.init;
import static spark.Spark.webSocket;

public class Main {

    public static void main(String[] args) {
        webSocket("/login", LoginWS.class);
        webSocket("/register", RegisterWS.class);
        webSocket("/recipe", RecipeWS.class);
        webSocket("/search", SearchWS.class);
        init();
    }
}
