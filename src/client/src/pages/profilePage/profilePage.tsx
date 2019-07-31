import React, { FunctionComponent, useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { IUserDetails } from "../../../../interfaces/models/IUserDetails";
import { IContactPerson } from "../../../../interfaces/models/IContactPerson";
import { ContactPerson } from "../../components/profile/ContactPerson";
import { UserDetails } from "../../components/profile/UserDetails";

import { getUserDetails, getContactPerson } from "./profilePageFetches";

type UserProfile = {details: IUserDetails, contact: IContactPerson};

async function getUserProfile(): Promise<UserProfile> {
  const userDetailsRes = await getUserDetails();
  const userDetails = await userDetailsRes.json();

  const contactPersonRes = await getContactPerson();
  const contactPerson = await contactPersonRes.json();

  return {details: userDetails.userDetails, contact: contactPerson.contactPersonDetails};
}

export const ProfilePage: FunctionComponent = () => {
  const [info, setInfo] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    getUserProfile().then(data => setInfo(data));
  }, []);

  if (!info) {
    return (
      <>
      </>
    );
  }

  return (  
    <Container>
      <UserDetails userDetails={info!.details} />
      <ContactPerson contactPerson={info!.contact} />
    </Container>
  );
};
