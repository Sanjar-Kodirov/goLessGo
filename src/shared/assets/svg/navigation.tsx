export const MusicIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-4 w-4"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

export const BrowseIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-4 w-4"
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

export const ProfileIconSvg = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 h-4 w-4"
    strokeWidth="2"
  >
    <path
      width={24}
      d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ArticleIconSvg = () => {
  return (
    <svg
      width={20}
      height={15}
      viewBox="0 0 22 22"
      className="mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        width={24}
        className="mr-2 h-4 w-4"
        d="M18.8889 20H1.11111C0.816426 20 0.533811 19.8946 0.325437 19.7071C0.117063 19.5196 0 19.2652 0 19V1C0 0.734784 0.117063 0.48043 0.325437 0.292893C0.533811 0.105357 0.816426 0 1.11111 0H18.8889C19.1836 0 19.4662 0.105357 19.6746 0.292893C19.8829 0.48043 20 0.734784 20 1V19C20 19.2652 19.8829 19.5196 19.6746 19.7071C19.4662 19.8946 19.1836 20 18.8889 20ZM17.7778 18V2H2.22222V18H17.7778ZM4.44444 4H8.88889V8H4.44444V4ZM4.44444 10H15.5556V12H4.44444V10ZM4.44444 14H15.5556V16H4.44444V14ZM11.1111 5H15.5556V7H11.1111V5Z"
      />
    </svg>
  );
};
