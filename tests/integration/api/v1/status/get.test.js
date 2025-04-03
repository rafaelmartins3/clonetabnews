test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const response_body = await response.json();

  const parse_updated_at = new Date(response_body.updated_at).toISOString();
  expect(response_body.updated_at).toEqual(parse_updated_at); //Se o responseboddy não é data ele não vai ser igual ao forçadamente toISOString

  expect(response_body.dependencies.database.version).toEqual("16.0");
  expect(response_body.dependencies.database.max_connections).toEqual(100);

  expect(response_body.dependencies.database.opened_connections).toEqual(1);

  console.log(response_body);
});
