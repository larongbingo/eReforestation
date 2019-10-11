import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ReactLoading from "react-loading";

import { APIS_ENDPOINTS } from "../../config/endpoints";
import { getSessionKey } from "../../libs/session";

export const Testing: React.FC = () => {
  const [logs, setLogs] = useState("");

  useEffect(() => {
    getTestLogs()
    .then(res => res.text())
    .then(res => setLogs(res));
  }, []);

  return (
    <Container>
      <TestLogs logs={logs} />
    </Container>
  );
};

export const TestLogs: React.FC<TestLogsProps> = ({logs}) => {
  if(!logs) {
    return (<ReactLoading type="spinningBubbles" color="grey" width="10%" height="10%" />);
  }

  return (
    <div>
      {logs.split("\n").map(log => <p style={{margin: "0", padding: "0"}}>{log}</p>)}
    </div>
  );
};

export type TestLogsProps = {
  logs: string | null;
};

function getTestLogs() {
  return fetch(APIS_ENDPOINTS.admin.testing.route, {
    method: APIS_ENDPOINTS.admin.testing.method,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
  });
}
