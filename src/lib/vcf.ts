import VCard from "vcard-creator";
import { Card } from "../types/Card";

export function saveVcf(contact: Card) {
  const {
    first_name,
    last_name,
    company_role,
    company,
    company_name,
    mobile,
    mobile_2,
    website,
    website2,
    whatsapp,
    viber,
    social_links,
    email,
    nfc_card,
  } = contact;
  const myVCard = new VCard();
  myVCard.addName(last_name || "", first_name || "");

  if (company) {
    myVCard.addCompany(company.name);
  } else if (company_name) {
    myVCard.addCompany(company_name);
  }

  if (company_role) {
    myVCard.addJobtitle(company_role);
  }

  if (mobile) {
    myVCard.addPhoneNumber(mobile);
  }
  if (email) {
    myVCard.addEmail(email);
  }
  if (website) {
    myVCard.addURL(website);
  }
  if (nfc_card) {
    myVCard.addURL(nfc_card.link);
  }

  // if (mobile_2) {
  //   myVCard.addPhoneNumber(mobile_2);
  // }
  // if (website2) {
  //   myVCard.addURL(website2);
  // }
  // if (whatsapp) {
  //   myVCard.addPhoneNumber(whatsapp);
  // }
  // if (viber) {
  //   myVCard.addPhoneNumber(viber);
  // }

  // social_links?.forEach((link) => {
  //   if (link.url) {
  //     myVCard.addURL(link.url);
  //   }
  // });

  const blob = new Blob([myVCard.toString()], { type: "text/vcard" });
  const elem = window.document.createElement("a");
  elem.href = window.URL.createObjectURL(blob);
  elem.download = "vcard.vcf";
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}
