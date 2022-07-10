class Config {

}

class DevelopmentConfig extends Config {
    public isDevelopment = true;
    public connectionString = "mongodb://localhost:27017/sunmarket";
    // public connectionString = "mongodb+srv://noamcarmi:<noam7693>@cluster0.vnwgw.mongodb.net/test";

}

class ProductionConfig extends Config {
    public isDevelopment = false;
    public connectionString = "mongodb+srv://noamcarmi:noam7693@sun-market-cluster.hxb0s.mongodb.net/sample_sun_market?retryWrites=true&w=majority";
    // public connectionString = "mongodb://localhost:27017/sunmarket";
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;
