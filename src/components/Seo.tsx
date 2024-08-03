import Head from "next/head";

type cstring = string | string[];

type SEOProps = {
  loading?: boolean;
  title?: cstring;
  pageName?: cstring;
  platformName?: cstring;
  description?: cstring;
};

export function SEO({
  title,
  pageName,
  description,
  platformName = "SOAR",
  loading = false,
}: SEOProps) {
  let getTitle = () => {
    return title ?? (pageName ? `${pageName} - ${platformName}` : platformName);
  };
  return (
    <Head>
      {!loading && (
        <>
          <title>{getTitle()}</title>
        </>
      )}
    </Head>
  );
}
