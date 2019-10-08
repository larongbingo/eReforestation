import { APIS_ENDPOINTS } from "./endpoints";
import { getSessionKey } from "../libs/session";

export const QUILL_MODULES_CONFIG = {
  imageCompress: {},
  imageUploader: {
    upload: async (file: any) => {
      const formData = new FormData();
      formData.append("image", file);
      const imageUploadRes = await fetch(APIS_ENDPOINTS.gallery.upload.route, {
        headers: {
          "Authorization": `Bearer ${getSessionKey()}`
        },
        method: APIS_ENDPOINTS.gallery.upload.method,
        body: formData
      });
      const res = await imageUploadRes.json();
      return `${APIS_ENDPOINTS.staticFiles.route}/${res.fileName}`;
    }
  },
  blotFormatter: {},
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, {font: []}, {size: []}],
      [{align: ""}, {align: "center"}, {align: "right"}, {align: "justify"}],
      [{color: []}, {background: []}],
      [{script: "sub"}, {script: "super"}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', "code-block"],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  },
  clipboard: { matchVisual: false }
};
