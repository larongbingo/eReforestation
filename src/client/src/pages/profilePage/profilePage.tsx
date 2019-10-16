import React, { FunctionComponent, useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { IUserDetails } from "../../../../interfaces/models/IUserDetails";
import { IContactPerson } from "../../../../interfaces/models/IContactPerson";
import { ContactPerson } from "../../components/profile/ContactPerson";
import { UserDetails } from "../../components/profile/UserDetails";
import { getUserPermission } from "../../libs/permission";

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
  const permission = getUserPermission();

  useEffect(() => {
    getUserProfile().then(data => setInfo(data));
  }, []);

  if (!info) {
    return (
      <h2>Loading</h2>
    );
  }

  return (  
    <Container>
      <UserDetails userDetails={info!.details} />
      <ContactPerson contactPerson={info!.contact} />
      {permission === "Admin" || permission === "Superuser" ? <AdminActions /> : <></>}
      {permission === "Superuser" ? <SudoActions /> : <></>}
    </Container>
  );
};

const AdminActions: FunctionComponent = () => {
  console.log("Admin");
  return (
    <></>
  );
}

const SudoActions: FunctionComponent = () => {
  console.log("Sudo");
  return (
    <></>
  );
}
