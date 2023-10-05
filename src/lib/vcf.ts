import VCard from "vcard-creator";
import { Card } from "../types/Card";

export async function saveVcf(contact: Card) {
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
    image_path,
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

  if (image_path) {
    // myVCard.addPhotoURL(image_path);
    try {
      const blobRes = await toDataUrl(image_path);
      const blob = blobRes.split("base64,")[1];
      myVCard.addPhoto(blob, "JPEG");
      // // myVCard.addPhotoURL(image_path);
      console.log(111111, blobRes, blob);
    } catch (e) {
      console.log(e);
    }
  }

  function toDataUrl(url: string): Promise<string> {
    return new Promise((res, rej) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var reader = new FileReader();
          reader.onloadend = function () {
            res(reader.result.toString());
          };
          reader.readAsDataURL(xhr.response);
        } else {
          rej({ status: xhr.status, statusText: xhr.statusText });
        }
      };
      xhr.onerror = () => {
        rej({ status: xhr.status, statusText: xhr.statusText });
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
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
  // return;
  const blob = new Blob([myVCard.toString()], { type: "text/vcard" });
  const elem = window.document.createElement("a");
  elem.href = window.URL.createObjectURL(blob);
  elem.download = "vcard.vcf";
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}
