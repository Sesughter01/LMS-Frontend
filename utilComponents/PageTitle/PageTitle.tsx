"use client";

interface PageTitlePropsType {
  text?: string;
  className?: string;
}
const PageTitle = (props: PageTitlePropsType): JSX.Element => {
  const { text, className } = props;

  return (
    <>
      <div className="title">{text}</div>
      <style jsx>
        {`
          .title {
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 150%;
            letter-spacing: -0.5px;
            color: #1a183e;
          }
        `}
      </style>
    </>
  );
};
export default PageTitle;
