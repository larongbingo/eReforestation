import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { getSessionKey } from "../../libs/session";
import { APIS_ENDPOINTS } from "../../config/endpoints";

// TODO: Component/Page is too large
// TODO: Add notifications on imports
export const BackupRestore: React.FC = () => {
  const [dump, setDump] = useState("");
  const [file, setFile] = useState<any>(null);
  let imageFileCtrl_Ref: HTMLInputElement;
  let sqlFileCtrl_Ref: HTMLInputElement;

  const exportDatabaseBtn_onClick = () => getExportedDatabase()
    .then(res => res.text())
    .then(res => {
      setDump(res);
      console.log(res);
    });
  
  const exportImagesBtn_onClick = () => getExportedImages()
    .then(res => res.blob())
    .then(res => setFile(res));
  
  return (
    <Container>
      <Button style={{marginTop: "30px"}} onClick={exportDatabaseBtn_onClick}>Export Database</Button>
      <Form.Group style={{marginTop: "30px"}}>
        <Form.Label>Import Database</Form.Label>
        <Form.Control ref={(ref: any) => sqlFileCtrl_Ref = ref} type="file" />
      </Form.Group>
      <Button style={{marginBottom: "30px"}} onClick={() => sendImportedDatabase(sqlFileCtrl_Ref)}>Send Database Dump</Button>
      <hr/>
      <Button style={{marginTop: "30px"}} onClick={exportImagesBtn_onClick}>Export Images</Button>
      {file !== null ? <SaveImageDump file={file} /> : null}
      <Form.Group style={{marginTop: "30px"}}>
        <Form.Label>Import Images</Form.Label>
        <Form.Control ref={(ref: any) => imageFileCtrl_Ref = ref} type="file" />
      </Form.Group>
      <Button onClick={() => sendImportedImages(imageFileCtrl_Ref)}>Send Image Dump</Button>
      <ShowSQLDump dump={dump} />
    </Container>
  );
};

const ShowSQLDump: React.FC<ShowSQLDumpProps> = ({dump}) => (
  <div>{ dump.split("\n").map(str => <p style={{padding: "0", margin: "0"}}>{str}</p>) }</div>
);

const SaveImageDump: React.FC<SaveImageDumpProps> = ({file}) => {  
  let aRef: HTMLAnchorElement | null;
 
  useEffect(() => {
    aRef!.href = URL.createObjectURL(file);
  }, []);

  return (
    <a href="" download="images.zip" ref={(ref) => aRef = ref}>Save Images Zip File</a>
  );
};

type ShowSQLDumpProps = {
  dump: string;
};

type SaveImageDumpProps = {
  file: File;
};

function getExportedDatabase() {
  return fetch(APIS_ENDPOINTS.admin.dbBackup.route, {
    method: APIS_ENDPOINTS.admin.dbBackup.method,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
  });
}

function getExportedImages() {
  return fetch(APIS_ENDPOINTS.admin.imagesBackup.route, {
    method: APIS_ENDPOINTS.admin.imagesBackup.method,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
  });
}

function sendImportedImages(importedImagesRef: HTMLInputElement) {
  const formData = new FormData();
  formData.append("images", importedImagesRef.files![0]);
  
  return fetch(APIS_ENDPOINTS.admin.imagesRestore.route, {
    method: APIS_ENDPOINTS.admin.imagesBackup.method,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
    body: formData,
  })
}

function sendImportedDatabase(importedDatabaseRef: HTMLInputElement) {
  const formData = new FormData();
  formData.append("sqlDump", importedDatabaseRef.files![0]);

  return fetch(APIS_ENDPOINTS.admin.dbRestore.route, {
    method: APIS_ENDPOINTS.admin.dbRestore.method, 
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
    body: formData,
  });
}
