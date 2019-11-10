import React from "react";
import { Container, Card, CardColumns } from "react-bootstrap";

import { APIS_ENDPOINTS } from "../config/endpoints";

export const Gallery: React.FC = () => {
  const [images, setImages] = React.useState<string[]>([]);
  let firstThird;
  let secondThird;

  React.useEffect(() => {
    fetch(APIS_ENDPOINTS.gallery.list.route, {
      method: APIS_ENDPOINTS.gallery.list.method,
    })
    .then(res => res.json())
    .then(res => {
      setImages(res.fileNames)      
      firstThird = (1 / 3) * res.fileNames.length;
      secondThird = (2 / 3) * res.fileNames.length;
    });
  }, []);

  if(!images) {
    return <>Loading</>
  }
  
  return (
    <Container>
      <CardColumns>
        { images.slice(0, firstThird).map((fileName: string) => <GalleryCard fileName={fileName} />) }
      </CardColumns>
      <CardColumns>
        { images.slice(firstThird, secondThird).map((fileName: string) => <GalleryCard fileName={fileName} />) }
      </CardColumns>
      <CardColumns>
        { images.slice(secondThird).map((fileName: string) => <GalleryCard fileName={fileName} />) }
      </CardColumns>
    </Container>
  );
};

const GalleryCard: React.FC<GalleryCardProps> = ({fileName}) => (
  <Card>
    <Card.Img src={APIS_ENDPOINTS.staticFiles.route + "/" + fileName} />
  </Card>
);

type GalleryCardProps = {
  fileName: string;
};
