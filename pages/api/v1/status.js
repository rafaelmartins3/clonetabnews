import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const updated_at = new Date().toISOString();

  const database_version_result = await database.query("SHOW server_version;");
  const database_version_value = database_version_result.rows[0].server_version;

  const database_max_connections_result = await database.query(
    "SHOW max_connections;",
  );
  const database_max_connections_value = parseInt(
    database_max_connections_result.rows[0].max_connections,
  );

  const database_name = process.env.POSTGRES_DB;
  const database_opened_connections_result = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [database_name],
  });
  const database_opened_connections_value =
    database_opened_connections_result.rows.length;

  response.status(200).json({
    updated_at: updated_at,
    dependencies: {
      database: {
        version: database_version_value,
        max_connections: database_max_connections_value,
        opened_connections: database_opened_connections_value,
        database_name: database_name,
      },
    },
  });
}

export default status;
