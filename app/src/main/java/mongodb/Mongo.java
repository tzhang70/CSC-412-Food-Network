package mongodb;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

import java.net.UnknownHostException;

public class Mongo {

    private static MongoClient client = null;

    private final static String DB_NAME = "app";
    final static String USER_COLLECTION = "users";
    final static String RECIPE_COLLECTION = "recipes";

    private static MongoClient getClient() {
        if (client == null) {
            try {
                client = new MongoClient();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return client;
    }

    private static DB getDatabase() {
        MongoClient client = Mongo.getClient();
        return client.getDB(Mongo.DB_NAME);
    }

    static DBCollection getCollection(String name) {
        DB db = Mongo.getDatabase();
        return db.getCollection(name);
    }
}
