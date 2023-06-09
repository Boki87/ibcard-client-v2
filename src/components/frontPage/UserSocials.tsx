import { SocialLink } from "../../types/SocialLink";
import { BsChevronRight } from "react-icons/bs";
import { SocialIcon } from "../SocialIcon";

interface UserSocialsProps {
  socials: SocialLink[];
}

export const UserSocials = ({ socials }: UserSocialsProps) => {
  const video = socials.find((s) => s.is_active && s.type === "video");

  const flyers = socials.filter((s) => s.is_active && s.type === "flyer");

  const catalogues = socials.filter(
    (s) => s.is_active && s.type === "catalogue"
  );

  const commonSocials = socials.filter(
    (s) => s.is_active && !["catalogue", "flyer", "video"].includes(s.type)
  );

  function handleSocialClick(href: string | undefined) {
    if (!href) return;
    window.open(href, "_blank");
  }

  return (
    <div className="mt-6">
      {video && (
        <div className="mb-6">
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
      )}
      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {commonSocials.map((social) => (
          <div className="flex justify-center" key={social.id}>
            <SocialIcon
              onClick={() => handleSocialClick(social.url)}
              url={social.url || ""}
              type={social.type}
              title={social.title}
              key={social.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
