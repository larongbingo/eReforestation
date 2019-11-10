import React from "react";
import { Container, Table } from "react-bootstrap";

import { ILog } from "../../../../interfaces/models/ILog";
import { APIS_ENDPOINTS } from "../../config/endpoints";
import { getSessionKey } from "../../libs/session";

export const Auditing: React.FC = () => {
  const [logs, setLogs] = React.useState<ILog[]>([]);

  React.useEffect(() => {
    fetch(APIS_ENDPOINTS.admin.auditing.route, {
      method: APIS_ENDPOINTS.admin.auditing.method,
      headers: {
        "Authorization": `Bearer ${getSessionKey()}`
      },
    })
    .then(res => res.json())
    .then(res => setLogs(res.logs));
  }, []);

  if(!logs) {
    return (
      <>Loading</>
    );
  }

  return (
    <Container>
      <AuditList logs={logs} />
    </Container>
  );
};

const AuditEntry: React.FC<AuditEntryProps> = ({log}) => (
  <tr>
    <td>{log.createdAt}</td>
    <td>{log.event}</td>
    <td>{log.description}</td>
    <td>{log.params}</td>
  </tr>
);

const AuditList: React.FC<AuditListProps> = ({logs}) => (
  <Table>
    <thead>
      <th>Date</th>
      <th>Event</th>
      <th>Description</th>
      <th>Parameters</th>
    </thead>
    <tbody>
      { logs.map(log => <AuditEntry log={log} />) }
    </tbody>
  </Table>
);

type AuditEntryProps = {
  log: ILog;
};

type AuditListProps = {
  logs: ILog[];
};
