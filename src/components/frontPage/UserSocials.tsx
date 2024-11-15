import { SocialLink } from "../../types/SocialLink";
import { BsChevronRight } from "react-icons/bs";
import { SocialIcon } from "../SocialIcon";
import { Card } from "../../types/Card";
import { api } from "./../../api";
interface UserSocialsProps {
  cardData: Card;
}

export const UserSocials = ({ cardData }: UserSocialsProps) => {
  const videos = cardData.social_links.filter(
    (s) => s.is_active && s.type === "video"
  );

  // const offers = cardData.social_links.filter(
  //   (s) => s.is_active && s.type === "special_offer"
  // );

  // const catalogues = cardData.social_links.filter(
  //   (s) => s.is_active && s.type === "catalogue"
  // );

  const commonSocials = cardData.social_links.filter(
    (s) =>
      s.is_active &&
      !["catalogue", "special_offer", "video", "whatsapp", "viber,telegram"].includes(
        s.type
      )
  );

  const viber = cardData.social_links.find(
    (s) => s.is_active && s.type === "viber"
  );
  const whatsapp = cardData.social_links.find(
    (s) => s.is_active && s.type === "whatsapp"
  );
  const telegram = cardData.social_links.find(
    (s) => s.is_active && s.type === "telegram"
  );

  async function handleSocialClick(
    href: string | undefined,
    socialId: number,
    socialType: string
  ) {
    try {
      const response = await api.post(`/api/socialStats/add-click`, {
        user_id: cardData.user_id,
        users_data_id: cardData.id,
        social_id: socialId,
        social_type: socialType,
      });
    } catch (error) {
      console.error("Error:", error);
    }
    // if (!href) return;
    // window.open(href, "_blank");
  }

  function sanitizeLinkToHaveHttp(url?: string, type?: string) {
    if (!url) return "";
    if (type === "whatsapp") {
      return `https://api.whatsapp.com/send?phone=${url}`;
    }
    if (type === "viber") {
      return `viber://add?number=${url}`;
    }

    if (type === "telegram") {
      return `tg://call?number=${url}`
    }


    if (!url.startsWith("http")) {
      return `https://${url}`;
    }
    return url;
  }

  return (
    <div className="mt-6 mb-6">
      {videos &&
        videos.map((video) => <VideoThumb video={video} key={video.id} />)}
      <div className="flex justify-center flex-wrap gap-4 max-w-xs mx-auto">
        {whatsapp && (
          <div className="flex justify-center truncate" key={whatsapp.id}>
            <a
              href={sanitizeLinkToHaveHttp(whatsapp.url, whatsapp.type)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon
                onClick={() =>
                  handleSocialClick(whatsapp.url, whatsapp.id, whatsapp.type)
                }
                url={whatsapp.url || ""}
                type={whatsapp.type}
                title={whatsapp.title}
                key={whatsapp.id}
              />
            </a>
          </div>
        )}
        {viber && (
          <div className="flex justify-center truncate" key={viber.id}>
            <a
              href={sanitizeLinkToHaveHttp(viber.url, viber.type)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon
                onClick={() =>
                  handleSocialClick(viber.url, viber.id, viber.type)
                }
                url={viber.url || ""}
                type={viber.type}
                title={viber.title}
                key={viber.id}
              />
            </a>
          </div>
        )}
        {telegram && (
          <div className="flex justify-center truncate" key={telegram.id}>
            <a
              href={sanitizeLinkToHaveHttp(telegram.url, telegram.type)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon
                onClick={() =>
                  handleSocialClick(telegram.url, telegram.id, telegram.type)
                }
                url={telegram.url || ""}
                type={telegram.type}
                title={telegram.title}
                key={telegram.id}
              />
            </a>
          </div>
        )}
        {commonSocials.map((social) => (
          <div className="flex justify-center truncate" key={social.id}>
            <a
              href={sanitizeLinkToHaveHttp(social.url, social.type)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon
                onClick={() =>
                  handleSocialClick(social.url, social.id, social.type)
                }
                url={social.url || ""}
                type={social.type}
                title={social.title}
                key={social.id}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoThumb = ({ video }: { video: SocialLink }) => {
  function handleSocialClick(href: string | undefined) {
    if (!href) return;
    window.open(href, "_blank");
  }
  return (
    <div className="mb-6">
      <div className="text-center text-lg font-bold text-gray-800 dark:text-gray-300 mb-3">
        {video.title}
      </div>
      <iframe
        className="w-full aspect-video mx-auto rounded-md bg-slate-300 dark:bg-slate-500"
        src={video?.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {video.cta && (
        <div className="flex justify-center my-3">
          <button
            onClick={() => handleSocialClick(video.cta)}
            className="flex items-center justify-center cursor-pointer dark:text-gray-400 space-x-2"
          >
            <span>See more</span>
            <BsChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};
