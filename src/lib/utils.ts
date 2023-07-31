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

  let form = new FormData();
  form.append("avatar", avatarFile);
  form.append("id", cardId.toString());

  const res = await api.post(`/api/avatar`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}
