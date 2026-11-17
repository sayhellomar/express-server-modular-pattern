import app from "./app";
import initDB from "./db";
const port = process.env.PORT || 8000;

async function main() {
    initDB();

    app.listen(port, () => {
        console.log(`Express postgreSQL server listening on port ${port}`);
    });
}

main();
