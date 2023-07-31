import { useEffect, useRef, useState } from "react";
import { api } from "../api";
import { SocialLink } from "../types/SocialLink";
import { SocialType } from "../types/SocialTypes";

export const useSocialLinks = (
  cardId: number,
  initialSocials: SocialLink[]
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocials);

  async function fetchSocialLinks() {
    try {
      setIsLoading(true);
      const res = await api.get(`/api/social-links/card/${cardId}`);
      setSocialLinks(res.data);
      setIsLoading(false);
    } catch (e) {
      //   console.log(e);
      setIsLoading(false);
    }
  }

  async function addSocial(social: SocialType) {
    const res = await api.post(
      `/api/social-links/card/${cardId}`,
      JSON.stringify({ type: social, title: "", is_active: true, url: "" })
    );
    setSocialLinks((prev) => {
      return [...prev, res.data];
    });
  }

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  return {
    isLoading,
    socialLinks,
    addSocial,
  };
};
