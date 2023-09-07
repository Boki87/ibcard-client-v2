import { api } from "../api";

export function combineCss(...args: string[]) {
  return args.join(" ");
}

export async function uploadAvatar(avatarFile: File, cardId: number) {
  if (!avatarFile) return;

  let extension = ".jpg";

  if (avatarFile.type == "image/png") {
    extension = ".png";
  } else if (avatarFile.type == "image/jpeg") {
    extension = ".jpg";
  } else {
    throw Error("Unsupported image format!");
  }

  const form = new FormData();
  form.append("avatar", avatarFile);
  form.append("id", cardId.toString());

  const res = await api.post(`/api/avatar`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}


export function exportCsv(datas) {
  console.log(datas)
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += [
    Object.keys(datas[0]).join(";"),
    ...datas.map((d) => Object.values(d).join(";")),
  ]
    .join("\n")
    .replace(/(^\[)|(\]$)/gm, "");

  const data = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", data);
  link.setAttribute("download", "export.csv");
  link.click();
}


