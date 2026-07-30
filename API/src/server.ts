import http from "http";
import app from "./app";

const server = http.createServer(app);

const PORT = Number(process.env.PORT) || 9002;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Press ctrl + c to disconnect ");
});

server.on("error", (err) => {
  console.log(err);
  console.log("Server Error", err.message);
  process.exit(1);
});
