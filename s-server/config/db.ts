import dotenv from "dotenv";
dotenv.config();

interface DevConfig {
  db: {
    url: string;
    radisUrl: string;
  };
  app: {
    port: string | number;
  };
}

export const dev: DevConfig = {
  db: {
    url:
      process.env.DBURL ||
      "mongodb+srv://hassainseam:fe3HLE9bjmJoiK2r@cluster0.hral0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    radisUrl: process.env.REDIS_URL || "redis://redis:6379",
  },
  app: {
    port: process.env.PORT || 80,
  },
};
